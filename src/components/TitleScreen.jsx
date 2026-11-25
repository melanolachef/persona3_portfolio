import { motion } from 'framer-motion';
import { CAMERA_EASE } from '../lib/camera';

const EASE = [0.7, 0, 0.3, 1];

/**
 * Tela de abertura: o aviso "pressione qualquer tecla" é o protagonista — gigante,
 * empilhado à esquerda e ancorado numa barra azul sólida —, com o nome numa linha
 * pequena acima. O fundo é o mesmo mar com a lua do menu (Backdrop), então a entrada
 * no menu é contínua.
 *
 * É um <button> de verdade (e não uma div com onClick) para que "pressione qualquer
 * tecla" também valha no teclado — Enter e Espaço vêm de graça, e o leitor de tela
 * anuncia o elemento como acionável.
 */
export default function TitleScreen({ copy, onStart, reducedMotion }) {
  const enter = (delay) => (reducedMotion
    ? { initial: false }
    : {
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 },
      transition: { delay, duration: 0.5, ease: [0.2, 0.9, 0.3, 1] },
    });

  return (
    <motion.button
      type="button"
      className="title-screen"
      onClick={onStart}
      // Sai junto com a câmera: recua com o zoom out e escorrega para a direita com o giro.
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, x: '12vw', filter: 'blur(4px)' }}
      transition={{ duration: 0.55, ease: CAMERA_EASE }}
    >
      <span className="title-screen__logo">
        <motion.span className="title-screen__heading" {...enter(0.25)}>
          <span className="title-screen__name">{copy.name}</span>
          <span className="title-screen__subtitle">{copy.subtitle}</span>
        </motion.span>

        <span className="title-screen__prompt">
          <motion.span
            className="title-screen__bar"
            aria-hidden="true"
            initial={reducedMotion ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.55, ease: EASE }}
          />
          <motion.span
            className="title-screen__lines"
            animate={reducedMotion ? undefined : { opacity: [1, 1, 0.55, 1] }}
            transition={{ delay: 2, duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {copy.prompt.map((line, index) => (
              <motion.span key={line} className="title-screen__line" {...enter(0.45 + index * 0.12)}>
                {line}
                {/* espaço real entre as linhas, para o nome acessível do botão não colar as palavras */}
                {index < copy.prompt.length - 1 ? ' ' : null}
              </motion.span>
            ))}
          </motion.span>
        </span>
      </span>
    </motion.button>
  );
}
