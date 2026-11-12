import { BuildGroup, CountUp, Typed } from '../build/Build';
import Dendrimer from '../components/Dendrimer';
import { hero, person } from '../content';

export default function Hero() {
  return (
    <BuildGroup as="section" id="top" className="hero" intro>
      <div className="wrap">
        <p className="hero-kicker" data-b>
          <span className="hex" aria-hidden="true" />
          {hero.kicker}
        </p>

        <div className="giant-wrap">
          <div className="giant" data-b aria-hidden="true">
            {hero.giant.map((part) => (
              <span className="giant-part" key={part}>
                {part.split('').map((letter, i) => (
                  <span key={i}>{letter}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-main">
            <p className="hello" data-b>
              Hello, I&rsquo;m
            </p>
            <h1 className="name" data-b>
              <span aria-hidden="true">{person.first}.</span>
              <span className="sr-only">{person.full}</span>
            </h1>
            <p className="role" data-b>
              <i aria-hidden="true" />
              {person.role}
            </p>
            <p className="tagline" data-b>
              <Typed text={hero.tagline} />
            </p>
            <div className="cta">
              <a className="btn-link" href="#research" data-b>
                Explore research <span aria-hidden="true">→</span>
              </a>
              <a className="btn" href="#contact" data-b>
                Get in touch
              </a>
            </div>
            <ul className="stats">
              {hero.stats.map((s) => (
                <li key={s.label} data-b>
                  <b>
                    <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} />
                  </b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className={`portrait${person.portrait ? ' has-photo' : ''}`} data-b>
            <div className="portrait-frame">
              {person.portrait ? (
                <img
                  src={person.portrait}
                  alt={`Portrait of ${person.full}`}
                  width={920}
                  height={1083}
                />
              ) : (
                <Dendrimer
                  generation={4}
                  className="portrait-canvas"
                  label="Rotating schematic of a fourth-generation dendrimer"
                />
              )}
              <span className="corner c1" aria-hidden="true" />
              <span className="corner c2" aria-hidden="true" />
            </div>
            <figcaption>
              <i aria-hidden="true" />
              {person.portrait
                ? `${person.full} · ${person.location}`
                : 'Dendrimer G4, schematic'}
            </figcaption>
          </figure>

          <aside className="now" aria-label="Current roles">
            <p className="micro" data-b>
              Currently
            </p>
            {hero.now.map((item, i) => (
              <div className="now-item" key={item.title} data-b>
                <span className="now-n">0{i + 1}</span>
                <div>
                  <p className="now-tag">{item.tag}</p>
                  <p className="now-title">{item.title}</p>
                  <p className="now-meta">{item.meta}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </BuildGroup>
  );
}
