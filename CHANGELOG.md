# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog,
and this project adheres to Semantic Versioning.

## [Unreleased]

## [0.1.0] - 2026-03-27

### Added
- Generated raw WASIX `wasix_32v1` AssemblyScript bindings from upstream `wasix-org/wasix-abi-rust`.
- Namespace-based user-facing API modules:
  - `clock`, `fs`, `thread`, `asyncRuntime`, `jump`, `proc`, `subprocess`, `tty`, `net`, `dynamic`.
- Helper utilities: `isOk(errno)` and `ensureOk(errno, context)`.
- Exhaustive tests validating all raw imports and all namespace API exports.
- Behavioral tests for core namespace usage under Wasmer runtime.
- GitHub Actions CI workflow to run project verification.
- Contributor guide and repository verification script.

### Changed
- Test runtime switched to `wasmer run` via `as-test.config.json`.
- Bindings generation now clones upstream WASIX ABI source at generation time.

### Removed
- Vendored `vendor/wasix-abi-rust` source tree from repository.
