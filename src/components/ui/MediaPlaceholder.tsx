import type { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MediaPlaceholderProps {
  icon: LucideIcon;
  label: string;
  hint?: string;
  className?: string;
}

/** Clearly-marked empty slot for media (screenshots, diagrams, videos) not yet provided. */
export default function MediaPlaceholder({ icon: Icon, label, hint, className = '' }: MediaPlaceholderProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`placeholder-stripes flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line p-6 text-center ${className}`}
    >
      <Icon size={28} className="text-accent/70" aria-hidden />
      <p className="text-sm font-medium text-fg/80">{label}</p>
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{t('common.placeholder')}</p>
      {hint && import.meta.env.DEV && <p className="font-mono text-[11px] text-muted/80">{hint}</p>}
    </div>
  );
}
