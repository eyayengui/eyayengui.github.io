import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projectFilters, projects, type ProjectCategory } from '../data/projects';
import ProjectCard from './ProjectCard';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

type Filter = 'all' | ProjectCategory;

export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');
  const visible = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="03" id="projects-title" eyebrow={t('projects.eyebrow')} title={t('projects.title')} subtitle={t('projects.subtitle')} />

        <Reveal>
          <div role="group" aria-label={t('projects.filtersLabel')} className="mb-10 flex flex-wrap gap-2">
            {projectFilters.map((f) => {
              const active = f === filter;
              const count = f === 'all' ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`relative isolate rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active ? 'border-transparent text-white' : 'border-line/80 bg-surface/50 text-muted hover:border-accent/50 hover:text-fg'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {t(`projects.filters.${f}`)}
                  <span className={`ml-2 font-mono text-xs ${active ? 'text-white/80' : 'text-muted/70'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
