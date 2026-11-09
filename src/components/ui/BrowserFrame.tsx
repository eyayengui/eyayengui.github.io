import { Lock } from 'lucide-react';
import type { ReactNode } from 'react';

interface BrowserFrameProps {
  url?: string;
  children: ReactNode;
  className?: string;
}

/** Realistic browser window mockup used around screenshots. */
export default function BrowserFrame({ url, children, className = '' }: BrowserFrameProps) {
  const display = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '—';
  return (
    <div className={`overflow-hidden rounded-2xl border border-line/80 bg-surface shadow-2xl shadow-black/40 ${className}`}>
      <div className="flex items-center gap-3 border-b border-line/70 bg-card/80 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-ink/70 px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:text-accent"
          >
            <Lock size={11} aria-hidden className="shrink-0 text-secondary" />
            <span className="truncate">{display}</span>
          </a>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-ink/70 px-3 py-1 font-mono text-[11px] text-muted">
            <Lock size={11} aria-hidden className="shrink-0 text-secondary" />
            <span className="truncate">{display}</span>
          </div>
        )}
      </div>
      <div className="relative aspect-[16/10] bg-ink">{children}</div>
    </div>
  );
}
