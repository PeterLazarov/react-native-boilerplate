# components/

Two layers, deliberately separated.

## `components/ui/` — vendored primitives

Primitives from React Native Reusables (shadcn-for-RN). You **own** these files,
but treat them as a vendored set: edit only for theming/token changes, and prefer
pulling updates over rewriting. Add new primitives with the RNR CLI or by hand
following the same pattern: `cn()` + `TextClassContext` + `cva` variants.

## `components/` — app compositions

Compositions built **from** the primitives: the `Screen` scaffold, data-state
components (`states/`), `QueryBoundary`, `ThemeToggle`, forms. This is your design
system — change it freely.

## Rule of thumb

- Wraps RN / rn-primitives into a styled primitive → `ui/`.
- Composes primitives into app-specific UI, or ties into the data layer → here.
