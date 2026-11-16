-- Project inquiries submitted through the website contact form.
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  book_title text NOT NULL CHECK (char_length(book_title) BETWEEN 1 AND 200),
  book_link text CHECK (book_link IS NULL OR char_length(book_link) <= 500),
  service text NOT NULL CHECK (char_length(service) BETWEEN 1 AND 100),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
-- No anon/authenticated policies: inserts happen only through the validated server function.

-- Lightweight rate-limit log used by the chat assistant and inquiry form.
CREATE TABLE public.rate_limit_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bucket text NOT NULL,
  client_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX rate_limit_events_lookup ON public.rate_limit_events (bucket, client_key, created_at DESC);
GRANT ALL ON public.rate_limit_events TO service_role;
ALTER TABLE public.rate_limit_events ENABLE ROW LEVEL SECURITY;

-- Records a hit and returns true when the caller is still within the limit.
CREATE OR REPLACE FUNCTION public.check_rate_limit(_bucket text, _client_key text, _max integer, _window_seconds integer)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent integer;
BEGIN
  DELETE FROM public.rate_limit_events WHERE created_at < now() - interval '1 day';
  SELECT count(*) INTO recent FROM public.rate_limit_events
    WHERE bucket = _bucket AND client_key = _client_key
      AND created_at > now() - make_interval(secs => _window_seconds);
  IF recent >= _max THEN
    RETURN false;
  END IF;
  INSERT INTO public.rate_limit_events (bucket, client_key) VALUES (_bucket, _client_key);
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, text, integer, integer) TO service_role;