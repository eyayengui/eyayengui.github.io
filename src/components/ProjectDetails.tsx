import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Film, Image as ImageIcon, Network, Rocket, UserCog } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { resolveUrl } from '../data/profile';
import { getProject, projects } from '../data/projects';
import { useTList } from '../hooks/useTList';
import { GithubIcon } from './ui/BrandIcons';
import BrowserFrame from './ui/BrowserFrame';
import MediaPlaceholder from './ui/MediaPlaceholder';
import PreviewModal from './ui/PreviewModal';
import ProjectVisual from './ui/ProjectVisual';
import Reveal from './ui/Reveal';

interface WorkflowStep {
  title: string;
  text: string;
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="mt-16">
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
          <span aria-hidden className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-secondary" />
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

function isEmbed(url: string) {
  return /youtube\.com\/embed|player\.vimeo\.com/.test(url);
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const list = useTList();
  const project = getProject(slug);
  const [preview, setPreview] = useState<string | null>(null);
  const closePreview = useCallback(() => setPreview(null), []);

  useEffect(() => {
    if (project) document.title = `${t(`projects.items.${project.slug}.title`)} — Eya Yengui`;
    return () => {
      document.title = t('meta.title');
    };
  }, [project, t]);

  if (!project) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <p className="font-mono text-sm text-secondary">404</p>
        <h1 className="mt-3 text-3xl font-bold">{t('common.notFoundTitle')}</h1>
        <p className="mt-3 text-muted">{t('common.notFoundText')}</p>
        <Link to="/" className="btn btn-primary mt-8">
          <ArrowLeft size={16} aria-hidden />
          {t('common.backHome')}
        </Link>
      </div>
    );
  }

  const base = `projects.items.${project.slug}`;
  const title = t(`${base}.title`);
  const has = (s: (typeof project.sections)[number]) => project.sections.includes(s);
  const workflow = list<WorkflowStep>(`${base}.workflow`);
  const role = t(`${base}.role`, { defaultValue: '' });
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const gallery = project.gallery ?? [];

  return (
    <article className="pb-16 pt-28">
      <div className="container-x">
        <Link
          to={{ pathname: '/', hash: '#projects' }}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={16} aria-hidden />
          {t('common.backToProjects')}
        </Link>

        <header className="mt-8 grid items-end gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow">{t(`${base}.category`)}</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="text-gradient">{title}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t(`${base}.description`)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <ExternalLink size={16} aria-hidden />
                  {t('details.visit')}
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <GithubIcon size={16} />
                  {t('projects.github')}
                </a>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="group">
            <BrowserFrame url={project.live}>
              <ProjectVisual image={project.image} poster={project.poster} alt={title} icon={project.icon} tech={project.tech} eager />
            </BrowserFrame>
          </motion.div>
        </header>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Block title={t('details.features')}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {list(`${base}.features`).map((f) => (
                  <li key={f} className="glass flex items-start gap-3 rounded-2xl p-4 text-sm text-fg/90">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
          <aside>
            <Block title={t('details.tech')}>
              <ul className="glass flex flex-wrap gap-2 rounded-2xl p-5">
                {project.tech.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </Block>
          </aside>
        </div>

        {has('workflow') && workflow.length > 0 && (
          <Block title={t('details.workflow')}>
            <ol className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-stretch">
              {workflow.map((step, i) => (
                <li key={step.title} className="flex items-center gap-3 md:flex-1">
                  <div className="glass card-hover flex-1 rounded-2xl p-4 md:min-w-[9rem]">
                    <span className="font-mono text-xs text-secondary">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-1 font-semibold">{step.title}</p>
                    <p className="mt-1 text-xs text-muted">{step.text}</p>
                  </div>
                  {i < workflow.length - 1 && (
                    <span aria-hidden className="hidden text-accent/60 md:inline">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Block>
        )}

        {(has('role') || has('deployment')) && (
          <div className="grid gap-6 md:grid-cols-2">
            {has('role') && (
              <Block title={t('details.role')}>
                <div className="glass flex items-start gap-3 rounded-2xl p-5">
                  <UserCog size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  {role ? (
                    <p className="text-muted">{role}</p>
                  ) : (
                    <p className="italic text-muted">
                      <span className="mr-2 rounded border border-dashed border-line px-1.5 py-0.5 font-mono text-[10px] not-italic uppercase">
                        {t('common.placeholder')}
                      </span>
                      {t('common.toComplete')}
                    </p>
                  )}
                </div>
              </Block>
            )}
            {has('deployment') && (
              <Block title={t('details.deployment')}>
                <div className="glass flex items-start gap-3 rounded-2xl p-5">
                  <Rocket size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <p className="text-muted">{t(`${base}.deployment`)}</p>
                </div>
              </Block>
            )}
          </div>
        )}

        {has('gallery') && (
          <Block title={t('details.gallery')}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.length > 0
                ? gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setPreview(src)}
                      className="group overflow-hidden rounded-2xl border border-line/80"
                    >
                      <img
                        src={resolveUrl(src)}
                        alt={`${title} — ${i + 1}`}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  ))
                : [1, 2, 3].map((n) => (
                    <MediaPlaceholder
                      key={n}
                      icon={ImageIcon}
                      label={`${t('details.galleryPlaceholder')} ${n}`}
                      hint="src/data/projects.ts → gallery"
                    />
                  ))}
            </div>
          </Block>
        )}

        {has('architecture') && (
          <Block title={t('details.architecture')}>
            {project.architecture ? (
              <img
                src={resolveUrl(project.architecture)}
                alt={`${title} — ${t('details.architecture')}`}
                loading="lazy"
                className="w-full rounded-2xl border border-line/80 bg-surface"
              />
            ) : (
              <MediaPlaceholder icon={Network} label={t('details.architecturePlaceholder')} hint="src/data/projects.ts → architecture" className="aspect-[21/9]" />
            )}
          </Block>
        )}

        {has('video') && (
          <Block title={t('details.video')}>
            {project.video ? (
              <div className="overflow-hidden rounded-2xl border border-line/80 bg-ink">
                {isEmbed(project.video) ? (
                  <iframe
                    src={project.video}
                    title={`${title} — ${t('details.video')}`}
                    className="aspect-video w-full"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={resolveUrl(project.video)}
                    poster={project.poster ? resolveUrl(project.poster) : undefined}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full"
                  />
                )}
              </div>
            ) : (
              <MediaPlaceholder icon={Film} label={t('details.videoPlaceholder')} hint="src/data/projects.ts → video" className="aspect-video" />
            )}
          </Block>
        )}

        <Block title={t('details.others')}>
          <ul className="grid gap-4 md:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="glass card-hover group flex h-full flex-col rounded-2xl p-5"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-secondary">{t(`projects.items.${p.slug}.category`)}</span>
                  <span className="mt-2 flex items-start justify-between gap-2 font-semibold">
                    {t(`projects.items.${p.slug}.title`)}
                    <ArrowUpRight size={16} aria-hidden className="shrink-0 text-muted transition-colors group-hover:text-accent" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <PreviewModal open={preview !== null} onClose={closePreview} title={title} image={preview ?? undefined} />
    </article>
  );
}
