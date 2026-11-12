import { useState } from 'react';
import { BuildGroup, CountUp } from '../build/Build';
import Molecule, {
  ELEMENT_NAMES,
  elementColor,
  type StructureInfo,
} from '../components/Molecule';
import Gallery from '../components/Gallery';
import SectionHead from '../components/SectionHead';
import CardBackground from '../components/CardBackground';
import {
  colorimeter,
  photos,
  polybuilder,
  software,
  softwareIntro,
  udb,
} from '../content';

export default function Research() {
  const [stage, setStage] = useState(0);
  const [family, setFamily] = useState(udb.viewer.families[0]);
  const [gen, setGen] = useState(3);
  const [info, setInfo] = useState<StructureInfo | null>(null);
  const active = udb.stages[stage];

  return (
    <BuildGroup as="section" id="research" className="section">
      <div className="wrap">
        <SectionHead
          id="research"
          kicker="Computational chemistry"
          title="Research"
          sub="Scientific software built at the Department of Chemistry, University of Peradeniya, for designing nanoscale drug carriers by simulation."
        />

        {/* ------------------------------------------------ Universal Dendrimer Builder */}
        <article className="card flag has-bg">
          <CardBackground name="udb" />
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
            <br />
            {udb.release}
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
                  Stage 0{stage + 1} · {active.name}
                </p>
                <p key={stage} className="stage-text">
                  {active.text}
                </p>
              </div>

              <p className="micro block-label" data-b>
                Contributions
              </p>
              <ul className="points">
                {udb.highlights.map((h) => (
                  <li key={h} data-b>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="viewer" data-b>
              <p className="micro">Structures built with UDB</p>
              <div className="viewer-families" role="group" aria-label="Dendrimer family">
                {udb.viewer.families.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    aria-pressed={f.key === family.key}
                    className={f.key === family.key ? 'on' : ''}
                    onClick={() => setFamily(f)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="viewer-stage">
                <Molecule
                  src={`./structures/${family.key}_g${gen}.json`}
                  className="viewer-canvas"
                  label={`Rotating 3D structure of a ${family.label} generation ${gen} dendrimer built with UDB`}
                  onInfo={setInfo}
                />
                <span className="corner c1" aria-hidden="true" />
                <span className="corner c2" aria-hidden="true" />
                <p className="viewer-read" aria-hidden="true">
                  {family.label} · G{gen}
                </p>
              </div>

              <div className="viewer-bar" role="group" aria-label="Dendrimer generation">
                <span>Generation</span>
                {udb.viewer.generations.map((g) => (
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

              <dl className="facts" aria-live="polite">
                <div>
                  <dt>Atoms</dt>
                  <dd>{info ? info.atoms.toLocaleString('en-US') : '–'}</dd>
                </div>
                <div>
                  <dt>Heavy atoms</dt>
                  <dd>{info ? info.heavy.toLocaleString('en-US') : '–'}</dd>
                </div>
                <div>
                  <dt>Rg (heavy atoms)</dt>
                  <dd>{info ? `${info.rg.toFixed(2)} Å` : '–'}</dd>
                </div>
              </dl>
              <ul className="legend" aria-label="Atom colours">
                {(info?.elements ?? []).map((el) => (
                  <li key={el}>
                    <i style={{ background: elementColor(el) }} aria-hidden="true" />
                    {ELEMENT_NAMES[el] ?? el}
                  </li>
                ))}
              </ul>
              <p className="viewer-note">{udb.viewer.caption}</p>
            </div>
          </div>

          <div className="caps">
            {udb.capabilities.map((c) => (
              <div key={c.head} data-b>
                <p className="micro">{c.head}</p>
                <p>{c.text}</p>
              </div>
            ))}
          </div>

          <Gallery set={photos.udb} />

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
              <p className="micro">Methods and software</p>
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

        {/* ------------------------------------------------------------- PolyBuilder */}
        <article className="card proj poly has-bg" data-b>
          <CardBackground name="polybuilder" />
          <div className="proj-top">
            <p className="tag">{polybuilder.kind}</p>
            <p className="proj-when">{polybuilder.when}</p>
          </div>
          <div className="proj-body">
            <div>
              <h3>{polybuilder.title}</h3>
              <p className="supervisor">{polybuilder.supervisor}</p>
              <ul className="points">
                {polybuilder.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <ul className="chips">
                {polybuilder.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <ul className="proj-stats">
              {polybuilder.stats.map((st) => (
                <li key={st.label}>
                  <b>{st.value}</b>
                  <span>{st.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <Gallery set={photos.polybuilder} />
        </article>

        {/* ------------------------------------------------------ Scientific software */}
        <header className="sub-head">
          <p className="micro" data-b>
            Projects
          </p>
          <h3 className="sub-title" data-b>
            Scientific Software
          </h3>
          <p className="supervisor" data-b>
            {softwareIntro}
          </p>
        </header>

        <div className="soft-list">
          {software.map((s) => (
            <article key={s.title} className="card soft has-bg">
              <CardBackground name={s.gallery} />
              <div className="proj-top" data-b>
                <p className="tag">Scientific software</p>
                <p className="proj-when">{s.when}</p>
              </div>
              <h3 data-b>{s.title}</h3>
              <p className="soft-summary" data-b>
                {s.summary}
              </p>
              <ul className="points small two">
                {s.details.map((d) => (
                  <li key={d} data-b>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="supervisor" data-b>
                {s.meta}
              </p>
              <div className="proj-foot" data-b>
                <ul className="chips">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a className="proj-link" href={s.link.href} target="_blank" rel="noreferrer">
                  {s.link.label} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <Gallery set={photos[s.gallery]} />
            </article>
          ))}
        </div>

        {/* ---------------------------------------------------------- Instrumentation */}
        <header className="sub-head">
          <p className="micro" data-b>
            Projects
          </p>
          <h3 className="sub-title" data-b>
            Instrumentation
          </h3>
        </header>

        <article className="card proj colorimeter has-bg" data-b>
          <CardBackground name="colorimeter" />
          <div className="proj-top">
            <p className="tag">{colorimeter.kind}</p>
            <p className="proj-when">{colorimeter.when}</p>
          </div>
          <h3>{colorimeter.title}</h3>
          <p className="supervisor">{colorimeter.supervisor}</p>
          <ul className="points cols">
            {colorimeter.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <ul className="chips">
            {colorimeter.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <Gallery set={photos.colorimeter} />
        </article>
      </div>
    </BuildGroup>
  );
}
