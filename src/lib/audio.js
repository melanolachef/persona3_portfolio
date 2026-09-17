/**
 * Motor de áudio sintetizado (Web Audio API).
 *
 * A versão anterior do portfólio carregava `/hover.mp3` e `/click.mp3`, que nunca
 * existiram no projeto: o navegador recebia o fallback HTML do Vite, a decodificação
 * falhava e o erro era engolido pelo `.catch()`. Nada tocava.
 *
 * Aqui os efeitos são gerados em tempo real com osciladores, então não há arquivo
 * binário para versionar, nada para baixar e nenhum sample de jogo redistribuído.
 */

const STORAGE_KEY = 'p3-portfolio:audio';

let ctx = null;
let masterGain = null;
let bgmNodes = null;
let muted = false;

try {
  muted = localStorage.getItem(STORAGE_KEY) === 'off';
} catch {
  // Modo privado / storage bloqueado: segue com o padrão (som ligado).
  muted = false;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, muted ? 'off' : 'on');
  } catch {
    // Silencioso de propósito: preferência de som não vale um erro em tela.
  }
}

/** O contexto só pode nascer depois de um gesto do usuário (política de autoplay). */
function getContext() {
  if (muted) return null;
  if (!ctx) {
    const AudioContextImpl = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextImpl) return null;
    ctx = new AudioContextImpl();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.9;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

/**
 * Toca uma nota curta. `type` define o timbre e o envelope evita o "click"
 * de corte que aparece quando um oscilador para no meio da onda.
 */
function tone({ freq, duration = 0.12, type = 'square', gain = 0.12, delay = 0, sweepTo = null }) {
  const audio = getContext();
  if (!audio) return;

  const start = audio.currentTime + delay;
  const osc = audio.createOscillator();
  const env = audio.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, start + duration);

  env.gain.setValueAtTime(0.0001, start);
  env.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(env);
  env.connect(masterGain);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

/** Blip seco de navegação, tocado ao passar por um item do menu. */
export function playHover() {
  tone({ freq: 880, duration: 0.07, type: 'square', gain: 0.05 });
}

/** Confirmação: duas notas ascendentes, no espírito dos menus do Persona. */
export function playConfirm() {
  tone({ freq: 660, duration: 0.09, type: 'square', gain: 0.1 });
  tone({ freq: 990, duration: 0.12, type: 'square', gain: 0.09, delay: 0.06 });
}

/** Cancelar / voltar: desce em vez de subir. */
export function playCancel() {
  tone({ freq: 480, duration: 0.12, type: 'triangle', gain: 0.09, sweepTo: 220 });
}

/** Entrada na Dark Hour, tocada no "press to start". */
export function playStart() {
  tone({ freq: 330, duration: 0.5, type: 'sine', gain: 0.12, sweepTo: 660 });
  tone({ freq: 494, duration: 0.4, type: 'triangle', gain: 0.08, delay: 0.12 });
  tone({ freq: 740, duration: 0.6, type: 'sine', gain: 0.07, delay: 0.24 });
}

/**
 * Drone ambiente da Dark Hour: duas oscilações levemente desafinadas entre si,
 * filtradas em passa-baixa e com um LFO lento no volume. Fica no fundo, sem melodia,
 * para não competir com a leitura do conteúdo.
 */
export function startAmbience() {
  const audio = getContext();
  if (!audio || bgmNodes) return;

  const bus = audio.createGain();
  bus.gain.setValueAtTime(0.0001, audio.currentTime);
  bus.gain.exponentialRampToValueAtTime(0.045, audio.currentTime + 4);

  const filter = audio.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 520;

  const voices = [55, 82.5, 110.3].map((freq) => {
    const osc = audio.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    osc.connect(filter);
    osc.start();
    return osc;
  });

  // Respiração lenta do pad.
  const lfo = audio.createOscillator();
  const lfoGain = audio.createGain();
  lfo.frequency.value = 0.07;
  lfoGain.gain.value = 0.02;
  lfo.connect(lfoGain);
  lfoGain.connect(bus.gain);
  lfo.start();

  filter.connect(bus);
  bus.connect(masterGain);

  bgmNodes = { voices, lfo, bus };
}

export function stopAmbience() {
  if (!bgmNodes || !ctx) return;
  const { voices, lfo, bus } = bgmNodes;
  const now = ctx.currentTime;
  bus.gain.cancelScheduledValues(now);
  bus.gain.setValueAtTime(Math.max(bus.gain.value, 0.0001), now);
  bus.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
  [...voices, lfo].forEach((node) => node.stop(now + 0.7));
  bgmNodes = null;
}

export function isMuted() {
  return muted;
}

/** Alterna o som geral e devolve o novo estado (true = mudo). */
export function toggleMuted() {
  muted = !muted;
  persist();
  if (muted) {
    stopAmbience();
    if (masterGain && ctx) {
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
    }
  } else if (masterGain && ctx) {
    masterGain.gain.setValueAtTime(0.9, ctx.currentTime);
  }
  return muted;
}
