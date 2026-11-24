import { motion } from 'framer-motion';
import { RESUME_EN, RESUME_PT } from '../../data/content';

/**
 * Aba SYSTEM: "save data" (download dos currículos) e CONFIG (idioma, música e
 * efeitos), como a tela de sistema do jogo.
 *
 * Os downloads são <a download> de verdade, sem `target="_blank"` — combinação que
 * faz parte dos navegadores ignorar o `download` e só abrir o PDF numa aba.
 */
export default function SystemSection({ copy, onActivate, reducedMotion, settings }) {
  const s = copy.system;
  const { ui } = copy;

  const saves = [
    { id: 'resume-pt', ...s.savePt, href: RESUME_PT, download: 'curriculo-lucas-melare-pt.pdf' },
    { id: 'resume-en', ...s.saveEn, href: RESUME_EN, download: 'resume-lucas-melare-en.pdf' },
  ];

  const config = [
    { id: 'lang', label: s.language, value: s.languageValue, onClick: settings.toggleLang },
    { id: 'bgm', label: ui.bgm, value: settings.bgm ? ui.on : ui.off, pressed: settings.bgm, onClick: settings.toggleBgm },
    { id: 'se', label: ui.se, value: settings.se ? ui.on : ui.off, pressed: settings.se, onClick: settings.toggleSe },
  ];

  const enter = (index) => ({
    initial: reducedMotion ? false : { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: index * 0.06, duration: 0.25 },
  });

  return (
    <div className="scroll-area">
      <section>
        <h4 className="section-label">{s.saveLabel}</h4>
        <div className="stack">
          {saves.map((save, index) => (
            <motion.a
              key={save.id}
              className="save-slot"
              href={save.href}
              download={save.download}
              onMouseEnter={onActivate.hover}
              onClick={onActivate.confirm}
              {...enter(index)}
            >
              <span className="save-slot__label">{save.label}</span>
              <span className="save-slot__sub">{save.sub}</span>
              <span className="save-slot__action" aria-hidden="true">PDF ▼</span>
            </motion.a>
          ))}
        </div>
      </section>

      <section>
        <h4 className="section-label">{s.configLabel}</h4>
        <div className="stack">
          {config.map((option, index) => (
            <motion.button
              key={option.id}
              type="button"
              className="config-row"
              aria-pressed={option.pressed}
              onMouseEnter={onActivate.hover}
              onClick={option.onClick}
              {...enter(index + saves.length)}
            >
              <span className="config-row__label">{option.label}</span>
              <span className="config-row__value">
                <span aria-hidden="true">◀ </span>{option.value}<span aria-hidden="true"> ▶</span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
