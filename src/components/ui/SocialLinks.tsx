import { useTranslation } from 'react-i18next';
import { profile } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const base =
  'grid h-11 w-11 place-items-center rounded-xl border border-line/80 bg-surface/60 text-muted transition-all duration-300';

/** GitHub / LinkedIn icons. Missing links render as clearly-labelled disabled placeholders. */
export default function SocialLinks() {
  const { t } = useTranslation();
  const links = [
    { href: profile.github, label: t('a11y.github'), Icon: GithubIcon },
    { href: profile.linkedin, label: t('a11y.linkedin'), Icon: LinkedinIcon },
  ];

  return (
    <ul className="flex items-center gap-3">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`${base} hover:-translate-y-0.5 hover:border-accent/60 hover:text-fg`}
            >
              <Icon />
            </a>
          ) : (
            <span
              role="img"
              aria-label={`${label} — ${t('common.linkSoon')}`}
              title={t('common.linkSoon')}
              className={`${base} cursor-not-allowed border-dashed opacity-60`}
            >
              <Icon />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
