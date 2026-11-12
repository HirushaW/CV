import { BuildGroup } from '../build/Build';
import SectionHead from '../components/SectionHead';
import { experience, leadership, membership } from '../content';

export function Experience() {
  return (
    <BuildGroup as="section" id="experience" className="section">
      <div className="wrap">
        <SectionHead
          n={4}
          code="EXPERIENCE"
          kicker="Industry"
          title="Pharmaceutical Industry Training"
          sub="Manufacturing, quality control and formulation development, in Sri Lanka and China."
        />

        <div className="timeline">
          {experience.map((e) => (
            <article className="exp" key={e.org}>
              <div className="exp-rail" aria-hidden="true">
                <i />
              </div>
              <div className="card exp-card">
                <header className="exp-head" data-b>
                  <p className="exp-when">{e.when}</p>
                  <h3>
                    {e.role} <span>· {e.org}</span>
                  </h3>
                  <p className="exp-place">{e.place}</p>
                </header>
                <ul className="exp-points">
                  {e.points.map((p) => (
                    <li key={p} data-b>
                      {p}
                    </li>
                  ))}
                </ul>
                <ul className="chips chips-red" data-b>
                  {e.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </BuildGroup>
  );
}

export function Leadership() {
  return (
    <BuildGroup as="section" id="leadership" className="section">
      <div className="wrap">
        <SectionHead
          n={5}
          code="LEADERSHIP"
          kicker="Service"
          title="Leadership & Professional Service"
          sub="Faculty of Science, University of Peradeniya."
        />

        <ol className="lead-list">
          {leadership.map((l, i) => (
            <li key={l.role + l.org} className={l.current ? 'current' : ''} data-b>
              <span className="lead-n">{String(i + 1).padStart(2, '0')}</span>
              <div className="lead-main">
                <p className="lead-role">
                  {l.role}
                  {l.current && <em>Current</em>}
                </p>
                <p className="lead-org">{l.org}</p>
              </div>
              <span className="lead-when">{l.when}</span>
            </li>
          ))}
        </ol>

        <div className="card member" data-b>
          <p className="tag">Professional membership</p>
          <p className="member-title">{membership.title}</p>
          <p className="lead-when">{membership.when}</p>
        </div>
      </div>
    </BuildGroup>
  );
}
