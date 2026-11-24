import { motion } from 'framer-motion';
import ArcanaCard from '../ArcanaCard';

/**
 * Aba PERSONA: as tecnologias principais como entradas do compêndio — Arcano, nome,
 * nível e a barra de experiência até o próximo nível —, mais as habilidades de apoio.
 */
export default function SkillsSection({ copy, reducedMotion }) {
  const s = copy.skills;
  const lang = copy.htmlLang === 'en' ? 'en' : 'pt';

  return (
    <div className="scroll-area">
      <section>
        <h4 className="section-label">{s.partyLabel}</h4>
        <ol className="compendium">
          {s.party.map((skill, index) => (
            <motion.li
              key={skill.id}
              className="persona"
              initial={reducedMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
            >
              <ArcanaCard arcana={skill.arcana} lang={lang} />
              <div className="persona__body">
                <div className="persona__head">
                  <h5 className="persona__name">{skill.name}</h5>
                  <span className="persona__level">
                    <small>Lv</small>{skill.level}
                  </span>
                </div>
                <p className="persona__tag">{skill.tag}</p>
                <div className="exp">
                  <span className="exp__label">{s.nextLabel}</span>
                  <div
                    className="exp__track"
                    role="meter"
                    aria-valuenow={skill.exp}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} — ${s.nextLabel}`}
                  >
                    <motion.div
                      className="exp__fill"
                      initial={reducedMotion ? false : { width: 0 }}
                      animate={{ width: `${skill.exp}%` }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.7, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className="section-label">{s.arsenalLabel}</h4>
        <ul className="skill-list">
          {s.arsenal.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      </section>
    </div>
  );
}
