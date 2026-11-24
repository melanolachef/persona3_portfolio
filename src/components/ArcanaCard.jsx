import { ARCANA } from '../data/content';

/** Carta de tarô em miniatura: numeral romano e nome do Arcano, como no compêndio. */
export default function ArcanaCard({ arcana, lang }) {
  const card = ARCANA[arcana];
  if (!card) return null;
  return (
    <span className="arcana" title={card[lang]}>
      <span className="arcana__num">{card.num}</span>
      <span className="arcana__name">{card[lang]}</span>
    </span>
  );
}
