import { ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { NAV_SECTIONS } from './Navbar';
import SocialLinks from './ui/SocialLinks';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-line/60 bg-surface/40">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="container-x grid gap-10 py-12 md:grid-cols-3 md:items-start">
        <div>
          <Link to="/" className="text-2xl font-extrabold">
            EY<span className="text-secondary">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">{t('footer.tagline')}</p>
        </div>

        <nav aria-label={t('a11y.mainNav')}>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV_SECTIONS.map((id) => (
              <li key={id}>
                <Link to={{ pathname: '/', hash: `#${id}` }} className="text-muted transition-colors hover:text-fg">
                  {t(`nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 md:items-end">
          <SocialLinks />
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowUp size={15} aria-hidden />
            {t('footer.top')}
          </button>
        </div>
      </div>
      <div className="border-t border-line/50">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. {t('footer.rights')}
          </p>
          <p className="font-mono">{t('footer.built')}</p>
        </div>
      </div>
    </footer>
  );
}
