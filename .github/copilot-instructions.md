# Copilot Instructions for Mercury

## Overview

Mercury is a phase equilibrium calculator for mercury in hydrocarbon mixtures. It consists of two main components:

- **API** (`api/`): Python FastAPI REST server using a compiled Fortran library (`libhg`) for thermodynamic calculations via the UMR model. Runs on port 5000.
- **Web** (`web/`): React TypeScript SPA using Vite, styled-components, and Equinor Design System (`@equinor/eds-*`). Served via nginx on port 8080.

The Fortran library `libhg` is a private binary dependency downloaded from `equinor/gpa-libhg` at Docker build time. It is **not available locally** — API tests must be run inside Docker. The Python type stub is at `api/src/libhg.pyi`.

## Tool Versions

- **Python**: 3.13 (managed with `uv`, lockfile: `api/uv.lock`)
- **Node.js**: 24 (package manager: `yarn` 1.22, lockfile: `web/yarn.lock`)
- **Linting (Python)**: `ruff` for linting & formatting, `mypy` for static type checking
- **Linting (JS/TS)**: `biome` (config: `biome.json` at repo root)
- **Pre-commit**: `prek` (runs hooks from `.pre-commit-config.yaml`)
- **Task runner**: `mise` (config: `.mise.local.toml`)

## Build & Validation Commands

### Web (`web/` directory)

```bash
cd web
yarn install --frozen-lockfile  # Install dependencies
yarn compile                     # TypeScript type check (tsc --noEmit)
yarn lint                        # Biome lint + format check
yarn test run                    # Run vitest unit tests
yarn build                       # Production build (tsc + vite build → web/build/)
yarn generate                    # Regenerate API client (requires API on port 5000)
```

### API (`api/` directory)

```bash
cd api
uv sync --locked --dev           # Install dependencies into api/.venv
uv run ruff check src/           # Lint Python code
uv run ruff format --check src/  # Check Python formatting
uv run mypy src/                 # Static type check (~60s)
```

**API tests require Docker** because they depend on the `libhg` Fortran library. Running pytest locally will fail with `ModuleNotFoundError: No module named 'libhg'`.

```bash
# From repo root:
docker compose run --rm api uv run pytest -m unit         # Unit tests
docker compose run --rm api uv run pytest -m integration   # Integration tests
docker compose run --rm api uv run pytest -k "test_name"   # Single test by name
```

Building Docker images requires the `LIBHG_PAT` environment variable in `.env` (a GitHub PAT with read access to `equinor/gpa-libhg`).

### Pre-commit & Full Stack

```bash
prek                     # Run all pre-commit hooks (from repo root)
docker compose up        # Start all services (API + web + nginx)
docker compose build     # Rebuild after dependency changes
```

### Before Submitting Changes

1. `cd web && yarn install --frozen-lockfile && yarn compile && yarn lint && yarn test run`
2. `cd api && uv sync --locked --dev && uv run ruff check src/ && uv run ruff format --check src/ && uv run mypy src/`

## CI Pipeline (GitHub Actions)

On every **pull request** and **push to main**:

1. **Linting and checks** (`linting-and-checks.yaml`): `prek`, `mypy` on `api/src/`, TypeScript compile on `web/`
2. **Tests** (`tests.yaml`): API unit + integration tests (Docker), web tests (`yarn test`)

On **push to main** (after lint + tests pass): publishes `latest` images and deploys to dev via Radix.
On **release-please PR merge**: publishes tagged images and deploys to prod.

## Project Layout

```
api/
  pyproject.toml             # uv/ruff/mypy/pytest config (line-length 120)
  Dockerfile                 # Multi-stage: build → base → dev → prod
  src/
    app.py                   # FastAPI app factory (create_app), version tagged by release-please
    config.py                # Pydantic settings (env vars)
    init.sh                  # Docker entrypoint
    cli/                     # Typer CLI (run, version)
      __about__.py           # Version string (release-please managed)
    authentication/          # JWT auth via Azure AD
    features/                # Feature-based routes (chemeq, multiflash, health_check, metrics, whoami)
      get_routes.py          # Registers authenticated + public routes
    entities/                # Domain models (Multiflash, ComponentResponse)
    common/                  # Shared utilities, middleware, logging, telemetry
    libhg.pyi                # Type stubs for the Fortran library
  tests/
    conftest.py              # Auto-disables auth; auto-marks tests as "unit"/"integration" by folder
    unit/
    integration/

web/
  package.json               # Scripts: start, build, compile, test, lint, generate
  Dockerfile                 # Multi-stage: nginx server + node build
  vite.config.mts            # Vite (port 3000, output to build/)
  vitest.config.ts           # Vitest (jsdom, globals)
  tsconfig.json
  src/
    App.tsx / index.tsx / router.tsx
    api/generated/           # Auto-generated API client (DO NOT edit)
    api/generate-api-pre-commit.sh
    components/              # Shared UI components
    feature/                 # Feature-specific components
    pages/                   # Page components
    contexts/                # React contexts
    hooks/                   # Custom hooks
  nginx/                     # Nginx reverse proxy config

.github/
  workflows/                 # CI/CD (lint, test, publish, deploy)
  release-please-config.json # Versioning config
  release-please-manifest.json  # Current version tracking
  CODEOWNERS                 # @equinor/mercury

IaC/                         # Azure Bicep infrastructure-as-code
compose.yml                  # Docker Compose (api + nginx)
compose.override.yml         # Dev overrides (web dev server, volumes, env)
compose.ci.yml               # CI overrides (auth disabled)
radixconfig.yaml             # Radix PaaS deployment config (dev + prod environments)
biome.json                   # Biome config (JS/TS)
.pre-commit-config.yaml      # Pre-commit hooks
.env-template                # Template for .env file
.mise.local.toml             # Mise task runner config
```

## API Structure

The API follows a feature-based layout under `api/src/features/`. Each feature typically has:

- A `*_feature.py` file defining FastAPI routes
- A `*_use_case.py` file containing business logic

Routes are split into authenticated (JWT via Azure AD) and public, registered in `get_routes.py`. Configuration uses pydantic-settings with environment variables. Pydantic models use `alias_generator=to_camel` for camelCase JSON serialization while keeping snake_case in Python.

## Conventions

- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/). Prefixes: `feat`, `fix`, `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test`. Enforced by pre-commit.
- **Versioning**: Managed by `release-please`. Version tracked in `api/src/cli/__about__.py`, `api/src/app.py`, and `web/package.json`. Do NOT manually bump versions.
- **Generated code**: `web/src/api/generated/` is auto-generated from the OpenAPI schema. Never edit directly. Regenerate with `yarn generate` (requires API running on port 5000).
- **Python style**: 120 char line length, ruff for linting/formatting, type hints required. `libhg` is treated as a standard library import for isort.
- **TypeScript style**: Biome — spaces for indent, single quotes, trailing commas (ES5), no semicolons. Generated files excluded from linting.
- **Deployment**: Radix (Equinor Kubernetes PaaS). Config in `radixconfig.yaml`. Two environments: `dev` (auto-deploy from main) and `prod` (deploy on release).
- **Testing**: Tests auto-marked `unit`/`integration` by folder. Auth auto-disabled in test fixtures.

## Important Notes

- The `.env` file must exist locally (copy from `.env-template`). Docker builds need `LIBHG_PAT`.
- The API uses `PYTHONPATH=/code/src` inside Docker. Locally, pytest uses `pythonpath = ["src"]` from `pyproject.toml`.
