<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules (Samad)

- Business content (services, process, contact email, suggested questions, assistant copy) lives only in `src/lib/site-content.ts`; both the site sections and the AI assistant prompt read from it so they never drift.
- The AI assistant streams through the server route `src/routes/api/chat.ts` → `src/lib/chat.server.ts` (Lovable AI Gateway, Responses API); the system prompt stays server-side in `src/lib/chat-prompt.server.ts`.
- Chat history is one in-memory conversation per visit (no persistence); the server keeps only text parts, caps message length/history, and rate-limits per hashed visitor key.
- Contact inquiries are validated with the shared zod schema in `src/lib/inquiry-schema.ts` and inserted by the `submitInquiry` server function with the admin client; the `inquiries` and `rate_limit_events` tables have RLS on and no public policies.
- Rate limiting uses the `check_rate_limit` database function because workers are stateless.
- The home page is one long page with in-page anchor sections, as the brief asked for smooth-scrolling navigation.
