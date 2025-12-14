import { describe, it, expect } from 'vitest';
import { E_mag, omega_p, checkLimits, softStartProfile, simulateQuench } from '../src';

describe('Satellite spec helpers', () => {
  it('calculates E_mag correctly', () => {
    const L = 0.5; // H
    const I = 10; // A
    // E = 0.5 * 0.5 * 100 = 25 J
    expect(E_mag(L, I)).toBeCloseTo(25);
  });

  it('computes plasma frequency', () => {
    const n_e = 1e18; // m^-3 (example)
    const w = omega_p(n_e);
    expect(w).toBeGreaterThan(0);
  });

  it('checks limits and fails when over', () => {
    const limits = { I_max: 5, V_max: 1000, n_e_max: 1e17, T_max: 1000 };
    const params = { L: 1, I: 10, V: 2000, n_e: 1e19, T: 1200 };
    const res = checkLimits(limits, params);
    expect(res.pass).toBe(false);
    expect(res.details.passI).toBe(false);
  });

  it('soft start profile produces increasing energy', () => {
    const seq = softStartProfile({L:0.1, I_target: 10, steps: 5});
    let prev = -Infinity;
    for (const s of seq) {
      expect(s.E).toBeGreaterThan(prev);
      prev = s.E;
    }
  });

  it('simulateQuench detects dump capability', () => {
    const res = simulateQuench({L:0.2, I_initial: 20, dump_capacity: 1000, crowbar_delay_ms: 5});
    // E=0.5*0.2*400 = 40, so dump_capacity 1000 => willDump true
    expect(res.willDump).toBe(true);
    expect(res.timeToZeroMs).toBe(5);
  });
});