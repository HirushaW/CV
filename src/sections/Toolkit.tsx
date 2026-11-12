import { useRef, useState } from 'react';
import { BuildGroup } from '../build/Build';
import { revealWithin } from '../build/engine';
import SectionHead from '../components/SectionHead';
import { skillGroups, skills, type SkillGroup } from '../content';

type Filter = 'All' | SkillGroup;
const FILTERS: Filter[] = ['All', ...skillGroups];

export default function Toolkit() {
  const [filter, setFilter] = useState<Filter>('All');
  const grid = useRef<HTMLUListElement>(null);

  const choose = (next: Filter) => {
    // Cards that are about to be hidden must not be left waiting to be "built".
    if (grid.current) revealWithin(grid.current);
    setFilter(next);
  };

  return (
    <BuildGroup as="section" id="toolkit" className="section">
      <div className="wrap">
        <SectionHead
          n={3}
          code="TOOLKIT"
          kicker="Capabilities"
          title="The Skills Matrix"
          sub="From force fields to chromatography: computational, laboratory and pharmaceutical practice."
        />

        <div className="filters" role="group" aria-label="Filter skills by area">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={f === filter}
              className={f === filter ? 'on' : ''}
              onClick={() => choose(f)}
              data-b
            >
              {f}
              <span className="filter-n">
                {f === 'All' ? skills.length : skills.filter((s) => s.group === f).length}
              </span>
            </button>
          ))}
        </div>

        <ul className="skill-grid" ref={grid}>
          {skills.map((s) => (
            <li
              key={s.group + s.title}
              className="card skill"
              hidden={filter !== 'All' && s.group !== filter}
              data-b
            >
              <p className="tag">{s.group}</p>
              <h3>{s.title}</h3>
              {s.items && (
                <ul className="chips">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </BuildGroup>
  );
}
