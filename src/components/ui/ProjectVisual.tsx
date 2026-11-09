import { Brain, Building2, CarTaxiFront, Flame, Globe, HeartPulse, House, ImageOff, Plane, Play, Rocket, Server, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { resolveUrl } from '../../data/profile';
import type { ProjectIcon } from '../../data/projects';

export const projectIcons: Record<ProjectIcon, LucideIcon> = {
  brain: Brain,
  flame: Flame,
  server: Server,
  globe: Globe,
  rocket: Rocket,
  heart: HeartPulse,
  building: Building2,
  house: House,
  plane: Plane,
  car: CarTaxiFront,
};

interface ProjectVisualProps {
  image?: string;
  /** Frame from the demo video, used when there is no screenshot */
  poster?: string;
  alt: string;
  icon: ProjectIcon;
  tech?: string[];
  label?: string;
  eager?: boolean;
}

/**
 * Shows the real screenshot (or the demo video's poster frame) when provided,
 * otherwise a generated visual clearly labelled as a placeholder (never a fake screenshot).
 */
export default function ProjectVisual({ image, poster, alt, icon, tech = [], label, eager }: ProjectVisualProps) {
  const { t } = useTranslation();
  const Icon = projectIcons[icon];
  const src = image ?? poster;

  if (src) {
    return (
      <>
        <img
          src={resolveUrl(src)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {!image && (
          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md border border-line bg-ink/80 px-2 py-0.5 font-mono text-[10px] text-fg">
            <Play size={11} aria-hidden className="text-secondary" />
            {t('common.demoVideo')}
          </span>
        )}
      </>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-card via-surface to-ink">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary/25 blur-3xl transition-transform duration-700 group-hover:translate-x-6" />
      <div className="absolute -bottom-12 -right-10 h-48 w-48 rounded-full bg-secondary/20 blur-3xl transition-transform duration-700 group-hover:-translate-x-6" />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-primary/40 bg-ink/60 text-accent shadow-[0_0_40px_-8px_rgba(139,92,246,0.7)] transition-transform duration-500 group-hover:scale-110">
          <Icon size={30} aria-hidden />
        </div>
        {tech.length > 0 && (
          <div className="flex max-w-xs flex-wrap justify-center gap-1.5" aria-hidden>
            {tech.slice(0, 4).map((item) => (
              <span key={item} className="rounded-md bg-ink/60 px-2 py-0.5 font-mono text-[10px] text-muted">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md border border-dashed border-line bg-ink/70 px-2 py-0.5 font-mono text-[10px] text-muted">
        <ImageOff size={11} aria-hidden />
        {label ?? t('common.screenshotSoon')}
      </span>
    </div>
  );
}
