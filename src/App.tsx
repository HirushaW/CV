import { useEffect } from 'react';
import { StatusPill } from './build/Build';
import { scan } from './build/engine';
import Background from './components/Background';
import Nav from './components/Nav';
import About from './sections/About';
import Contact from './sections/Contact';
import { Experience, Leadership } from './sections/Experience';
import Hero from './sections/Hero';
import Research from './sections/Research';
import Toolkit from './sections/Toolkit';

export default function App() {
  useEffect(() => {
    scan();
  }, []);

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <Research />
        <Toolkit />
        <Experience />
        <Leadership />
        <Contact />
      </main>
      <StatusPill />
    </>
  );
}
