import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TitleScreen from './components/TitleScreen';
import Backdrop from './components/Backdrop';
import Menu from './components/Menu';
import Hud from './components/Hud';
import ContentPanel from './components/ContentPanel';
import { CONTENT } from './data/content';
import { useIsMobile, usePrefersReducedMotion } from './hooks/useMediaQuery';
import { useNow } from './hooks/useNow';
import {
  isBgmOn,
  isSeOn,
  playCancel,
  playConfirm,
  playHover,
  playStart,
  setBgmOn,
  setSeOn,
  startBgm,
  stopBgm,
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
  const [se, setSe] = useState(isSeOn);
  const [bgm, setBgm] = useState(isBgmOn);

  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const now = useNow();
  const isDarkHour = now.getHours() === 0;
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

  // Os SFX de hover só valem no desktop: no touch, "hover" dispara junto do toque.
  const sfx = useMemo(() => ({
    hover: isMobile ? noop : playHover,
    confirm: playConfirm,
    cancel: playCancel,
  }), [isMobile]);

  const start = useCallback(() => {
    setGameStarted(true);
    playStart();
    // A música entra depois do arpejo de abertura, como a BGM do menu no jogo.
    setTimeout(startBgm, 700);
  }, []);

  // O clique da title screen é o gesto que libera o áudio; qualquer tecla também começa.
  useEffect(() => {
    if (gameStarted) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') return; // o <button> já trata
      if (event.key === 'Tab' || event.metaKey || event.ctrlKey || event.altKey) return;
      start();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, start]);

  // Para a música ao desmontar, para não deixar áudio tocando em hot reload.
  useEffect(() => stopBgm, []);

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

  const settings = useMemo(() => ({
    lang,
    se,
    bgm,
    toggleLang: () => {
      setLang((current) => (current === 'pt' ? 'en' : 'pt'));
      playConfirm();
    },
    toggleSe: () => {
      const next = !se;
      setSeOn(next);
      setSe(next);
      if (next) playConfirm();
    },
    toggleBgm: () => {
      const next = !bgm;
      setBgmOn(next);
      setBgm(next);
      playConfirm();
    },
  }), [lang, se, bgm]);

  return (
    <div className={`app${isDarkHour ? ' app--dark-hour' : ''}`}>
      <Backdrop started={gameStarted} reducedMotion={reducedMotion} />

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
            className={`layout${activeSection ? ' layout--open' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hud copy={copy} now={now} lang={lang} settings={settings} onHover={sfx.hover} />

            {/* No celular o painel ocupa a tela inteira, então o menu sai de cena. */}
            {(!isMobile || !activeSection) && (
              <Menu
                copy={copy}
                activeSection={activeSection}
                onSelect={handleSelect}
                onHover={sfx.hover}
                reducedMotion={reducedMotion}
              />
            )}

            <AnimatePresence mode="wait">
              {activeSection && (
                <ContentPanel
                  key={activeSection}
                  section={activeSection}
                  copy={copy}
                  isMobile={isMobile}
                  reducedMotion={reducedMotion}
                  sfx={sfx}
                  settings={settings}
                  onBack={handleBack}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="backdrop-vignette" aria-hidden="true" />
    </div>
  );
}
