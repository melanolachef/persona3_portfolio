import { motion } from 'framer-motion';

/**
 * Fundo do menu: o "mar" azul do Persona 3 — gradiente profundo, reflexos de água
 * (cáusticas) se movendo devagar, feixes de luz vindos de cima e bolhas subindo.
 *
 * As cáusticas são um SVG com `feTurbulence` renderizado uma única vez como imagem
 * de fundo; a animação só desloca essa imagem, então custa quase nada à GPU.
 */

// Posições fixas (e não Math.random) para o fundo ser igual a cada render.
const BUBBLES = [
  { left: 6, size: 6, delay: 0, duration: 14 },
  { left: 14, size: 12, delay: 5, duration: 18 },
  { left: 23, size: 4, delay: 2, duration: 11 },
  { left: 31, size: 9, delay: 9, duration: 16 },
  { left: 42, size: 5, delay: 4, duration: 13 },
  { left: 51, size: 14, delay: 11, duration: 21 },
  { left: 60, size: 7, delay: 1, duration: 15 },
  { left: 68, size: 4, delay: 7, duration: 12 },
  { left: 76, size: 10, delay: 3, duration: 19 },
  { left: 84, size: 5, delay: 8, duration: 14 },
  { left: 91, size: 8, delay: 12, duration: 17 },
  { left: 97, size: 4, delay: 6, duration: 13 },
];

export default function Backdrop({ started, reducedMotion }) {
  return (
    <div className="sea" aria-hidden="true">
      <div className="sea__caustics" />
      <div className="sea__caustics sea__caustics--back" />
      <div className="sea__rays" />

      {started && (
        <motion.div
          className="moon"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      )}

      {!reducedMotion && (
        <div className="sea__bubbles">
          {BUBBLES.map((b) => (
            <span
              key={b.left}
              className="bubble"
              style={{
                left: `${b.left}%`,
                width: b.size,
                height: b.size,
                animationDelay: `-${b.delay}s`,
                animationDuration: `${b.duration}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
