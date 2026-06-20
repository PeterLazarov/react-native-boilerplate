# App Boilerplate

Customer mobile app skeleton — Expo + Expo Router + NativeWind/React Native
Reusables, TanStack Query over a **custom REST backend**, with swap-safe data
seams (REST today, SQLite-ready later).

> **Commit 1 = runnable skeleton, zero features.** It boots to a placeholder on
> iOS/Android, every architectural slot exists and is empty. See `PLAN.md` for
> what each later phase adds.

## Stack

| Layer        | Choice                                                 |
| ------------ | ------------------------------------------------------ |
| Runtime      | Expo + **custom Dev Client** (not Expo Go), EAS        |
| Navigation   | Expo Router (file-based, typed routes)                 |
| UI / styling | React Native Reusables + NativeWind v4                 |
| Data / cache | TanStack Query + persisted MMKV cache                  |
| HTTP         | `ky` (auth interceptor, 401 → refresh → retry)         |
| Auth         | JWT access + refresh, tokens in `expo-secure-store`    |
| KV           | `react-native-mmkv` behind a `KeyValueStore` interface |
| Realtime     | seam only (no-op) — transport TBD, see PLAN.md P5      |
| Forms        | react-hook-form + zod                                  |
| Keyboard     | react-native-keyboard-controller                       |
| i18n         | i18next (BG/EN)                                        |
| Errors       | Sentry                                                 |

## Getting started

> **Versions in `package.json` are indicative for a recent Expo SDK.** After
> install, run `npx expo install --fix` to reconcile native packages to the SDK
> you pin.

```bash
npm install
npx expo install --fix          # align native deps to the SDK

# Add React Native Reusables (confirm exact CLI against current RNR docs):
npx @react-native-reusables/cli@latest init

cp .env.example .env.local      # set EXPO_PUBLIC_API_BASE_URL

# Build a Dev Client (NOT Expo Go — we use custom native code) and run:
npx expo prebuild
npm run ios       # or: npm run android
```

Then `npm start` for the dev server. `npm run verify` runs typecheck + lint +
prettier.

## How it fits together

```
app/**                      Expo Router screens — import domain hooks ONLY
  └─ src/features/**        domain hooks (useBookings, …)  ← UI's only data surface
       └─ src/data/repositories/**   interfaces + REST impl  ← REST→SQLite swap point
            └─ src/data/http.ts      ky client (+ auth)
       └─ src/realtime/**   RealtimeProvider seam (no-op)   ← live-tracking slot
       └─ src/data/kv/**    KeyValueStore (MMKV)            ← storage swap point
```

Three rules keep the seams real:

1. Screens import **domain hooks**, never `useQuery`/`ky`/a repository/MMKV.
2. Repositories return **domain models**, never raw DTOs (map at the boundary).
3. `src/data/index.ts` is the **single swap point** for repository implementations.

## Codegen (when the backend ships OpenAPI)

If the REST backend publishes an OpenAPI spec, generate a typed client into
`src/data/api/` so request/response types can't drift:

```bash
npx openapi-typescript <spec-url> -o src/data/api/schema.d.ts
```

## What's intentionally NOT here

Real auth, booking, maps/tracking, payments, push, real screens. Those are
Phases 1+ in `PLAN.md`.
