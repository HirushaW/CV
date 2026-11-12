import { useState } from 'react';
import { BuildGroup, CountUp } from '../build/Build';
import Dendrimer from '../components/Dendrimer';
import SectionHead from '../components/SectionHead';
import { projects, udb } from '../content';

const GENERATIONS = [1, 2, 3, 4, 5];

export default function Research() {
  const [stage, setStage] = useState(0);
  const [gen, setGen] = useState(4);
  const active = udb.stages[stage];

  return (
    <BuildGroup as="section" id="research" className="section">
      <div className="wrap">
        <SectionHead
          n={2}
          code="RESEARCH"
          kicker="Research & projects"
          title="Flagship Research"
          sub="Scientific software built at the Department of Chemistry, University of Peradeniya, for designing nanoscale drug carriers by simulation."
        />

        <article className="card flag">
          <p className="tag tag-live" data-b>
            <i aria-hidden="true" />
            {udb.tag}
          </p>
          <h3 data-b>{udb.title}</h3>
          <p className="flag-desc" data-b>
            {udb.description}
          </p>
          <p className="supervisor" data-b>
            {udb.supervisor}
          </p>

          <ul className="counters">
            {udb.counters.map((c) => (
              <li key={c.label} data-b>
                <b>
                  <CountUp value={c.value} prefix={c.prefix} />
                </b>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>

          <div className="flag-body">
            <div className="stages">
              <p className="micro" data-b>
                Seven-stage placement engine <span className="micro-hint">· select a stage</span>
              </p>
              <div className="stage-tabs" role="tablist" aria-label="Placement stages">
                {udb.stages.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    role="tab"
                    id={`stage-tab-${i}`}
                    aria-selected={i === stage}
                    aria-controls="stage-panel"
                    className={i === stage ? 'on' : ''}
                    onClick={() => setStage(i)}
                    data-b
                  >
                    <span className="stage-n">S{i + 1}</span>
                    {s.name}
                  </button>
                ))}
              </div>
              <div
                className="stage-panel"
                role="tabpanel"
                id="stage-panel"
                aria-labelledby={`stage-tab-${stage}`}
                data-b
              >
                <p className="micro">
                  Stage 0{stage + 1} <span className="slashes">{'//'}</span> {active.name}
                </p>
                <p key={stage} className="stage-text">
                  {active.text}
                </p>
              </div>

              <div className="notes">
                {udb.notes.map((n) => (
                  <div key={n.head} data-b>
                    <p className="micro">{n.head}</p>
                    <p>{n.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="viewer" data-b>
              <div className="viewer-stage">
                <Dendrimer
                  generation={gen}
                  className="viewer-canvas"
                  label={`Rotating schematic of a generation ${gen} dendrimer`}
                />
                <span className="corner c1" aria-hidden="true" />
                <span className="corner c2" aria-hidden="true" />
                <p className="viewer-read" aria-hidden="true">
                  G{gen} · {4 * 2 ** (gen - 1)} branch ends
                </p>
              </div>
              <div className="viewer-bar" role="group" aria-label="Dendrimer generation">
                <span>Generation</span>
                {GENERATIONS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={g === gen}
                    className={g === gen ? 'on' : ''}
                    onClick={() => setGen(g)}
                  >
                    G{g}
                  </button>
                ))}
              </div>
              <p className="viewer-note">
                Schematic illustration of generational growth, not UDB output. Drag to rotate.
              </p>
            </div>
          </div>

          <div className="flag-foot">
            <div data-b>
              <p className="micro">Chemical families</p>
              <ul className="chips">
                {udb.families.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div data-b>
              <p className="micro">Stack</p>
              <ul className="chips chips-red">
                {udb.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="flag-links">
              {udb.links.map((l) => (
                <a key={l.href} className="btn" href={l.href} target="_blank" rel="noreferrer" data-b>
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </article>

        <div className="proj-grid">
          {projects.map((p) => (
            <article key={p.title} className={`card proj${p.wide ? ' wide' : ''}`} data-b>
              <div className="proj-top">
                <p className="tag">{p.kind}</p>
                <p className="proj-when">{p.when}</p>
              </div>
              <div className="proj-body">
                <div>
                  <h3>{p.title}</h3>
                  {p.text.map((t) => (
                    <p key={t} className="proj-text">
                      {t}
                    </p>
                  ))}
                  {p.supervisor && <p className="supervisor">{p.supervisor}</p>}
                </div>
                {p.stats && (
                  <ul className="proj-stats">
                    {p.stats.map((st) => (
                      <li key={st.label}>
                        <b>{st.value}</b>
                        <span>{st.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="proj-foot">
                <ul className="chips">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {p.link && (
                  <a className="proj-link" href={p.link.href} target="_blank" rel="noreferrer">
                    {p.link.label} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </BuildGroup>
  );
}
