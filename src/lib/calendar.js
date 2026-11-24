/**
 * Cálculos do calendário do HUD, no formato do Persona 3: data, dia da semana,
 * período do dia ("After School", "Evening"...) e a fase da lua — que no jogo marca
 * a contagem até a próxima lua cheia.
 */

const SYNODIC_MONTH = 29.530588853;
/** Lua nova de referência: 6 jan 2000, 18:14 UTC. */
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

/** Fração do ciclo lunar em [0, 1): 0 = nova, 0.5 = cheia. */
export function moonPhase(date) {
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86_400_000;
  const cycle = (days % SYNODIC_MONTH) / SYNODIC_MONTH;
  return cycle < 0 ? cycle + 1 : cycle;
}

/** Índice 0–7 da fase, para nomear (nova, crescente, quarto crescente...). */
export const moonPhaseIndex = (phase) => Math.round(phase * 8) % 8;

/**
 * Caminho SVG da parte iluminada de uma lua de raio `r` centrada em (r, r).
 * O contorno externo é meio círculo (direita na crescente, esquerda na minguante);
 * o terminador é meia elipse cuja largura acompanha o cosseno da fase.
 */
export function moonPath(phase, r) {
  const rx = Math.abs(Math.cos(phase * 2 * Math.PI)) * r;
  const waxing = phase < 0.5;
  const outerSweep = waxing ? 1 : 0;
  const innerSweep = (phase >= 0.25 && phase < 0.5) || phase >= 0.75 ? 1 : 0;
  return `M ${r} 0 A ${r} ${r} 0 0 ${outerSweep} ${r} ${2 * r} A ${rx} ${r} 0 0 ${innerSweep} ${r} 0 Z`;
}

/** Período do dia com os nomes do jogo. Meia-noite é a Dark Hour. */
export function timeOfDay(date) {
  const h = date.getHours();
  if (h === 0) return 'dark-hour';
  if (h < 6) return 'late-night';
  if (h < 8) return 'early-morning';
  if (h < 12) return 'morning';
  if (h < 13) return 'lunchtime';
  if (h < 16) return 'afternoon';
  if (h < 18) return 'after-school';
  if (h < 22) return 'evening';
  return 'late-night';
}
