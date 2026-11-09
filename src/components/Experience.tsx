import { ArrowUpRight, Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { experiences } from '../data/experience';
import { useTList } from '../hooks/useTList';
import SectionHeading from './ui/SectionHeading';

export default function Experience() {
  const { t } = useTranslation();
  const list = useTList();

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="05" id="experience-title" eyebrow={t('experience.eyebrow')} title={t('experience.title')} subtitle={t('experience.subtitle')} />

        <div className="relative ml-3 md:ml-6">
        <span aria-hidden className="absolute -left-px top-2 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-primary via-secondary/60 to-transparent" />
        <ol className="space-y-10">
          {experiences.map((exp, i) => {
            const base = `experience.items.${exp.id}`;
            return (
              <motion.li
                key={exp.id}
                className="relative pl-8 md:pl-12"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span aria-hidden className="absolute -left-[9px] top-6 grid h-[18px] w-[18px] place-items-center rounded-full bg-ink ring-2 ring-primary">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                </span>

                <article className="glass card-hover rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/20 text-accent ring-1 ring-inset ring-primary/30">
                        <Briefcase size={20} aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{exp.company}</h3>
                        <p className="text-sm font-medium text-accent">{t(`${base}.role`)}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 font-mono text-xs text-muted">
                      {exp.period && (
                        <span className="chip text-muted">
                          <Calendar size={12} aria-hidden />
                          {exp.period}
                        </span>
                      )}
                      {exp.location && (
                        <span className="chip text-muted">
                          <MapPin size={12} aria-hidden />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-5 leading-relaxed text-muted">{t(`${base}.description`)}</p>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {list(`${base}.highlights`).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-fg/90">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-5">
                    <ul className="flex flex-wrap gap-1.5">
                      {exp.tech.map((tech) => (
                        <li key={tech} className="rounded-md bg-ink/60 px-2 py-1 font-mono text-[11px] text-accent/90">
                          {tech}
                        </li>
                      ))}
                    </ul>
                    {exp.projectSlug && (
                      <Link to={`/projects/${exp.projectSlug}`} className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-accent">
                        {t('experience.related')}
                        <ArrowUpRight size={15} aria-hidden />
                      </Link>
                    )}
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ol>
        </div>
      </div>
    </section>
  );
}
