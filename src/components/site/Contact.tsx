import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/site/SectionHeading";
import { inquirySchema, type InquiryInput } from "@/lib/inquiry-schema";
import { submitInquiry } from "@/lib/inquiry.functions";
import { useSelectedService } from "@/lib/inquiry-store";
import { CONTACT_EMAIL, SERVICE_OPTIONS } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type FieldErrors = { [K in keyof InquiryInput]?: string | undefined };

const EMPTY: InquiryInput = {
  fullName: "",
  email: "",
  bookTitle: "",
  bookLink: "",
  service: "",
  message: "",
  website: "",
};

const fieldClass =
  "h-12 rounded-sm border-input bg-background text-base shadow-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm";

export function Contact() {
  const send = useServerFn(submitInquiry);
  const preselected = useSelectedService();
  const [values, setValues] = useState<InquiryInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (preselected) {
      setValues((v) => ({ ...v, service: preselected }));
      setErrors((e) => ({ ...e, service: undefined }));
      if (status === "success") setStatus("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselected]);

  const validateField = (name: keyof InquiryInput, next: InquiryInput) => {
    const result = inquirySchema.safeParse(next);
    const issue = result.success ? undefined : result.error.issues.find((i) => i.path[0] === name);
    setErrors((e) => ({ ...e, [name]: issue?.message }));
  };

  const update = (name: keyof InquiryInput, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (errors[name]) validateField(name, next);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    const result = inquirySchema.safeParse(values);
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof InquiryInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      document.getElementById(`inq-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await send({ data: result.data });
      if (res.ok) {
        setStatus("success");
        setValues(EMPTY);
        setErrors({});
        toast.success("Inquiry sent — thank you!");
      } else {
        setStatus("error");
        setFormError(res.error);
      }
    } catch {
      setStatus("error");
      setFormError(
        `We couldn't reach the server. Please check your connection and try again, or email ${CONTACT_EMAIL}.`,
      );
    }
  };

  return (
    <section id="contact" className="bg-paper py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Let's talk about your book"
            index="06"
            title={
              <>
                Let&apos;s shape the next step{" "}
                <span className="display-italic">for your book.</span>
              </>
            }
            intro="Share a few details about your title and what you'd like help with. We'll use your message to understand the project and the kind of support you're looking for."
          />

          <div
            data-reveal
            className="mt-10 rounded-md bg-primary p-8 text-primary-foreground shadow-lift"
          >
            <p className="text-[0.65rem] tracking-[0.2em] text-gold-soft uppercase">
              Reach us directly
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="link-underline mt-3 inline-flex items-center gap-3 font-display text-xl break-all sm:text-2xl"
            >
              <Mail className="size-5 shrink-0 text-gold-soft" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
            <ul className="mt-8 space-y-4 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/75">
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold-soft" aria-hidden="true" />
                We read every inquiry and reply by email with next steps and a quotation.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold-soft" aria-hidden="true" />
                Your details are only used to respond to your inquiry.
              </li>
            </ul>
          </div>
        </div>

        <div data-reveal className="rounded-md border bg-card p-6 shadow-soft sm:p-10">
          {status === "success" ? (
            <div
              role="status"
              className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            >
              <span className="grid size-16 place-items-center rounded-full bg-success/10 text-success">
                <CheckCircle2 className="size-8" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-3xl text-foreground">Thank you — your inquiry is in.</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                We've received your project details and will reply to the email you provided. For
                anything urgent, write to{" "}
                <a className="text-accent underline" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
              <Button
                variant="outlineGold"
                size="xl"
                className="mt-8"
                onClick={() => setStatus("idle")}
              >
                Send another inquiry
              </Button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={onSubmit}
              aria-describedby={formError ? "inq-form-error" : undefined}
            >
              <div className="flex items-center justify-between border-b pb-5">
                <p className="eyebrow">Project inquiry</p>
                <span className="text-accent" aria-hidden="true">
                  ✳
                </span>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field id="fullName" label="Full name" required error={errors.fullName}>
                  <Input
                    id="inq-fullName"
                    autoComplete="name"
                    value={values.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    onBlur={() => validateField("fullName", values)}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "inq-fullName-err" : undefined}
                    className={fieldClass}
                    maxLength={100}
                  />
                </Field>
                <Field id="email" label="Email address" required error={errors.email}>
                  <Input
                    id="inq-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => validateField("email", values)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "inq-email-err" : undefined}
                    className={fieldClass}
                    maxLength={255}
                  />
                </Field>
                <Field id="bookTitle" label="Book title" required error={errors.bookTitle}>
                  <Input
                    id="inq-bookTitle"
                    value={values.bookTitle}
                    onChange={(e) => update("bookTitle", e.target.value)}
                    onBlur={() => validateField("bookTitle", values)}
                    aria-invalid={!!errors.bookTitle}
                    aria-describedby={errors.bookTitle ? "inq-bookTitle-err" : undefined}
                    className={fieldClass}
                    maxLength={200}
                  />
                </Field>
                <Field id="bookLink" label="Book link" hint="Optional" error={errors.bookLink}>
                  <Input
                    id="inq-bookLink"
                    type="url"
                    inputMode="url"
                    placeholder="https://"
                    value={values.bookLink}
                    onChange={(e) => update("bookLink", e.target.value)}
                    onBlur={() => validateField("bookLink", values)}
                    aria-invalid={!!errors.bookLink}
                    aria-describedby={errors.bookLink ? "inq-bookLink-err" : undefined}
                    className={fieldClass}
                    maxLength={500}
                  />
                </Field>
                <Field
                  id="service"
                  label="Service of interest"
                  required
                  error={errors.service}
                  className="sm:col-span-2"
                >
                  <Select
                    value={values.service}
                    onValueChange={(v) => {
                      const next = { ...values, service: v };
                      setValues(next);
                      validateField("service", next);
                    }}
                  >
                    <SelectTrigger
                      id="inq-service"
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? "inq-service-err" : undefined}
                      className={cn(fieldClass, "w-full")}
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field
                  id="message"
                  label="Message"
                  required
                  error={errors.message}
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="inq-message"
                    rows={5}
                    placeholder="Tell us about your book, your readers and what you'd like to achieve."
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => validateField("message", values)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "inq-message-err" : undefined}
                    className="min-h-36 rounded-sm border-input bg-background text-base shadow-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                    maxLength={3000}
                  />
                </Field>
                {/* Honeypot — hidden from people and assistive tech */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="inq-website">Website</label>
                  <input
                    id="inq-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </div>
              </div>

              {formError && (
                <div
                  id="inq-form-error"
                  role="alert"
                  className="mt-6 flex gap-3 rounded-sm border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {formError}
                </div>
              )}

              <div className="mt-8 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
                <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                  Please avoid sharing sensitive personal information.
                </p>
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      Send inquiry <ArrowRight />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | undefined;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label
        htmlFor={`inq-${id}`}
        className="flex items-center justify-between text-sm font-medium text-foreground"
      >
        <span>
          {label}
          {required && (
            <span className="ml-0.5 text-accent" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </Label>
      {children}
      {error && (
        <p id={`inq-${id}-err`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
