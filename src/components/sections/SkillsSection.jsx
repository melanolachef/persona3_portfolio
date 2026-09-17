import { motion } from 'framer-motion';

/** Barra de HP/SP que cresce de 0 até o valor da skill. */
function Gauge({ kind, value, animate }) {
  return (
    <div className={`gauge gauge--${kind}`}>
      <span className="gauge__label">{kind.toUpperCase()}</span>
      <div
        className="gauge__track"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={kind.toUpperCase()}
      >
        <motion.div
          className="gauge__fill"
          initial={animate ? { width: 0 } : false}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/** Aba SKILLS: as tecnologias principais como uma "party", mais o arsenal de apoio. */
export default function SkillsSection({ copy, reducedMotion }) {
  const s = copy.skills;

  return (
    <div className="scroll-area">
      <section>
        <h4 className="section-label">{s.partyLabel}</h4>
        <div className="stack">
          {s.party.map((skill, index) => (
            <motion.article
              key={skill.id}
              className="skill-card"
              initial={reducedMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="skill-card__sigil" aria-hidden="true">{skill.name.charAt(0)}</div>
              <div className="skill-card__body">
                <div className="skill-card__head">
                  <h5 className="skill-card__name">{skill.name}</h5>
                  <span className="skill-card__level">Lv {skill.level}</span>
                </div>
                <p className="skill-card__tag">{skill.tag}</p>
                <Gauge kind="hp" value={skill.hp} animate={!reducedMotion} />
                <Gauge kind="sp" value={skill.sp} animate={!reducedMotion} />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section>
        <h4 className="section-label">{s.arsenalLabel}</h4>
        <ul className="arsenal">
          {s.arsenal.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      </section>
    </div>
  );
}
