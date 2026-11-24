import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { LINKS } from '../../data/content';
import ArcanaCard from '../ArcanaCard';

/** Aba SOCIAL LINK: os contatos como os vínculos do jogo, cada um com seu Arcano. */
export default function SocialSection({ copy, onActivate, reducedMotion }) {
  const s = copy.social;
  const lang = copy.htmlLang === 'en' ? 'en' : 'pt';

  const links = [
    { id: 'linkedin', icon: <FaLinkedin />, href: LINKS.linkedin, handle: 'in/lucasmelare', external: true },
    { id: 'github', icon: <FaGithub />, href: LINKS.github, handle: '@melanolachef', external: true },
    { id: 'email', icon: <FaEnvelope />, href: `mailto:${LINKS.email}`, handle: LINKS.email },
  ];

  return (
    <div className="scroll-area">
      <ul className="social-list">
        {links.map((link, index) => {
          const info = s.links[link.id];
          return (
            <motion.li
              key={link.id}
              initial={reducedMotion ? false : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07, duration: 0.25 }}
            >
              <a
                className="social-link"
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onMouseEnter={onActivate.hover}
                onClick={onActivate.confirm}
              >
                <ArcanaCard arcana={info.arcana} lang={lang} />
                <span className="social-link__body">
                  <span className="social-link__name">
                    <span className="social-link__icon" aria-hidden="true">{link.icon}</span>
                    {info.name}
                  </span>
                  <span className="social-link__handle">{link.handle}</span>
                  <span className="social-link__sub">{info.sub}</span>
                </span>
                <span className="social-link__rank">
                  <small>{s.rankLabel}</small>MAX
                </span>
              </a>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
