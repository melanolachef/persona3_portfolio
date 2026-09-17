import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import StatusSection from './sections/StatusSection';
import SkillsSection from './sections/SkillsSection';
import QuestsSection from './sections/QuestsSection';
import SystemSection from './sections/SystemSection';

const SECTIONS = {
  status: StatusSection,
  skills: SkillsSection,
  quests: QuestsSection,
  system: SystemSection,
};

/** Painel de vidro com a seção ativa. */
export default function ContentPanel({ section, copy, isMobile, reducedMotion, sfx, onBack }) {
  const Section = SECTIONS[section];
  const panelRef = useRef(null);

  // Esc volta ao menu, como o botão de cancelar de um menu de jogo.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // Move o foco para o painel a cada troca de seção, para que teclado e leitor de
  // tela acompanhem o conteúdo que acabou de entrar.
  useEffect(() => {
    panelRef.current?.focus({ preventScroll: true });
  }, [section]);

  if (!Section) return null;

  return (
    <motion.section
      ref={panelRef}
      key={section}
      className="panel"
      tabIndex={-1}
      aria-labelledby="panel-title"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 50, skewX: -5 }}
      animate={{ opacity: 1, x: 0, skewX: 0 }}
      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      {isMobile && (
        <button type="button" className="panel__back" onClick={onBack}>
          {copy.ui.back}
        </button>
      )}

      <h2 id="panel-title" className="panel__title">{section}</h2>

      <div className="panel__body">
        <Section
          copy={copy}
          reducedMotion={reducedMotion}
          onActivate={sfx}
        />
      </div>
    </motion.section>
  );
}
