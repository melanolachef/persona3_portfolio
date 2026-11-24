import { motion } from 'framer-motion';

/**
 * Tela de abertura. É um <button> de verdade (e não uma div com onClick) para que
 * "pressione qualquer tecla" também valha no teclado — Enter e Espaço vêm de graça,
 * e o leitor de tela anuncia o elemento como acionável.
 */
export default function TitleScreen({ copy, onStart, reducedMotion }) {
  return (
    <motion.button
      type="button"
      className="title-screen"
      onClick={onStart}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06, filter: 'blur(6px)' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <span className="title-screen__logo">
        <motion.span
          className="title-screen__band"
          aria-hidden="true"
          initial={reducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
        />
        <motion.span
          className="title-screen__name"
          initial={reducedMotion ? false : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
        >
          {copy.name}
        </motion.span>
        <motion.span
          className="title-screen__subtitle"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {copy.subtitle}
        </motion.span>
      </span>

      <motion.span
        className="title-screen__prompt"
        initial={{ opacity: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: [0, 1, 0.25, 1] }}
        transition={
          reducedMotion
            ? { delay: 1.2 }
            : { delay: 1.2, duration: 2.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }
      >
        {copy.prompt}
      </motion.span>
    </motion.button>
  );
}
