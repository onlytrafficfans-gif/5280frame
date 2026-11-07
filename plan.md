# 5280 Frame & Drywall LLC — implementation plan

## Design brief

**Audience:** Colorado general contractors, builders, construction companies, project managers, and residential customers looking for a specialized drywall subcontractor.

**Primary action:** Request a free estimate through the inquiry form.

**Known proof/content:** Official business name `5280frameanddrywallLLC`, Colorado service area, commercial-first drywall subcontracting focus, 22 years of construction experience, service list, bilingual requirement, and email `fandd5280@iCloud.com`. No unsupported claims about certifications or licenses. Contact phone and project photos are not supplied; the phone is explicitly omitted and project photos remain clearly labeled placeholders.

**Brand adjectives:** precise, grounded, dependable. **Avoid:** flashy, corporate, generic.

## Art direction

Three possible directions considered:
- Technical field notes (0.07): disciplined grid, mono labels, jobsite documentation.
- Warm utility (0.06): approachable neutrals, humanist typography, practical controls.
- Editorial construction journal (0.08): oversized type, tactile imagery, deliberate captions.

**Chosen direction: Editorial construction journal.** It gives a construction company a memorable point of view without relying on generic contractor templates.

- **Design movement:** contemporary editorial design with jobsite-documentation cues.
- **Core principles:** structure before ornament; warm material contrast; crisp hierarchy; honest placeholders.
- **Color philosophy:** charcoal ink conveys dependable structure, warm paper keeps the page approachable, orange marks action and craft, and sage adds a restrained field-note accent.
- **Layout paradigm:** asymmetric editorial columns, wide image-led hero, offset reading rails, and a service index rather than repeated centered cards.
- **Signature elements:** 5280 circular stamp, mono section numbering, and orange hairline accents.
- **Interaction philosophy:** direct, tactile, fast; controls visibly move or change color, while scroll navigation stays obvious and useful.
- **Animation:** subtle image zooms and button lift only; reduced motion removes nonessential transitions.
- **Typography:** Space Grotesk for architectural display headlines, Manrope for readable body copy, DM Mono for labels and technical metadata.
- **Brand essence:** a Colorado framing and drywall partner for projects that need the structure and finish work done right. Personality: exact, calm, capable.
- **Brand voice:** plainspoken and specific. Example lines: “The structure behind a finished space.” / “Tell us what’s taking shape.”
- **Wordmark:** compact 5280 numeric mark paired with a tracked FRAME & DRYWALL label; the circular stamp is used as the secondary brand device.
- **Signature brand color:** construction orange `#DD5D37`.

## Structure and behavior

A single responsive route (`/`) contains Home, Who We Are, Services, Our Work, and Request an Estimate sections. The navigation scrolls to sections and collapses into a mobile menu. English / Español switches all visible copy, options, labels, and feedback messages. The form posts to `/api/inquiry`, validates required fields server-side, and dispatches submissions through the managed owner-notification service; phone is optional because the business has not supplied one. The supplied email is an active mailto link. The site deliberately avoids fixed pricing and explains the project variables that determine an estimate. Local SEO metadata, Open Graph metadata, JSON-LD, semantic headings, and a route manifest are included.

## Project structure

- `client/src/pages/Home.tsx`: page content, bilingual copy, navigation, gallery placeholders, and form behavior.
- `client/src/index.css`: tokens, responsive compositions, focus states, and motion rules.
- `client/index.html`: page metadata and structured data.
- `server/_core/index.ts`: health endpoint and inquiry submission endpoint.
- `public/manus-routes.json`: managed route manifest.
- `plan.md` / `TODO.md`: durable project decisions and acceptance outcomes.
