import { sections } from '../content';

type Props = {
  n: number;
  code: string;
  kicker: string;
  title: string;
  sub?: string;
};

/** The numbered label, small red kicker and heading at the top of each section. */
export default function SectionHead({ n, code, kicker, title, sub }: Props) {
  const total = String(sections.length).padStart(2, '0');
  const index = String(n).padStart(2, '0');
  return (
    <header className="sec-head">
      <p className="sec-index" data-b aria-hidden="true">
        <span className="slashes">{'//'}</span> {index}.00 SEC_{code}
        <span className="sec-count">
          INDEX [{index}/{total}]
        </span>
      </p>
      <p className="micro" data-b>
        {kicker}
      </p>
      <h2 data-b>{title}</h2>
      {sub && (
        <p className="sec-sub" data-b>
          {sub}
        </p>
      )}
    </header>
  );
}
