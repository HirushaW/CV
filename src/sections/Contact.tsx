import { BuildGroup, useBuild } from '../build/Build';
import { person } from '../content';

export default function Contact() {
  const { total } = useBuild();
  const canReplay =
    total > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const replay = () => {
    try {
      history.scrollRestoration = 'manual';
    } catch {
      /* not supported: the page simply reloads where it is */
    }
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <>
      <BuildGroup as="section" id="contact" className="section contact">
        <div className="wrap">
          <div className="tile" data-b aria-hidden="true">
            <span className="tile-n">06</span>
            <span className="tile-s">Co</span>
            <span className="tile-name">Contact</span>
          </div>
          <p className="micro" data-b>
            Get in touch
          </p>
          <h2 data-b>
            Let&rsquo;s build something
            <br />
            at the nanoscale.
          </h2>
          <p className="sec-sub" data-b>
            For research collaboration, questions about the Universal Dendrimer Builder, or
            anything in computational chemistry, email is the best way to reach me.
          </p>

          <div className="contact-row">
            <a className="contact-mail" href={`mailto:${person.email}`} data-b>
              {person.email}
            </a>
            <a className="btn btn-solid" href={`mailto:${person.email}`} data-b>
              Send an email <span aria-hidden="true">→</span>
            </a>
          </div>

          <ul className="contact-links">
            <li data-b>
              <a href={person.github} target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li data-b>
              <a href={person.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li data-b>
              <span>{person.location}</span>
            </li>
          </ul>
        </div>
      </BuildGroup>

      <footer className="footer">
        <div className="wrap">
          <p>
            © {new Date().getFullYear()} {person.full}
          </p>
          {canReplay && (
            <button type="button" onClick={replay}>
              ↺ Replay the assembly animation
            </button>
          )}
        </div>
      </footer>
    </>
  );
}
