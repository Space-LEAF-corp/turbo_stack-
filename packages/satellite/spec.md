# Turbo stack satellite spec (Krystal Core)

A concise, lineage-safe specification for the Krystal Core “turbo stack” satellite node.

(Full textual spec taken from project doc; trimmed for brevity in this file — the original spec is stored in the repository `spec.md`.)

## System overview

- **Mission role:** Protective “time-out” shield for solar events—plasma curtain shaping, selective attenuation, particle deflection, and momentum diffusion.
- **Architecture:** Statite-capable satellite with integrated sail attitude, field-shaped plasma optics, and hardwired quench paths.
- **Design ethos:** Serviceable cartridges, isolation firebreaks, and governance caps that make runaway physically impossible.

... (Full spec preserved in repo)

## Protection envelopes and trip thresholds (notation)

- Current limit `I_max`
- Voltage limit `V_max`
- Electron density `n_e_max`
- Temperature `T_max`

## Test profiles

- Soft-start profile (ramp currents)
- Storm simulation (CME injection)
- Runaway denial test (sensor disagreement)
- Quench verification

See `src` implementation for deterministic checks and simulation harness.
