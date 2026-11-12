import { sections } from '../content';

type Props = {
  id: string;
  kicker: string;
  title: string;
  sub?: string;
};

/**
 * The heading of each section. The tile on the left is styled like a
 * periodic-table cell: section number, two-letter symbol, section name.
 */
export default function SectionHead({ id, kicker, title, sub }: Props) {
  const index = sections.findIndex((s) => s.id === id);
  const section = sections[index];
  const number = String(index + 1).padStart(2, '0');
  const total = String(sections.length).padStart(2, '0');
  return (
    <header className="sec-head">
      <div className="tile" data-b aria-hidden="true">
        <span className="tile-n">{number}</span>
        <span className="tile-s">{section.symbol}</span>
        <span className="tile-name">{section.label}</span>
      </div>
      <div className="sec-head-text">
        <p className="micro" data-b>
          {kicker}
          <span className="sec-count">
            {number} / {total}
          </span>
        </p>
        <h2 data-b>{title}</h2>
        {sub && (
          <p className="sec-sub" data-b>
            {sub}
          </p>
        )}
      </div>
    </header>
  );
}
