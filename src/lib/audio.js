/**
 * Motor de áudio sintetizado (Web Audio API).
 *
 * Tudo é gerado em tempo real — não há arquivo de áudio no repositório nem nenhum
 * trecho da trilha do jogo. O objetivo é soar *como* o menu do Persona 3:
 *
 * - SE (efeitos): timbres de sino/vidro, curtos e limpos, em vez de onda quadrada
 *   de chiptune.
 * - BGM: uma faixa original de acid jazz / hip-hop lo-fi (o gênero da trilha do
 *   jogo) — bateria boom-bap com swing, piano elétrico em FM, baixo e um vibrafone
 *   discreto, tudo sequenciado por um agendador com lookahead no relógio do áudio.
 */

const SE_KEY = 'p3-portfolio:se';
const BGM_KEY = 'p3-portfolio:bgm';

let ctx = null;
let master = null;
let reverbIn = null;
let noiseBuffer = null;
let bgm = null;

function readPref(key) {
  try {
    return localStorage.getItem(key) !== 'off';
  } catch {
    return true; // storage bloqueado: segue com o padrão (ligado).
  }
}

function writePref(key, on) {
  try {
    localStorage.setItem(key, on ? 'on' : 'off');
  } catch {
    // Preferência não persistida; a sessão atual segue normal.
  }
}

let seOn = readPref(SE_KEY);
let bgmOn = readPref(BGM_KEY);

/** Resposta de impulso sintética: ruído com queda exponencial, para um reverb de sala. */
function makeImpulse(audio, seconds = 2.2, decay = 3) {
  const length = Math.floor(audio.sampleRate * seconds);
  const impulse = audio.createBuffer(2, length, audio.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay;
    }
  }
  return impulse;
}

/** O contexto só pode nascer depois de um gesto do usuário (política de autoplay). */
function getContext() {
  if (!ctx) {
    const AudioContextImpl = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextImpl) return null;
    ctx = new AudioContextImpl();

    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);

    const reverb = ctx.createConvolver();
    reverb.buffer = makeImpulse(ctx);
    reverbIn = ctx.createGain();
    reverbIn.gain.value = 0.32;
    reverbIn.connect(reverb);
    reverb.connect(master);

    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;

    // Pausa a música com a aba em segundo plano, como um jogo pausado.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) ctx.suspend().catch(() => {});
      else ctx.resume().catch(() => {});
    });
  }
  if (ctx.state === 'suspended' && !document.hidden) ctx.resume().catch(() => {});
  return ctx;
}

const midiToFreq = (note) => 440 * 2 ** ((note - 69) / 12);

/** Envelope de ataque rápido e queda exponencial, sem o "click" de corte. */
function envelope(param, start, peak, attack, release) {
  param.setValueAtTime(0.0001, start);
  param.exponentialRampToValueAtTime(peak, start + attack);
  param.exponentialRampToValueAtTime(0.0001, start + attack + release);
}

/**
 * Sino em FM: uma portadora senoidal modulada por outra, com o índice caindo junto do
 * volume — é o que dá o brilho de vidro no ataque e o corpo limpo no final.
 */
function bell(audio, out, { freq, start, gain = 0.1, ratio = 3.5, index = 1.2, release = 0.4, send = 0.4 }) {
  const carrier = audio.createOscillator();
  const modulator = audio.createOscillator();
  const modGain = audio.createGain();
  const env = audio.createGain();

  carrier.frequency.value = freq;
  modulator.frequency.value = freq * ratio;
  modGain.gain.setValueAtTime(freq * index, start);
  modGain.gain.exponentialRampToValueAtTime(1, start + release);

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);
  carrier.connect(env);
  envelope(env.gain, start, gain, 0.004, release);

  env.connect(out);
  if (send > 0) {
    const sendGain = audio.createGain();
    sendGain.gain.value = send;
    env.connect(sendGain);
    sendGain.connect(reverbIn);
  }

  carrier.start(start);
  modulator.start(start);
  carrier.stop(start + release + 0.05);
  modulator.stop(start + release + 0.05);
}

/** Rajada de ruído filtrado: whoosh de transição, chimbal e caixa. */
function noise(audio, out, { start, duration, gain, type = 'bandpass', freq = 2000, q = 1, sweepTo = null }) {
  const source = audio.createBufferSource();
  source.buffer = noiseBuffer;
  const filter = audio.createBiquadFilter();
  filter.type = type;
  filter.frequency.setValueAtTime(freq, start);
  if (sweepTo) filter.frequency.exponentialRampToValueAtTime(sweepTo, start + duration);
  filter.Q.value = q;
  const env = audio.createGain();
  envelope(env.gain, start, gain, Math.min(0.01, duration / 4), duration);
  source.connect(filter);
  filter.connect(env);
  env.connect(out);
  source.start(start, Math.random() * 0.5);
  source.stop(start + duration + 0.05);
}

// ---------------------------------------------------------------------------
// SE
// ---------------------------------------------------------------------------

function se() {
  if (!seOn) return null;
  return getContext();
}

/** Cursor passando por um item: um "tic" de vidro, bem curto. */
export function playHover() {
  const audio = se();
  if (!audio) return;
  const t = audio.currentTime;
  bell(audio, master, { freq: 2093, start: t, gain: 0.035, ratio: 2, index: 0.6, release: 0.09, send: 0.15 });
}

/** Confirmar: duas notas de sino subindo, com um brilho de ruído no ataque. */
export function playConfirm() {
  const audio = se();
  if (!audio) return;
  const t = audio.currentTime;
  bell(audio, master, { freq: 1318.5, start: t, gain: 0.07, release: 0.22 });
  bell(audio, master, { freq: 1975.5, start: t + 0.05, gain: 0.06, release: 0.35 });
  noise(audio, master, { start: t, duration: 0.08, gain: 0.03, type: 'highpass', freq: 6000 });
}

/** Cancelar / voltar: whoosh descendo e uma nota grave. */
export function playCancel() {
  const audio = se();
  if (!audio) return;
  const t = audio.currentTime;
  noise(audio, master, { start: t, duration: 0.18, gain: 0.05, freq: 3500, q: 2, sweepTo: 600 });
  bell(audio, master, { freq: 659.3, start: t + 0.02, gain: 0.05, ratio: 2, index: 0.8, release: 0.25 });
}

/** "Press start": varredura de ruído subindo e um arpejo de sinos em cascata. */
export function playStart() {
  const audio = se();
  if (!audio) return;
  const t = audio.currentTime;
  noise(audio, master, { start: t, duration: 0.7, gain: 0.05, freq: 400, q: 3, sweepTo: 7000 });
  [76, 83, 88, 91, 95].forEach((note, i) => {
    bell(audio, master, { freq: midiToFreq(note), start: t + 0.12 + i * 0.07, gain: 0.05, release: 0.9, send: 0.6 });
  });
}

// ---------------------------------------------------------------------------
// BGM — faixa original em Ré dórico, 8 compassos em loop, ~90 BPM com swing.
// ---------------------------------------------------------------------------

const BPM = 90;
const STEP = 60 / BPM / 4; // semicolcheia
const SWING = 0.18; // atraso das semicolcheias pares, em fração do passo
const STEPS_PER_BAR = 16;
const LOOP_BARS = 8;

/** Encadeamento ii–V–I–VI7: Dm9 · G13 · Cmaj9 · A7(b9). Vozes do piano + baixo. */
const CHORDS = [
  { bass: 38, voicing: [65, 69, 72, 76] },
  { bass: 43, voicing: [65, 71, 76, 81] },
  { bass: 36, voicing: [64, 67, 71, 74] },
  { bass: 45, voicing: [67, 73, 77, 82] },
];

/** Comping do piano: [passo, duração em passos]. */
const COMP = [[0, 5], [7, 2], [10, 5]];

/** Baixo: [passo, intervalo sobre a fundamental, duração]. */
const BASS = [[0, 0, 5], [7, 12, 2], [10, 7, 3], [14, 'approach', 2]];

/** Vibrafone: [compasso, passo, nota MIDI, duração em passos]. Melodia original. */
const MELODY = [
  [0, 4, 81, 2], [0, 6, 79, 2], [0, 8, 77, 4], [0, 12, 76, 2],
  [1, 0, 74, 6], [1, 10, 71, 2], [1, 12, 74, 4],
  [2, 2, 76, 2], [2, 4, 79, 4], [2, 8, 83, 4], [2, 12, 81, 4],
  [3, 0, 79, 4], [3, 4, 77, 2], [3, 6, 76, 2], [3, 8, 73, 8],
  [4, 0, 74, 2], [4, 2, 77, 2], [4, 4, 81, 4], [4, 10, 84, 2], [4, 12, 81, 4],
  [5, 0, 79, 8], [5, 12, 77, 4],
  [6, 0, 76, 4], [6, 6, 74, 2], [6, 8, 76, 2], [6, 10, 79, 6],
  [7, 0, 77, 2], [7, 2, 76, 2], [7, 4, 73, 4], [7, 8, 69, 8],
];

const KICK = new Set([0, 7, 10]);
const SNARE = new Set([4, 12]);

function kick(audio, out, start) {
  const osc = audio.createOscillator();
  const env = audio.createGain();
  osc.frequency.setValueAtTime(130, start);
  osc.frequency.exponentialRampToValueAtTime(42, start + 0.12);
  envelope(env.gain, start, 0.55, 0.003, 0.32);
  osc.connect(env);
  env.connect(out);
  osc.start(start);
  osc.stop(start + 0.4);
}

function snare(audio, out, start) {
  noise(audio, out, { start, duration: 0.16, gain: 0.16, freq: 1800, q: 0.7 });
  const body = audio.createOscillator();
  const env = audio.createGain();
  body.type = 'triangle';
  body.frequency.setValueAtTime(220, start);
  body.frequency.exponentialRampToValueAtTime(160, start + 0.08);
  envelope(env.gain, start, 0.08, 0.002, 0.09);
  body.connect(env);
  env.connect(out);
  body.start(start);
  body.stop(start + 0.15);
}

/** Piano elétrico: FM com razão 1:1 e índice que cai — o "tine" de um Rhodes. */
function epiano(audio, out, note, start, duration) {
  const freq = midiToFreq(note);
  bell(audio, out, { freq, start, gain: 0.05, ratio: 1, index: 1.6, release: duration + 0.35, send: 0.5 });
  bell(audio, out, { freq: freq * 1.003, start, gain: 0.025, ratio: 1, index: 0.4, release: duration + 0.5, send: 0.5 });
}

function bassNote(audio, out, note, start, duration) {
  const osc = audio.createOscillator();
  const filter = audio.createBiquadFilter();
  const env = audio.createGain();
  osc.type = 'triangle';
  osc.frequency.value = midiToFreq(note);
  filter.type = 'lowpass';
  filter.frequency.value = 600;
  env.gain.setValueAtTime(0.0001, start);
  env.gain.exponentialRampToValueAtTime(0.32, start + 0.015);
  env.gain.setValueAtTime(0.32, start + duration * 0.7);
  env.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(filter);
  filter.connect(env);
  env.connect(out);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function vibes(audio, out, note, start, duration) {
  const freq = midiToFreq(note);
  bell(audio, out, { freq, start, gain: 0.04, ratio: 4, index: 0.5, release: duration + 0.6, send: 0.8 });
}

function scheduleStep(audio, out, step, time) {
  const barIndex = Math.floor(step / STEPS_PER_BAR) % LOOP_BARS;
  const s = step % STEPS_PER_BAR;
  const chord = CHORDS[barIndex % CHORDS.length];
  const nextChord = CHORDS[(barIndex + 1) % CHORDS.length];
  const t = time + (s % 2 === 1 ? STEP * SWING : 0);

  if (KICK.has(s)) kick(audio, out, t);
  if (SNARE.has(s)) snare(audio, out, t);
  if (s % 2 === 0) {
    noise(audio, out, { start: t, duration: s === 14 ? 0.18 : 0.035, gain: s % 4 === 0 ? 0.05 : 0.03, type: 'highpass', freq: 8000 });
  } else if (barIndex % 2 === 1 && s === 15) {
    noise(audio, out, { start: t, duration: 0.03, gain: 0.02, type: 'highpass', freq: 9000 });
  }

  COMP.forEach(([at, length]) => {
    if (at !== s) return;
    chord.voicing.forEach((note, i) => epiano(audio, out, note, t + i * 0.008, length * STEP));
  });

  BASS.forEach(([at, interval, length]) => {
    if (at !== s) return;
    const note = interval === 'approach' ? nextChord.bass + 1 : chord.bass + interval;
    bassNote(audio, out, note, t, length * STEP);
  });

  MELODY.forEach(([bar, at, note, length]) => {
    if (bar === barIndex && at === s) vibes(audio, out, note, t, length * STEP);
  });
}

export function startBgm() {
  if (!bgmOn || bgm) return;
  const audio = getContext();
  if (!audio) return;

  const bus = audio.createGain();
  bus.gain.setValueAtTime(0.0001, audio.currentTime);
  bus.gain.exponentialRampToValueAtTime(0.5, audio.currentTime + 2.5);
  // Um passa-baixa geral deixa tudo um pouco "abafado", no clima lo-fi.
  const tone = audio.createBiquadFilter();
  tone.type = 'lowpass';
  tone.frequency.value = 5200;
  bus.connect(tone);
  tone.connect(master);

  const state = { bus, step: 0, nextTime: audio.currentTime + 0.1, timer: null };
  const tick = () => {
    while (state.nextTime < audio.currentTime + 0.15) {
      scheduleStep(audio, bus, state.step, state.nextTime);
      state.step += 1;
      state.nextTime += STEP;
    }
  };
  tick();
  state.timer = setInterval(tick, 30);
  bgm = state;
}

export function stopBgm() {
  if (!bgm || !ctx) return;
  const { bus, timer } = bgm;
  clearInterval(timer);
  const now = ctx.currentTime;
  bus.gain.cancelScheduledValues(now);
  bus.gain.setValueAtTime(Math.max(bus.gain.value, 0.0001), now);
  bus.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
  setTimeout(() => bus.disconnect(), 1200);
  bgm = null;
}

// ---------------------------------------------------------------------------
// Preferências
// ---------------------------------------------------------------------------

export const isSeOn = () => seOn;
export const isBgmOn = () => bgmOn;

export function setSeOn(on) {
  seOn = on;
  writePref(SE_KEY, on);
}

export function setBgmOn(on) {
  bgmOn = on;
  writePref(BGM_KEY, on);
  if (on) startBgm();
  else stopBgm();
}
