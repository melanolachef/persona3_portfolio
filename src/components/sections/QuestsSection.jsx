import { motion } from 'framer-motion';

/** Aba QUESTS: projetos e entregas apresentados como missões. */
export default function QuestsSection({ copy, reducedMotion }) {
  const q = copy.quests;

  return (
    <div className="scroll-area">
      {q.list.map((quest, index) => (
        <motion.article
          key={quest.id}
          className="quest"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
        >
          <div className="quest__head">
            <div>
              <h3 className="quest__title">{quest.title}</h3>
              <span className="quest__client">{q.clientLabel}: {quest.client}</span>
            </div>
            <span className={`quest__state${quest.state === 'active' ? ' quest__state--active' : ''}`}>
              {q.statusLabels[quest.state]}
            </span>
          </div>
          <p className="quest__techs">[ {q.rewardLabel}: {quest.techs} ]</p>
          <p className="quest__desc">{quest.desc}</p>
        </motion.article>
      ))}
    </div>
  );
}
