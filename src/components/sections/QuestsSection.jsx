import { motion } from 'framer-motion';

/** Aba QUEST: projetos e entregas como os pedidos numerados do jogo. */
export default function QuestsSection({ copy, reducedMotion }) {
  const q = copy.quests;

  return (
    <div className="scroll-area">
      {q.list.map((quest, index) => (
        <motion.article
          key={quest.id}
          className={`quest${quest.state === 'active' ? ' quest--active' : ''}`}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06, duration: 0.25 }}
        >
          <div className="quest__head">
            <span className="quest__no">No.{String(index + 1).padStart(2, '0')}</span>
            <div className="quest__heading">
              <h3 className="quest__title">{quest.title}</h3>
              <span className="quest__client">{q.clientLabel}: {quest.client}</span>
            </div>
            <span className="quest__state">{q.statusLabels[quest.state]}</span>
          </div>
          <p className="quest__desc">{quest.desc}</p>
          <p className="quest__techs">
            <span className="quest__reward">{q.rewardLabel}</span>
            {quest.techs}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
