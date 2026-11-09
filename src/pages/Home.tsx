import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from '../components/About';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Hero from '../components/Hero';
import LiveDemos from '../components/LiveDemos';
import Projects from '../components/Projects';
import Resume from '../components/Resume';
import Skills from '../components/Skills';

export default function Home() {
  const { hash } = useLocation();

  // Scroll to the requested section when arriving from another page (e.g. /#projects).
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <LiveDemos />
      <Experience />
      <Resume />
      <Contact />
    </>
  );
}
