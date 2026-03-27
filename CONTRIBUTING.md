# Contributing

## Prerequisites

- Node.js 20+
- npm
- Wasmer available in PATH (`wasmer --version`)

## Setup

```bash
npm install
```

## Main Commands

```bash
npm run generate:bindings
npm run asbuild
npm test
npm run verify
```

## Updating WASIX Bindings

Regenerate bindings from upstream:

```bash
npm run generate:bindings
```

Optionally pin a specific ref/branch:

```bash
WASIX_ABI_REF=main npm run generate:bindings
```

Run full verification:

```bash
npm run verify
```

## Pull Requests

- Keep API additions in `assembly/api.ts` namespace-based
- Keep raw imports in `assembly/bindings/wasix_32v1.ts` generated-only
- Add or update tests under `assembly/__tests__`
- Ensure `npm run verify` passes before opening PR
