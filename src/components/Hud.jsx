import { useEffect, useState } from 'react';
import { FaVolumeUp, FaVolumeMute, FaMoon, FaRegMoon, FaLanguage } from 'react-icons/fa';

const LOCALES = { pt: 'pt-BR', en: 'en-US' };

/**
 * HUD no canto superior, inspirado no relógio/calendário do Persona 3: mostra a data
 * e a hora reais e concentra os controles de idioma, som e ambiente.
 *
 * Entre 00h e 01h o relógio entra em "Dark Hour" — piscadinha para quem conhece o jogo.
 */
export default function Hud({ copy, lang, onToggleLang, muted, onToggleMuted, ambience, onToggleAmbience, onHover }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Alinha o primeiro tick com a virada do minuto para o relógio não atrasar.
    let interval;
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, (60 - new Date().getSeconds()) * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const locale = LOCALES[lang];
  const isDarkHour = now.getHours() === 0;
  const date = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(now);
  const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(now);

  return (
    <div className="hud">
      <div className="hud__clock">
        <span className="hud__date">{isDarkHour ? 'DARK HOUR' : date.toUpperCase()}</span>
        <time className="hud__time" dateTime={now.toISOString()}>{time}</time>
      </div>

      <button
        type="button"
        className="hud__button"
        onClick={onToggleLang}
        onMouseEnter={onHover}
        aria-label={copy.ui.langLabel}
        title={copy.ui.langLabel}
      >
        <FaLanguage aria-hidden="true" />
      </button>

      <button
        type="button"
        className="hud__button"
        onClick={onToggleAmbience}
        onMouseEnter={onHover}
        aria-pressed={ambience}
        aria-label={ambience ? copy.ui.ambienceOn : copy.ui.ambienceOff}
        title={ambience ? copy.ui.ambienceOn : copy.ui.ambienceOff}
      >
        {ambience ? <FaMoon aria-hidden="true" /> : <FaRegMoon aria-hidden="true" />}
      </button>

      <button
        type="button"
        className="hud__button"
        onClick={onToggleMuted}
        onMouseEnter={onHover}
        aria-pressed={!muted}
        aria-label={muted ? copy.ui.soundOff : copy.ui.soundOn}
        title={muted ? copy.ui.soundOff : copy.ui.soundOn}
      >
        {muted ? <FaVolumeMute aria-hidden="true" /> : <FaVolumeUp aria-hidden="true" />}
      </button>
    </div>
  );
}
