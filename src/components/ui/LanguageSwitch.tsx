import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n';

export default function LanguageSwitch({ id = 'lang' }: { id?: string }) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? 'en';

  return (
    <div
      role="group"
      aria-label={t('a11y.language')}
      className="relative flex rounded-full border border-line/70 bg-surface/70 p-1 font-mono text-xs"
    >
      {LANGUAGES.map((lang) => {
        const active = current === lang;
        return (
          <button
            key={lang}
            type="button"
            lang={lang}
            aria-pressed={active}
            onClick={() => i18n.changeLanguage(lang)}
            className={`relative z-10 rounded-full px-3 py-1 font-semibold transition-colors ${
              active ? 'text-white' : 'text-muted hover:text-fg'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary to-secondary"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
