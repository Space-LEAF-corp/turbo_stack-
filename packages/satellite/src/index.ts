export type Limits = {
  I_max: number; // A
  V_max: number; // V
  n_e_max: number; // m^-3
  T_max: number; // K
};

export function E_mag(L: number, I: number): number {
  // E = 1/2 L I^2
  return 0.5 * L * I * I;
}

export function omega_p(n_e: number): number {
  // omega_p = sqrt(n_e e^2 / (epsilon0 m_e))
  const e = 1.602176634e-19;
  const epsilon0 = 8.8541878128e-12;
  const m_e = 9.1093837015e-31;
  return Math.sqrt((n_e * e * e) / (epsilon0 * m_e));
}

export function checkLimits(limits: Limits, params: { L: number; I: number; V: number; n_e: number; T: number }) {
  const eMag = E_mag(params.L, params.I);
  const passI = params.I <= limits.I_max;
  const passV = params.V <= limits.V_max;
  const passN = params.n_e <= limits.n_e_max;
  const passT = params.T <= limits.T_max;

  return {
    pass: passI && passV && passN && passT,
    details: {
      eMag,
      passI,
      passV,
      passN,
      passT
    }
  };
}

export function softStartProfile({L, I_target, steps=10}: {L:number; I_target:number; steps?:number}){
  const seq: number[] = [];
  for(let k=1;k<=steps;k++) seq.push(I_target * (k/steps));
  return seq.map(I => ({I, E: E_mag(L,I)}));
}

export function simulateQuench({L, I_initial, dump_capacity, crowbar_delay_ms=10}: {L:number; I_initial:number; dump_capacity:number; crowbar_delay_ms?:number}){
  // naive simulation: record time-to-zero if E_mag <= dump_capacity
  const E = E_mag(L, I_initial);
  const result = {
    E_initial: E,
    willDump: E <= dump_capacity,
    timeToZeroMs: E <= dump_capacity ? crowbar_delay_ms : Infinity
  };
  return result;
}
