import { BuildGroup } from '../build/Build';
import SectionHead from '../components/SectionHead';
import CardBackground from '../components/CardBackground';
import Photos from '../components/Photos';
import { experience, leadership, membership, photos, referees } from '../content';

export function Experience() {
  return (
    <BuildGroup as="section" id="experience" className="section">
      <div className="wrap">
        <SectionHead
          id="experience"
          kicker="Professional and industrial experience"
          title="Pharmaceutical Industry Training"
          sub="Manufacturing, quality control and formulation development, in Sri Lanka and China."
        />

        <div className="timeline">
          {experience.map((e) => (
            <article className="exp" key={e.org}>
              <div className="exp-rail" aria-hidden="true">
                <i />
              </div>
              <div className="card exp-card has-bg">
                <CardBackground name={e.photos} />
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
                <Photos set={photos[e.photos]} />
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
          id="leadership"
          kicker="Service"
          title="Leadership & Professional Service"
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
                <p className="lead-place">{l.place}</p>
              </div>
              <span className="lead-when">{l.when}</span>
            </li>
          ))}
        </ol>

        <Photos set={photos.leadership} className="pair" />

        <div className="card member" data-b>
          <p className="tag">Professional membership</p>
          <p className="member-title">{membership.title}</p>
          <p className="lead-when">{membership.when}</p>
        </div>

        <div className="referees">
          <p className="micro" data-b>
            Referees
          </p>
          <div className="referee-grid">
            {referees.map((r) => (
              <div className="card referee" key={r.name} data-b>
                <p className="referee-name">{r.name}</p>
                <p className="referee-title">{r.title}</p>
                <p className="referee-place">{r.place}</p>
                <a className="referee-mail" href={`mailto:${r.email}`}>
                  {r.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BuildGroup>
  );
}
