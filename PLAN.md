# Customer App — Plan

Scope: **customer app only**. Provider/courier and ops/admin apps are out of
scope for this repo.

## Locked decisions

| Layer        | Choice                                                                |
| ------------ | --------------------------------------------------------------------- |
| Runtime      | Expo (latest SDK) + custom Dev Client (not Expo Go), EAS Build/Update |
| Language     | TypeScript, `strict`                                                  |
| Navigation   | Expo Router (file-based, typed, deep-linkable)                        |
| UI / styling | React Native Reusables + NativeWind v4 (shadcn parity)                |
| Backend      | **Custom REST API** (not Rails)                                       |
| Data / cache | TanStack Query + `persistQueryClient` (MMKV)                          |
| HTTP         | `ky` — auth interceptor, 401 → refresh → retry                        |
| API types    | `openapi-typescript` + `openapi-fetch` _if_ backend ships OpenAPI     |
| Auth         | JWT access + refresh; tokens in `expo-secure-store`; route guards     |
| KV storage   | `react-native-mmkv` behind a `KeyValueStore` interface                |
| Local DB     | none now; architecture kept swap-ready for SQLite                     |
| Realtime     | separate transport, TBD; no-op seam in commit 1                       |
| i18n         | i18next — BG/EN, Cyrillic, BGN/EUR                                    |
| Errors       | Sentry                                                                |
| Theming      | token bridge in place; light/dark + RNR theming deferred              |
| Forms        | react-hook-form + zod (FormField/FormInput)                           |
| Keyboard     | react-native-keyboard-controller (provider + aware scroll + toolbar)  |

## Architecture — why it's swap-safe

```
Screens (app/**)            know only domain hooks
Domain hooks (features/**)  useBookings() … wrap TanStack Query
                            (swap point: TanStack Query → SQLite live query)
Repositories (data/**)      interfaces; REST now, SQLite later
                            (swap point: REST → SQLite); DTO→domain mapping here
Transport                   ky (REST) + RealtimeProvider seam + KeyValueStore
```

**Guardrails**

- Components import domain hooks only — never `useQuery`/`ky`/repos/MMKV.
- Repositories return domain models, never DTOs.
- `src/data/index.ts` is the single swap point.
- Add repository methods only as real screens need them — no speculative CRUD.

## Commit 1 (this) — runnable skeleton

Boots on both platforms; every slot exists and is empty:
NativeWind/RNR wired, token bridge, TS strict, lint/format, i18n (BG/EN),
Sentry init, the seams (`http`, `queryClient`, repository interface + one REST
impl, `KeyValueStore`, `AuthContext` with no real login, `RealtimeProvider`
no-op), `eas.json` profiles. **No features.**

## Roadmap

| Phase             | Delivers                                                                 | Notes                                                         |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| **P1 Auth**       | OTP/password login, token refresh, guarded routes                        | First real repo + hook; proves the data layer end-to-end      |
| **P2 Discovery**  | Service catalog, search, provider profiles                               | `useServices`; persisted-cache "instant open"                 |
| **P3 Booking**    | Address, slot/quote, booking create                                      | Decide scheduled vs on-demand (vs both) here                  |
| **P4 Payments**   | Stripe + Apple/Google Pay, cash-on-delivery                              | Config plugin; pre-auth → capture                             |
| **P5 Tracking**   | Live status + map; pick realtime transport; implement `RealtimeProvider` | Highest realtime risk — spike transport on real devices first |
| **P6 Lifecycle**  | Reschedule/cancel/refunds, ratings, receipts, history                    |                                                               |
| **Cross-cutting** | Push (`expo-notifications`), theming (light/dark), deep links            | Theming slots into the existing token bridge                  |

## Open decisions (do not block commit 1)

1. **Does the REST backend publish OpenAPI?** → if yes, bake typed-client codegen into P1.
2. **Realtime transport: own WebSocket vs managed (Ably/Pusher/Stream)?** → needed by P5; spike first.
3. **Booking model: scheduled, on-demand, or both?** → shapes P3 heavily.
4. **Stripe vs a BG-local PSP / cash-on-delivery mix?** → P4.

## Top risks

- **Realtime tracking** — REST can't push; the separate channel is the riskiest
  piece. De-risk with a device spike before P5.
- **Offline-first creep** — the SQLite seam is ready, but going offline-first =
  sync/conflict work. Don't start it for the customer app without a concrete need.
- **Native deps / New Architecture** — vet each native lib (Stripe, maps, push)
  for New-Arch compatibility as added; Gradle/CocoaPods conflicts are the usual
  time sink.

## Theming (deferred — foundation already in place)

Tokens live as CSS variables in `global.css` (light + `.dark`), mirrored in
`src/theme/tokens.ts` for non-NativeWind consumers. Token names match shadcn
web 1:1. When picked up: formalize light/dark switching, wire RNR theming,
ideally extract tokens to a package shared with the web app.
