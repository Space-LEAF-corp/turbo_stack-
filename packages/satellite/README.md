# Krystal Core — Turbo Stack Satellite Node

This package contains the condensed, lineage-safe specification and a set of deterministic, unit-testable simulation helpers for the Krystal Core "turbo stack" satellite node.

Contents:

- `spec.md` — The full satellite specification (mission, modules, safety, bring-up, tests, BOM)
- `src/` — TypeScript helpers for calculations and safety checks
- `tests/` — Automation for the test profiles (soft-start, storm simulation, runaway denial, quench verification)

Use `pnpm --filter satellite test` to run the test suite.
