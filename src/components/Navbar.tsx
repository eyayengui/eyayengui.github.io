import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useActiveSection } from '../hooks/useActiveSection';
import CvButton from './ui/CvButton';
import LanguageSwitch from './ui/LanguageSwitch';

export const NAV_SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'resume', 'contact'] as const;

function SectionLink({
  id,
  onHome,
  className,
  onClick,
  children,
  current,
}: {
  id: string;
  onHome: boolean;
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
  current?: boolean;
}) {
  const aria = current ? { 'aria-current': 'location' as const } : {};
  return onHome ? (
    <a href={`#${id}`} className={className} onClick={onClick} {...aria}>
      {children}
    </a>
  ) : (
    <Link to={{ pathname: '/', hash: `#${id}` }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const active = useActiveSection(NAV_SECTIONS, onHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-line/60 bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {t('a11y.skip')}
      </a>
      <nav aria-label={t('a11y.mainNav')} className="container-x flex h-16 items-center justify-between gap-4">
        <SectionLink id="home" onHome={onHome} className="group flex items-center text-xl font-extrabold tracking-tight">
          <span className="text-fg transition-colors group-hover:text-accent">EY</span>
          <span className="text-secondary">.</span>
        </SectionLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map((id) => {
            const isActive = onHome && active === id;
            return (
              <li key={id} className="relative">
                <SectionLink
                  id={id}
                  onHome={onHome}
                  current={isActive}
                  className={`relative block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {t(`nav.${id}`)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </SectionLink>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch id="desktop" />
          <CvButton variant="primary" compact />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch id="mobile" />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line/70 bg-surface/70 text-fg"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-line/60 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {NAV_SECTIONS.map((id, i) => (
                <motion.li key={id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                  <SectionLink
                    id={id}
                    onHome={onHome}
                    onClick={() => setOpen(false)}
                    current={onHome && active === id}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium ${
                      onHome && active === id ? 'bg-card/70 text-fg' : 'text-muted hover:bg-card/40 hover:text-fg'
                    }`}
                  >
                    {t(`nav.${id}`)}
                    <span className="font-mono text-xs text-accent/60">0{i + 1}</span>
                  </SectionLink>
                </motion.li>
              ))}
              <li className="mt-3 px-1">
                <CvButton variant="primary" className="w-full" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
