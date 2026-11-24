import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MENU_ITEMS } from '../data/content';

const listAnim = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
};

const itemAnim = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { type: 'tween', ease: [0.2, 0.9, 0.3, 1], duration: 0.45 } },
};

/**
 * Menu de pausa do Persona 3: itens grandes, inclinados e em escada. O item sob o
 * cursor ganha a faixa branca com a sombra ciano deslocada, e a barra de ajuda no
 * rodapé descreve o que ele abre.
 *
 * O "cursor" existe mesmo sem mouse (como num jogo): setas movem o cursor e o foco,
 * Enter confirma.
 */
export default function Menu({ copy, activeSection, onSelect, onHover, reducedMotion }) {
  const listRef = useRef(null);
  const activeIndex = MENU_ITEMS.findIndex((item) => item.id === activeSection);
  const [cursor, setCursor] = useState(activeIndex === -1 ? 0 : activeIndex);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const list = listRef.current;
      if (!list) return;

      const buttons = Array.from(list.querySelectorAll('button'));
      const focused = buttons.indexOf(document.activeElement);
      const idle = document.activeElement === document.body || document.activeElement === null;
      // Só assume as setas quando o foco está no menu ou em lugar nenhum; dentro do
      // painel elas continuam rolando o conteúdo.
      if (focused === -1 && !idle) return;

      event.preventDefault();
      const from = focused === -1 ? cursor - (event.key === 'ArrowDown' ? 1 : -1) : focused;
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      const next = (from + offset + buttons.length) % buttons.length;
      buttons[next].focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cursor]);

  const moveCursor = (index) => {
    if (index === cursor) return;
    setCursor(index);
    onHover();
  };

  const current = MENU_ITEMS[cursor];

  return (
    <nav className="menu-pane" aria-label={copy.ui.menuLabel}>
      <motion.ul
        ref={listRef}
        className="menu"
        variants={reducedMotion ? undefined : listAnim}
        initial="hidden"
        animate="show"
      >
        {MENU_ITEMS.map((item, index) => {
          const classes = ['menu__button'];
          if (index === cursor) classes.push('is-cursor');
          if (item.id === activeSection) classes.push('is-active');

          return (
            <motion.li key={item.id} variants={reducedMotion ? undefined : itemAnim} style={{ '--i': index }}>
              <button
                type="button"
                className={classes.join(' ')}
                aria-current={item.id === activeSection ? 'true' : undefined}
                aria-describedby={index === cursor ? 'menu-help' : undefined}
                onMouseEnter={() => moveCursor(index)}
                onFocus={() => moveCursor(index)}
                onClick={() => onSelect(item.id)}
              >
                <span className="menu__label" data-text={item.label}>{item.label}</span>
              </button>
            </motion.li>
          );
        })}
      </motion.ul>

      <div className="menu-help" id="menu-help">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${current.id}-${copy.htmlLang}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.15 }}
          >
            {copy.menu[current.id]}
          </motion.p>
        </AnimatePresence>
      </div>
    </nav>
  );
}
