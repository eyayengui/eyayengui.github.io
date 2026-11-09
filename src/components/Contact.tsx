import { Briefcase, Mail, MapPin, Send, type LucideIcon } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

interface InfoItem {
  icon: LucideIcon | typeof GithubIcon;
  label: string;
  value: ReactNode;
  href?: string;
}

const inputClass =
  'mt-2 w-full rounded-xl border border-line/80 bg-ink/60 px-4 py-3 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', subject: '', message: '' });
  const hasEmail = Boolean(profile.email);
  const soon = <span className="italic text-muted">{t('common.comingSoon')}</span>;

  const info: InfoItem[] = [
    { icon: Mail, label: t('contact.email'), value: profile.email || soon, href: hasEmail ? `mailto:${profile.email}` : undefined },
    { icon: GithubIcon, label: t('contact.github'), value: profile.github ? profile.github.replace(/^https?:\/\/(www\.)?/, '') : soon, href: profile.github || undefined },
    { icon: LinkedinIcon, label: t('contact.linkedin'), value: profile.linkedin ? profile.linkedin.replace(/^https?:\/\/(www\.)?/, '') : soon, href: profile.linkedin || undefined },
    { icon: MapPin, label: t('contact.location'), value: t('contact.locationValue') },
    { icon: Briefcase, label: t('contact.opportunities'), value: t('contact.opportunitiesValue') },
  ];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hasEmail) return;
    const body = `${form.message}\n\n— ${form.name}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="07" id="contact-title" eyebrow={t('contact.eyebrow')} title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <ul className="space-y-3">
              {info.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-accent">
                      <Icon size={18} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">{label}</span>
                      <span className="block truncate text-sm text-fg">{value}</span>
                    </span>
                  </>
                );
                const cls = 'glass flex items-center gap-4 rounded-2xl p-4';
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className={`${cls} card-hover`}>
                        {content}
                      </a>
                    ) : (
                      <div className={cls}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={onSubmit} className="glass relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
              <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />
              <h3 className="relative text-xl font-semibold">{t('contact.form.title')}</h3>
              <fieldset disabled={!hasEmail} className="relative mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-fg/90">
                  {t('contact.form.name')}
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t('contact.form.namePlaceholder')}
                    className={inputClass}
                  />
                </label>
                <label className="text-sm font-medium text-fg/90">
                  {t('contact.form.subject')}
                  <input
                    required
                    name="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={t('contact.form.subjectPlaceholder')}
                    className={inputClass}
                  />
                </label>
                <label className="text-sm font-medium text-fg/90 sm:col-span-2">
                  {t('contact.form.message')}
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className={`${inputClass} resize-y`}
                  />
                </label>
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-relaxed text-muted sm:max-w-sm">
                    {hasEmail ? t('contact.form.note') : t('contact.form.disabled')}
                  </p>
                  <button type="submit" className={`btn ${hasEmail ? 'btn-primary' : 'btn-disabled'}`}>
                    <Send size={16} aria-hidden />
                    {t('contact.form.submit')}
                  </button>
                </div>
              </fieldset>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
