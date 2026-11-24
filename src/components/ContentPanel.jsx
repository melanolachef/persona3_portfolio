import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MENU_ITEMS } from '../data/content';
import StatusSection from './sections/StatusSection';
import SkillsSection from './sections/SkillsSection';
import QuestsSection from './sections/QuestsSection';
import SocialSection from './sections/SocialSection';
import SystemSection from './sections/SystemSection';

const SECTIONS = {
  status: StatusSection,
  skills: SkillsSection,
  quests: QuestsSection,
  social: SocialSection,
  system: SystemSection,
};

/**
 * Painel da seção aberta, no formato das telas internas do Persona 3: cabeçalho em
 * faixa inclinada, o nome da tela gigante e translúcido ao fundo e o corpo com canto
 * cortado.
 */
export default function ContentPanel({ section, copy, isMobile, reducedMotion, sfx, settings, onBack }) {
  const Section = SECTIONS[section];
  const panelRef = useRef(null);
  const label = MENU_ITEMS.find((item) => item.id === section)?.label ?? section;

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
      className="panel"
      data-watermark={label}
      tabIndex={-1}
      aria-labelledby="panel-title"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 60, skewX: -4 }}
      animate={{ opacity: 1, x: 0, skewX: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 30, transition: { duration: 0.15 } }}
      transition={{ type: 'tween', ease: [0.2, 0.9, 0.3, 1], duration: 0.35 }}
    >
      <header className="panel__header">
        {isMobile && (
          <button type="button" className="panel__back" onClick={onBack}>
            <span aria-hidden="true">◀</span> {copy.ui.back}
          </button>
        )}
        <h2 id="panel-title" className="panel__title">
          <span>{label}</span>
        </h2>
      </header>

      <div className="panel__body">
        <Section copy={copy} reducedMotion={reducedMotion} onActivate={sfx} settings={settings} />
      </div>
    </motion.section>
  );
}
