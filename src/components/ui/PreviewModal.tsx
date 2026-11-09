import { ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveUrl } from '../../data/profile';

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  image?: string;
  /** Demo video (relative to /public); takes priority over image and iframe */
  video?: string;
  poster?: string;
  url?: string;
}

/** Fullscreen preview: real screenshot if available, otherwise the live site in an iframe. */
export default function PreviewModal({ open, onClose, title, image, video, poster, url }: PreviewModalProps) {
  const { t } = useTranslation();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/90 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-line bg-surface"
            initial={{ scale: 0.96, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-line bg-card/80 px-4 py-3">
              <p className="truncate font-semibold">{title}</p>
              <div className="flex items-center gap-2">
                {url && (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-3 py-2">
                    <ExternalLink size={15} aria-hidden />
                    <span className="hidden sm:inline">{t('demos.visit')}</span>
                  </a>
                )}
                <button ref={closeRef} type="button" onClick={onClose} aria-label={t('a11y.close')} className="btn btn-ghost px-3 py-2">
                  <X size={18} aria-hidden />
                </button>
              </div>
            </div>
            <div className="relative flex-1 bg-ink">
              {video ? (
                <video
                  src={resolveUrl(video)}
                  poster={poster ? resolveUrl(poster) : undefined}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : image ? (
                <img src={resolveUrl(image)} alt={title} className="h-full w-full object-contain" />
              ) : url ? (
                <>
                  <iframe
                    src={url}
                    title={title}
                    className="h-full w-full bg-white"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <p className="absolute bottom-3 left-1/2 w-[92%] max-w-xl -translate-x-1/2 rounded-lg border border-line bg-ink/90 px-3 py-2 text-center text-xs text-muted">
                    {t('demos.iframeNote')}
                  </p>
                </>
              ) : (
                <p className="grid h-full place-items-center text-muted">{t('demos.noPreview')}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
