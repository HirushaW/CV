import { BuildGroup } from '../build/Build';
import SectionHead from '../components/SectionHead';
import { skills } from '../content';

/** Skills, one box per category, following the headings used in the CV. */
export default function Toolkit() {
  return (
    <BuildGroup as="section" id="skills" className="section">
      <div className="wrap">
        <SectionHead
          id="skills"
          kicker="Technical skills"
          title="Skills & Techniques"
          sub="From force fields to chromatography: computational, laboratory and pharmaceutical practice."
        />

        <div className="skill-grid">
          {skills.map((group) => (
            <article className="card skill-box" key={group.category} data-b>
              <header className="skill-box-head">
                <h3>{group.category}</h3>
                <span>{String(group.skills.length).padStart(2, '0')}</span>
              </header>
              <ul className="skill-list">
                {group.skills.map((skill) => (
                  <li key={skill.title}>
                    <p className="skill-name">{skill.title}</p>
                    {skill.items && <p className="skill-items">{skill.items.join(' · ')}</p>}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </BuildGroup>
  );
}
