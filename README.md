# Clear Terms

An independent customer-experience and business-setup awareness platform. It deliberately separates customer accounts, company statements, documented events and disputed matters.

> **Required before launch:** Have all copy, policies, evidence, workflows and publication decisions reviewed by a qualified UAE legal professional. The included policy text is a general template, not legal advice.

## What is included

- Responsive public website, case study, source-labelled timeline, document library, review index and awareness guides
- Moderated customer-experience, company-response and contact workflows
- Server-side Zod validation, honeypot, size limits and basic sensitive-data checks
- Protected `/admin` surface with server-side email allowlisting
- Supabase PostgreSQL schema, indexes, RLS policies, private evidence and public-redacted storage buckets
- Metadata, sitemap, robots rules, accessible forms and security headers
- Sample seed data that is conspicuously labelled and never fabricates customers or evidence

## Local setup

1. Copy `.env.example` to `.env.local` and add a Supabase project URL and keys.
2. Apply `supabase/migrations/202607260001_initial.sql`, then optionally `supabase/seed.sql`.
3. Add your administrator email to `ADMIN_EMAILS`.
4. Run `npm install`, then `npm run dev`.

Without Supabase credentials the public editorial site runs in preview mode and form references are generated, but submissions are not persisted.

## Production deployment

Create a Supabase project in the same legal/data residency posture approved for the service. Apply the migration, keep `private-evidence` non-public, configure secrets only in the hosting platform, set the canonical `NEXT_PUBLIC_SITE_URL`, and deploy to Vercel or another compatible Next.js host. Confirm email sender domain verification before enabling notifications.

## Create the first admin

Create the user through Supabase Authentication, then insert a `profiles` row whose `id` equals the auth user ID and whose role is `admin`. Add the same email to `ADMIN_EMAILS`. Never expose an admin-registration route.

## Testing checklist

- Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`
- Test keyboard navigation, visible focus, mobile menu and form error announcements
- Verify unpublished reviews, responses and originals are inaccessible anonymously
- Upload allowed and disallowed MIME types; confirm size limits and randomized storage paths
- Verify signed private URLs expire and public links refer only to reviewed redacted copies
- Check moderation state transitions and audit-log creation
- Confirm 429 handling at the edge or configured rate-limit provider
- Test email confirmation and admin notification in a non-production project

## Content replacement checklist

- Replace every item labelled sample or placeholder
- Confirm dates, totals and attribution against source records
- Obtain explicit approval for each public redacted document
- Authenticate and approve company responses before attribution
- Configure site name, hero, contact routes and SEO defaults
- Complete UAE legal, privacy and defamation review

## Security checklist

- Rotate all setup keys and keep the Supabase service key server-only
- Require MFA for administrators and least-privilege roles
- Configure Turnstile and edge/IP rate limiting
- Add malware scanning/quarantine before allowing direct evidence upload
- Review CSP and remove development allowances for the chosen production runtime
- Retention schedules, deletion workflows, backups and incident response must be approved
- Audit RLS with anonymous, authenticated and admin test users
