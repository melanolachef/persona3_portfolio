import { motion } from 'framer-motion';

/**
 * Tela de abertura. É um <button> de verdade (e não uma div com onClick) para que
 * "pressione para começar" também valha no teclado — Enter e Espaço vêm de graça,
 * e o leitor de tela anuncia o elemento como acionável.
 */
export default function TitleScreen({ copy, onStart, reducedMotion }) {
  return (
    <motion.button
      type="button"
      className="title-screen"
      onClick={onStart}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.h1
        className="title-screen__name"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {copy.name}
      </motion.h1>

      <motion.span
        className="title-screen__subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {copy.subtitle}
      </motion.span>

      <motion.span
        className="title-screen__prompt"
        animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 0.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
      >
        {copy.prompt}
      </motion.span>
    </motion.button>
  );
}
