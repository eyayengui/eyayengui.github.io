import { MotionConfig, useAnimate } from 'motion/react';
import { lazy, Suspense, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Background from './components/ui/Background';
import Home from './pages/Home';

const ProjectDetails = lazy(() => import('./components/ProjectDetails'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { i18n } = useTranslation();
  const [scope, animate] = useAnimate<HTMLElement>();
  const firstRender = useRef(true);

  // Soft fade when switching language.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (scope.current) animate(scope.current, { opacity: [0.35, 1] }, { duration: 0.45 });
  }, [i18n.language, animate, scope]);

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <ScrollToTop />
      <Navbar />
      <main id="main" ref={scope} className="overflow-x-clip">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="*" element={<ProjectDetails />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  );
}
