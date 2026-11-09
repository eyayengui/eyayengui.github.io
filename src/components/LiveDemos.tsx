import { ArrowUpRight, ExternalLink, Link2Off, Maximize2, Play } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { resolveUrl } from '../data/profile';
import { projects, type Project } from '../data/projects';
import { GithubIcon } from './ui/BrandIcons';
import BrowserFrame from './ui/BrowserFrame';
import PreviewModal from './ui/PreviewModal';
import ProjectVisual from './ui/ProjectVisual';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function DemoItem({ project, reverse, onPreview }: { project: Project; reverse: boolean; onPreview: () => void }) {
  const { t } = useTranslation();
  const base = `projects.items.${project.slug}`;
  const hasVideo = Boolean(project.video);
  const canPreview = Boolean(project.video || project.image || project.live);

  return (
    <Reveal>
      <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className={`group lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
          <div className="relative">
            <div aria-hidden className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/15 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <BrowserFrame url={project.live} className="transition-transform duration-500 group-hover:-translate-y-1">
              {hasVideo ? (
                <video
                  src={resolveUrl(project.video!)}
                  poster={project.poster ? resolveUrl(project.poster) : undefined}
                  controls
                  muted
                  playsInline
                  preload="none"
                  aria-label={`${t(`${base}.title`)} — ${t('common.demoVideo')}`}
                  className="absolute inset-0 h-full w-full bg-ink object-contain"
                />
              ) : (
                <ProjectVisual image={project.image} alt={t(`${base}.title`)} icon={project.icon} tech={project.tech} />
              )}
              {canPreview && !hasVideo && (
                <button
                  type="button"
                  onClick={onPreview}
                  className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all duration-300 hover:bg-ink/50 hover:opacity-100 focus-visible:bg-ink/50 focus-visible:opacity-100"
                >
                  <span className="btn btn-outline">
                    <Maximize2 size={16} aria-hidden />
                    {t('demos.preview')}
                  </span>
                </button>
              )}
            </BrowserFrame>
          </div>
        </div>

        <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
          <p className="font-mono text-xs uppercase tracking-wider text-secondary">{t(`${base}.category`)}</p>
          <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{t(`${base}.title`)}</h3>
          <p className="mt-4 leading-relaxed text-muted">{t(`${base}.description`)}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.live ? (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <ExternalLink size={16} aria-hidden />
                {t('demos.visit')}
              </a>
            ) : project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <GithubIcon size={16} />
                {t('projects.github')}
              </a>
            ) : (
              <span aria-disabled="true" className="btn btn-disabled">
                <Link2Off size={16} aria-hidden />
                {t('common.linkSoon')}
              </span>
            )}
            {canPreview && (
              <button type="button" onClick={onPreview} className="btn btn-outline">
                {hasVideo ? <Play size={16} aria-hidden /> : <Maximize2 size={16} aria-hidden />}
                {hasVideo ? t('demos.watch') : t('demos.preview')}
              </button>
            )}
            <Link to={`/projects/${project.slug}`} className="btn btn-ghost">
              {t('demos.details')}
              <ArrowUpRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function LiveDemos() {
  const { t } = useTranslation();
  const demos = projects.filter((p) => p.liveDemo);
  const [preview, setPreview] = useState<Project | null>(null);
  const closePreview = useCallback(() => setPreview(null), []);

  if (demos.length === 0) return null;

  return (
    <section id="demos" aria-labelledby="demos-title" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="container-x">
        <SectionHeading index="04" id="demos-title" eyebrow={t('demos.eyebrow')} title={t('demos.title')} subtitle={t('demos.subtitle')} />
        <div className="space-y-20 md:space-y-28">
          {demos.map((project, i) => (
            <DemoItem key={project.slug} project={project} reverse={i % 2 === 1} onPreview={() => setPreview(project)} />
          ))}
        </div>
      </div>
      <PreviewModal
        open={preview !== null}
        onClose={closePreview}
        title={preview ? t(`projects.items.${preview.slug}.title`) : ''}
        image={preview?.image}
        video={preview?.video}
        poster={preview?.poster}
        url={preview?.live}
      />
    </section>
  );
}
