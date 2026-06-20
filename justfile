# Common dev commands. Install the runner once: `brew install just`.
# Run `just` (or `just --list`) to see all recipes.

# Show available recipes
default:
    @just --list

# --- Setup ---------------------------------------------------------------

# Install deps and reconcile native package versions to the Expo SDK
setup:
    npm install
    npx expo install --fix

# Full reset: remove all generated/installed artifacts, then reinstall
reset: clean setup

# Remove node_modules, generated native projects, and caches
clean:
    rm -rf node_modules ios android .expo dist

# --- Run -----------------------------------------------------------------

# Start Metro against the custom Dev Client (NOT Expo Go)
start:
    npx expo start --dev-client

# Start Metro with a cleared cache — use after installing deps or cache weirdness
start-clean:
    npx expo start -c --dev-client

# Build + run the Dev Client (incremental). `just run android` for Android.
run platform="ios":
    npx expo run:{{platform}}

# --- Native --------------------------------------------------------------

# Regenerate native projects from app.config.ts, then rebuild the Dev Client.
# Use after changing native config or adding a native dependency.
# `just rebuild android` for Android.
rebuild platform="ios":
    npx expo prebuild --clean
    npx expo run:{{platform}}

# Regenerate native projects only (no build)
prebuild:
    npx expo prebuild --clean

# Diagnose common Expo / native setup issues
doctor:
    npx expo-doctor

# --- Checks --------------------------------------------------------------

# Typecheck + lint + prettier
verify:
    npm run verify

# Headless production bundle — catches transform/bundle errors `verify` cannot
bundle:
    npx expo export --platform ios
    rm -rf dist

# Pre-push gate: static checks + a real bundle
check: verify bundle

# Auto-format the codebase
format:
    npm run prettify
