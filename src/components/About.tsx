import { Compass, Cpu, GraduationCap, MapPin, Sparkles, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTList } from '../hooks/useTList';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function About() {
  const { t } = useTranslation();
  const list = useTList();

  const facts = [
    { icon: MapPin, label: t('about.facts.location'), value: t('about.facts.locationValue') },
    { icon: GraduationCap, label: t('about.facts.degree'), value: t('about.facts.degreeValue') },
    { icon: Cpu, label: t('about.facts.background'), value: t('about.facts.backgroundValue') },
  ];

  const cards = [
    { key: 'academic', icon: GraduationCap },
    { key: 'specialization', icon: Sparkles, items: list('about.specialization.items') },
    { key: 'interests', icon: Compass, items: list('about.interests.items') },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="01" id="about-title" eyebrow={t('about.eyebrow')} title={t('about.title')} subtitle={t('about.subtitle')} />

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <article className="glass relative h-full overflow-hidden rounded-3xl p-7 sm:p-8">
              <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px]">
                  <div className="grid h-full w-full place-items-center rounded-[14px] bg-ink text-xl font-extrabold">
                    <span className="text-gradient">EY</span>
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <User size={16} className="text-accent" aria-hidden />
                    {t('about.intro.title')}
                  </h3>
                  <p className="font-mono text-xs text-secondary">Cloud · DevOps · Full-Stack</p>
                </div>
              </div>
              <p className="relative mt-6 leading-relaxed text-muted">{t('about.intro.text')}</p>
              <dl className="relative mt-7 space-y-3 border-t border-line/60 pt-6">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{label}</dt>
                      <dd className="text-sm text-fg">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            {cards.map(({ key, icon: Icon, items }, i) => (
              <Reveal key={key} delay={0.08 * (i + 1)} className={key === 'academic' ? 'sm:col-span-2' : ''}>
                <article className="glass card-hover h-full rounded-3xl p-7">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-accent">
                    <Icon size={20} aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold">{t(`about.${key}.title`)}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{t(`about.${key}.text`)}</p>
                  {items && (
                    <ul className="mt-4 space-y-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-fg/90">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
