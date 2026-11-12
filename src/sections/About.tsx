import { BuildGroup } from '../build/Build';
import SectionHead from '../components/SectionHead';
import Photos from '../components/Photos';
import { about, photos } from '../content';

export default function About() {
  return (
    <BuildGroup as="section" id="about" className="section">
      <div className="wrap">
        <SectionHead id="about" kicker="Profile" title="Background & Focus" />

        <div className="about-grid">
          <div className="about-text">
            {about.paragraphs.map((p) => (
              <p key={p} data-b>
                {p}
              </p>
            ))}
            <blockquote data-b>&ldquo;{about.quote}&rdquo;</blockquote>
            <Photos set={photos.about} className="wide" />
          </div>

          <div className="about-side">
            <div className="side-block">
              <p className="micro" data-b>
                Focus areas
              </p>
              <ul className="focus">
                {about.focus.map((f, i) => (
                  <li key={f} data-b>
                    <span>0{i + 1}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="side-block">
              <p className="micro" data-b>
                Education
              </p>
              {about.education.map((e) => (
                <div className="edu" key={e.place} data-b>
                  <div className="edu-top">
                    <p className="edu-place">{e.place}</p>
                    <p className="edu-years">{e.years}</p>
                  </div>
                  {e.lines.map((line) => (
                    <p className="edu-line" key={line}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BuildGroup>
  );
}
