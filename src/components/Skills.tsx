import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { skillGroups } from '../data/skills';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
}

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="02" id="skills-title" eyebrow={t('skills.eyebrow')} title={t('skills.title')} subtitle={t('skills.subtitle')} />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(({ id, icon: Icon, items }, i) => (
            <Reveal key={id} delay={0.05 * i} className={id === 'cloud' ? 'lg:row-span-2' : ''}>
              <article
                onMouseMove={trackPointer}
                className="glass card-hover spotlight group h-full rounded-3xl p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/20 text-accent ring-1 ring-inset ring-primary/30 transition-transform duration-300 group-hover:scale-110 group-hover:text-fg">
                    <Icon size={22} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{t(`skills.groups.${id}.title`)}</h3>
                    <p className="mt-1 text-sm text-muted">{t(`skills.groups.${id}.text`)}</p>
                  </div>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line/80 bg-ink/50 px-3 py-1.5 text-sm text-fg/90 transition-colors duration-200 hover:border-secondary/60 hover:text-secondary"
                    >
                      {t(`skills.terms.${item}`, { defaultValue: item })}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
