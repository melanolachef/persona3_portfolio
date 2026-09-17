import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MENU_ITEMS } from '../data/content';

const listAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemAnim = {
  hidden: { opacity: 0, x: -100, skewX: -15 },
  show: { opacity: 1, x: 0, skewX: -15, transition: { type: 'spring', stiffness: 80 } },
};

/**
 * Menu lateral inclinado. Cada item é um <button> dentro de uma lista, com navegação
 * por setas no estilo de menu de jogo; antes eram <li> com onClick, invisíveis para
 * teclado e para leitores de tela.
 */
export default function Menu({ copy, activeSection, onSelect, onHover }) {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const handleKeyDown = (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

      const buttons = Array.from(list.querySelectorAll('button'));
      const current = buttons.indexOf(document.activeElement);
      if (current === -1) return;

      event.preventDefault();
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      const next = (current + offset + buttons.length) % buttons.length;
      buttons[next].focus();
      onHover();
    };

    list.addEventListener('keydown', handleKeyDown);
    return () => list.removeEventListener('keydown', handleKeyDown);
  }, [onHover]);

  return (
    <nav className="menu-pane" aria-label={copy.ui.menuLabel}>
      <motion.ul ref={listRef} className="menu" variants={listAnim} initial="hidden" animate="show">
        {MENU_ITEMS.map((item) => (
          <motion.li key={item.id} variants={itemAnim}>
            <button
              type="button"
              className={`menu__button${activeSection === item.id ? ' is-active' : ''}`}
              aria-current={activeSection === item.id ? 'true' : undefined}
              onMouseEnter={onHover}
              onFocus={onHover}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </button>
          </motion.li>
        ))}
      </motion.ul>
      <p className="menu__hint">{copy.ui.hint}</p>
    </nav>
  );
}
