import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { LINKS, RESUME_EN, RESUME_PT } from '../../data/content';

/**
 * Aba SYSTEM: download dos currículos e contatos.
 *
 * Tudo aqui é <a> de verdade. A versão anterior montava um <a> temporário no DOM via
 * JS e combinava `download` com `target="_blank"` — combinação que faz parte dos
 * navegadores ignorar o `download` e só abrir o PDF numa aba.
 */
export default function SystemSection({ copy, onActivate, reducedMotion }) {
  const s = copy.system;

  const options = [
    { id: 'resume-pt', icon: <FaFileDownload />, ...s.saveDataPt, href: RESUME_PT, download: 'curriculo-lucas-melare-pt.pdf' },
    { id: 'resume-en', icon: <FaFileDownload />, ...s.saveDataEn, href: RESUME_EN, download: 'resume-lucas-melare-en.pdf' },
    { id: 'linkedin', icon: <FaLinkedin />, ...s.network, href: LINKS.linkedin, external: true },
    { id: 'github', icon: <FaGithub />, ...s.source, href: LINKS.github, external: true },
    { id: 'email', icon: <FaEnvelope />, ...s.comms, href: `mailto:${LINKS.email}` },
  ];

  return (
    <div className="system-list">
      {options.map((opt, index) => (
        <motion.a
          key={opt.id}
          className="system-option"
          href={opt.href}
          download={opt.download}
          target={opt.external ? '_blank' : undefined}
          rel={opt.external ? 'noopener noreferrer' : undefined}
          onMouseEnter={onActivate.hover}
          onClick={onActivate.confirm}
          initial={reducedMotion ? false : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 }}
        >
          <span className="system-option__icon" aria-hidden="true">{opt.icon}</span>
          <span className="system-option__text">
            <span className="system-option__label">{opt.label}</span>
            <span className="system-option__sub">{opt.sub}</span>
          </span>
        </motion.a>
      ))}
    </div>
  );
}
