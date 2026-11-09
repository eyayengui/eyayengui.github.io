import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { GithubIcon } from './ui/BrandIcons';
import ProjectVisual from './ui/ProjectVisual';

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const base = `projects.items.${project.slug}`;
  const title = t(`${base}.title`);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-hover group flex h-full flex-col overflow-hidden rounded-3xl"
    >
      <Link to={`/projects/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden>
        <ProjectVisual image={project.image} poster={project.poster} alt={title} icon={project.icon} tech={project.tech} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] uppercase tracking-wider text-secondary">{t(`${base}.category`)}</p>
        <h3 className="mt-2 text-xl font-semibold leading-snug">
          <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
            {title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t(`${base}.short`)}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 6).map((tech) => (
            <li key={tech} className="rounded-md bg-ink/60 px-2 py-1 font-mono text-[11px] text-accent/90">
              {tech}
            </li>
          ))}
          {project.tech.length > 6 && (
            <li className="rounded-md bg-ink/60 px-2 py-1 font-mono text-[11px] text-muted">+{project.tech.length - 6}</li>
          )}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-5">
          <Link to={`/projects/${project.slug}`} className="btn btn-outline group/btn px-4 py-2">
            {t('projects.viewDetails')}
            <ArrowUpRight size={15} aria-hidden className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </Link>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost px-3 py-2">
              <GithubIcon size={15} />
              {t('projects.github')}
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost px-3 py-2">
              <ExternalLink size={15} aria-hidden />
              {t('projects.liveDemo')}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
