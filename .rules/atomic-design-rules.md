# Atomic Design + AI Collaboration Rules

## Purpose
- Enforce Atomic Design consistently across the app (Brad Frost’s methodology).
- Align team members and AI assistants on structure, layering, and contribution workflow.
- Keep components modular, reusable, accessible, and easy to evolve.

## Atomic Design levels (Brad Frost)
- **Atoms**: Smallest UI primitives with a single responsibility. Purely presentational. Examples: [Button](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/atoms/button.tsx:5:0-24:2), `Input`, `Form`, [Typography](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/atoms/Typography.tsx:76:0-114:2), `Table`, `Sidebar` primitives.
- **Molecules**: Simple compositions of atoms that work together as one unit. Examples: [PasswordField](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/PasswordField.tsx:13:0-36:2), [OtpField](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/OtpField.tsx:14:0-39:2), [SelectField](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/selectDropdown.tsx:37:0-91:2), [SidebarLink](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/sidebarLink.tsx:12:0-33:2).
- **Organisms**: Complex, distinct sections composed of molecules/atoms. Examples: `Header`, `Sidebar`, [LoginCard](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/pages/login/components/organism/loginCard.tsx:6:0-33:2), [ForgotPasswordCard](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/pages/forgot-password/components/organism/forgotPasswordCard.tsx:5:0-21:2).
- **Templates**: Page-level structure and layout; positions organisms without specific page data. Examples: `MainLayout`, module-specific templates.
- **Pages**: Real content bound to templates and routes. Example: `pages/login/index.tsx`, `pages/unitMaster/index.tsx`.

## Directory structure and placement
- **Global reusable (shared across modules)**:
  - `src/shared/components/atoms/*`
  - `src/shared/components/molecules/*`
  - `src/shared/components/organisms/*`
  - `src/shared/components/templates/*`
  - `src/shared/components/shadcn/*` (vendored primitives; do not bypass atom wrappers)
  - `src/shared/constants/*`
  - `src/shared/utils/*`
  - [src/lib/utils.ts](cci:7://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/lib/utils.ts:0:0-0:0) ([cn](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/lib/utils.ts:3:0-5:1) helper)
- **Module-local first (build here before promoting to shared)**:
  - `src/pages/<module>/molecules/*`
  - `src/pages/<module>/organism/*`
  - `src/pages/<module>/template/*`
  - `src/pages/<module>/index.tsx` (page/route)

## Layering and import rules
- **Allowed direction**: Pages → Templates → Organisms → Molecules → Atoms → Shadcn.
- **Never import upward**:
  - Molecules must not import organisms/templates.
  - Atoms must not import molecules/organisms/templates.
- **Shared never imports module-local**. Module-local can import shared.
- **Use the `@` alias** (configured in Vite/TS) for all imports from [src](cci:7://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src:0:0-0:0).

## Component creation workflow (module-first)
- **Build in module scope first**:
  - Create molecules → organisms → templates inside `src/pages/<module>/`.
  - Use them in `index.tsx` (page).
- **Promote to shared** when:
  - Used by 2+ modules OR clearly generic and reusable.
  - Remove module-specific assumptions; make API generic.
  - Add clear, typed props; keep small surface area.

## Naming and exports
- **PascalCase** for component files and names.
- **One component per file** with a default export.
- **Folder names reflect layer**: `atoms/`, [molecules/](cci:7://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/pages/forgot-password/components/molecules:0:0-0:0), `organisms/`, `templates/`, [template/](cci:7://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/pages/login/components/template:0:0-0:0) (module-level).
- **Props must be typed** with `type`/`interface`.

## Forms and validation
- **Use `react-hook-form` + `zod`** consistently.
- **Use shadcn form wrappers via atoms**: `Form`, `FormField`, `FormItem`, `FormControl`, `FormMessage`.
- **Molecules for fields** (e.g., [PasswordField](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/PasswordField.tsx:13:0-36:2), [OtpField](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/OtpField.tsx:14:0-39:2), [SelectField](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/selectDropdown.tsx:37:0-91:2)) should remain presentational (value, onChange, disabled, error).
- **Validation lives in zod schemas**; components should not hardcode validation rules.

## Styling and theming
- **TailwindCSS only** for styles. Use [cn](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/lib/utils.ts:3:0-5:1) for conditional classes.
- **Avoid dynamic Tailwind class strings** like ``!w-${width}`` and ``!h-${height}``. Prefer fixed class maps or variant props that resolve to static class names at build time.
- **Use tokens defined in `src/index.css`** (CSS variables for light/dark and sidebar). Prefer semantic tokens over raw colors when possible.
- **Typography**: Use the [Typography](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/atoms/Typography.tsx:76:0-114:2) atom for consistent font sizes/weights.
- **Theming**:
  - If adopting `next-themes`, wrap the app root with a ThemeProvider and toggle `.dark` properly.
  - Otherwise, toggle `.dark` on `html/body` and respect CSS variables.

## Accessibility and semantics
- **Provide accessible names** via `aria-label`, `aria-describedby`, or visible labels.
- **Keyboard/focus**: Ensure focusable controls, visible focus states, and logical tab order.
- **Contrast**: Meet WCAG AA for text and interactive elements.
- **Semantic HTML**: Prefer shadcn components and native semantics.

## Routing and layout
- **Single source of truth for routes**: `src/main.tsx`.
- **Pages needing app chrome** use `MainLayout` template.
- **Sidebar config**: [shared/constants/sidebar.constant.ts](cci:7://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/constants/sidebar.constant.ts:0:0-0:0) must map to real routes. Avoid `"#"` for committed features.
- **Use [SidebarLink](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/sidebarLink.tsx:12:0-33:2) molecule** for navigation triggers (it wraps navigation behavior).

## State, data, and side effects
- **Atoms are presentational only** (no business logic, no fetch).
- **Molecules/Organisms** may manage local UI state but avoid business/data logic.
- **Pages (or dedicated hooks/services)** own data fetching and side effects.
- **API layer** (when introduced):
  - Centralize in `src/shared/services/` (e.g., `api.ts` axios/fetch wrapper).
  - Use `import.meta.env.VITE_*` for config (e.g., `VITE_API_URL`).
  - Do not call APIs from atoms; prefer page or feature hook.

## Promotion checklist (module → shared)
- **Reused** by ≥2 modules or truly generic.
- **No module-specific assumptions** (text, constants, routing).
- **Typed, minimal props** with sensible defaults.
- **No data fetching/routing** inside the component.
- **Style consistency**: Uses tokens and matches design system patterns.
- **Lint + typecheck** pass. No dead code.

## Testing and QA (prototype-appropriate)
- **Basic accessibility checks**: label presence, focus, contrast.
- **Form flows**: error states, loading, RHF/zod integration.
- **Organism/template snapshots**: quick visual sanity checks after major changes.

## Linting and type safety
- Must pass `npm run lint` and TypeScript strict checks.
- No unused vars/imports; keep components small, single-purpose.
- Use the established ESLint and TypeScript configs in the repo.

## AI collaborator rules
- **Follow the layering and import direction strictly**.
- **Module-first**: build molecules → organisms → templates in `src/pages/<module>/` before promoting.
- **Use atom wrappers** from `shared/components/atoms/*` instead of importing directly from `shared/components/shadcn/*`.
- **Avoid runtime-only Tailwind classes**; use static class maps/variants to ensure Tailwind picks them up.
- **RHF + zod** for all forms; keep field molecules stateless (presentation + callbacks).
- **Ask for clarification** on unknown routes/APIs; don’t invent endpoints.
- **Keep routes and sidebar config in sync** with `main.tsx` and [sidebar.constant.ts](cci:7://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/constants/sidebar.constant.ts:0:0-0:0).
- **Respect accessibility** defaults and design tokens.

## PR checklist
- **[layering]** Component placed at correct atomic level; import direction respected.
- **[module-first]** New UI built within the module; promoted to shared only if reused.
- **[apis/state]** Data fetching/side effects not inside atoms/molecules; pages/hooks handle it.
- **[forms]** RHF + zod used correctly; errors/loading handled; toasts where appropriate.
- **[styling]** Tailwind classes are static/detectable; tokens used; [Typography](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/atoms/Typography.tsx:76:0-114:2) for text.
- **[routing]** Route defined in `main.tsx`; sidebar entry points to an existing route.
- **[quality]** Lint and typecheck pass; no unused code; basic a11y verified.

## Examples mapped to this repo
- **Atom**: `shared/components/atoms/input.tsx` wraps shadcn `Input` (presentational).
- **Molecule**: [shared/components/molecules/PasswordField.tsx](cci:7://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/PasswordField.tsx:0:0-0:0) composes `Input` with error text.
- **Organism**: `shared/components/organisms/sidebar.tsx` composes `Sidebar` atoms + [SidebarLink](cci:1://file:///home/kishan-ambaliya/Projects/IIOT-admin-frontend/src/shared/components/molecules/sidebarLink.tsx:12:0-33:2) molecules.
- **Template**: `shared/components/templates/layout.tsx` provides header, sidebar, and content slot.
- **Page**: `pages/login/index.tsx` renders the module template; `pages/unitMaster/index.tsx` uses `MainLayout`.
