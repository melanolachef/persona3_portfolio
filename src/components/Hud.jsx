import { moonPath, moonPhase, moonPhaseIndex, timeOfDay } from '../lib/calendar';

const LOCALES = { pt: 'pt-BR', en: 'en-US' };
const MOON_R = 13;

/** Ícone da lua com a fase real do dia, desenhado em SVG. */
function Moon({ phase, label }) {
  return (
    <svg className="calendar__moon" viewBox={`-2 -2 ${MOON_R * 2 + 4} ${MOON_R * 2 + 4}`} role="img" aria-label={label}>
      <title>{label}</title>
      <circle cx={MOON_R} cy={MOON_R} r={MOON_R} className="calendar__moon-dark" />
      <path d={moonPath(phase, MOON_R)} className="calendar__moon-lit" />
    </svg>
  );
}

/** Botão de configuração rápida, no formato das legendas de botão do jogo. */
function Toggle({ label, value, pressed, onClick, onHover, title }) {
  return (
    <button
      type="button"
      className="hud-toggle"
      onClick={onClick}
      onMouseEnter={onHover}
      aria-pressed={pressed}
      aria-label={title}
      title={title}
    >
      <span className="hud-toggle__key">{label}</span>
      <span className="hud-toggle__value">{value}</span>
    </button>
  );
}

/**
 * HUD do Persona 3: o calendário no canto superior (data, dia da semana, período do
 * dia e fase da lua) e, embaixo, a barra de legendas de botão com os atalhos de
 * música, efeitos e idioma.
 */
export default function Hud({ copy, now, lang, settings, onHover }) {
  const locale = LOCALES[lang];
  const period = timeOfDay(now);
  const phase = moonPhase(now);
  const dayMonth = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'numeric' }).format(now);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' })
    .format(now)
    .replace('.', '')
    .toUpperCase();
  const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
  const { ui } = copy;

  return (
    <>
      <div className="calendar">
        <div className="calendar__top">
          <time className="calendar__date" dateTime={now.toISOString()}>{dayMonth}</time>
          <span className="calendar__weekday">{weekday}</span>
          <Moon phase={phase} label={copy.calendar.moon[moonPhaseIndex(phase)]} />
        </div>
        <div className="calendar__bottom">
          <span className="calendar__period">{copy.calendar.phases[period]}</span>
          <span className="calendar__time">{time}</span>
        </div>
      </div>

      <div className="prompts">
        <ul className="prompts__keys" aria-hidden="true">
          <li><kbd>↑↓</kbd>{ui.keys.select}</li>
          <li><kbd>Enter</kbd>{ui.keys.confirm}</li>
          <li><kbd>Esc</kbd>{ui.keys.back}</li>
        </ul>
        <div className="prompts__toggles">
          <Toggle
            label="BGM"
            value={settings.bgm ? ui.on : ui.off}
            pressed={settings.bgm}
            onClick={settings.toggleBgm}
            onHover={onHover}
            title={ui.bgm}
          />
          <Toggle
            label="SE"
            value={settings.se ? ui.on : ui.off}
            pressed={settings.se}
            onClick={settings.toggleSe}
            onHover={onHover}
            title={ui.se}
          />
          <Toggle
            label="LANG"
            value={ui.langShort}
            onClick={settings.toggleLang}
            onHover={onHover}
            title={ui.langLabel}
          />
        </div>
      </div>
    </>
  );
}
