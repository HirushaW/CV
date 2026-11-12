import { useEffect, useState } from 'react';
import { BuildGroup } from '../build/Build';
import { person, sections } from '../content';

export default function Nav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    const top = document.getElementById('top');
    if (top) io.observe(top);
    return () => io.disconnect();
  }, []);

  return (
    <BuildGroup as="header" className="nav">
      <nav className="nav-inner" aria-label="Main" data-b>
        <a className="nav-logo" href="#top" aria-label={`${person.full}, back to top`}>
          {person.initials}
        </a>
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={active === s.id ? 'on' : ''}
                aria-current={active === s.id ? 'true' : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </BuildGroup>
  );
}
