import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TitleScreen from './components/TitleScreen';
import Menu from './components/Menu';
import Hud from './components/Hud';
import ContentPanel from './components/ContentPanel';
import { CONTENT } from './data/content';
import { useIsMobile, usePrefersReducedMotion } from './hooks/useMediaQuery';
import {
  isMuted,
  playCancel,
  playConfirm,
  playHover,
  playStart,
  startAmbience,
  stopAmbience,
  toggleMuted,
} from './lib/audio';

const LANG_KEY = 'p3-portfolio:lang';

/** Referência estável para "sem som", para não recriar handlers a cada render. */
const noop = () => {};

/** Idioma inicial: preferência salva, senão o idioma do navegador. */
function initialLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'pt' || saved === 'en') return saved;
  } catch {
    // storage indisponível — cai no idioma do navegador.
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [lang, setLang] = useState(initialLang);
  const [muted, setMuted] = useState(isMuted);
  const [ambience, setAmbience] = useState(false);

  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const copy = CONTENT[lang];

  // Mantém o idioma do documento coerente com o conteúdo, para leitores de tela
  // e para a tradução automática do navegador.
  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // preferência de idioma não persistida; a sessão atual segue normal.
    }
  }, [lang, copy.htmlLang]);

  // Os SFX só valem no desktop: no touch, "hover" dispara junto do toque e o som sai dobrado.
  const sfx = useMemo(() => ({
    hover: isMobile ? noop : playHover,
    confirm: playConfirm,
    cancel: playCancel,
  }), [isMobile]);

  const start = useCallback(() => {
    setGameStarted(true);
    playStart();
  }, []);

  // O clique da title screen é o gesto que libera o áudio; qualquer tecla também começa.
  useEffect(() => {
    if (gameStarted) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') return; // o <button> já trata
      start();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, start]);

  // Para o drone ao desmontar, para não deixar áudio tocando em hot reload.
  useEffect(() => stopAmbience, []);

  const handleSelect = useCallback((id) => {
    setActiveSection(id);
    playConfirm();
  }, []);

  const handleBack = useCallback(() => {
    setActiveSection((current) => {
      if (current) playCancel();
      return null;
    });
  }, []);

  const handleToggleMuted = useCallback(() => {
    const next = toggleMuted();
    setMuted(next);
    if (next) setAmbience(false);
    else playConfirm();
  }, []);

  const handleToggleAmbience = useCallback(() => {
    setAmbience((current) => {
      if (current) {
        stopAmbience();
        return false;
      }
      startAmbience();
      return true;
    });
    playConfirm();
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((current) => (current === 'pt' ? 'en' : 'pt'));
    playConfirm();
  }, []);

  return (
    <div className="app">
      <div className="backdrop-grid" aria-hidden="true" />

      {gameStarted && (
        <motion.div
          className="moon"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 2 }}
        />
      )}

      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <TitleScreen
            key="title"
            copy={copy.title}
            onStart={start}
            reducedMotion={reducedMotion}
          />
        ) : (
          <motion.div
            key="layout"
            className="layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hud
              copy={copy}
              lang={lang}
              onToggleLang={handleToggleLang}
              muted={muted}
              onToggleMuted={handleToggleMuted}
              ambience={ambience}
              onToggleAmbience={handleToggleAmbience}
              onHover={sfx.hover}
            />

            {/* No celular o painel ocupa a tela inteira, então o menu sai de cena. */}
            {(!isMobile || !activeSection) && (
              <Menu
                copy={copy}
                activeSection={activeSection}
                onSelect={handleSelect}
                onHover={sfx.hover}
              />
            )}

            {activeSection && (
              <div className="content-pane">
                <AnimatePresence mode="wait">
                  <ContentPanel
                    key={activeSection}
                    section={activeSection}
                    copy={copy}
                    isMobile={isMobile}
                    reducedMotion={reducedMotion}
                    sfx={sfx}
                    onBack={handleBack}
                  />
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="backdrop-vignette" aria-hidden="true" />
    </div>
  );
}
