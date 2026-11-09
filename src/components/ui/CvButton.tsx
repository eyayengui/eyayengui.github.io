import { Download, FileClock, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cvUrl, useCvAvailable } from '../../hooks/useCvAvailable';

interface CvButtonProps {
  variant?: 'primary' | 'outline';
  compact?: boolean;
  className?: string;
}

/** Download button that only becomes active when the PDF actually exists. */
export default function CvButton({ variant = 'outline', compact = false, className = '' }: CvButtonProps) {
  const { t } = useTranslation();
  const status = useCvAvailable();
  const size = compact ? 'px-4 py-2' : '';

  if (status === 'available') {
    return (
      <a
        href={cvUrl()}
        download="Eya_Yengui_CV.pdf"
        className={`btn btn-${variant} ${size} ${className}`}
      >
        <Download size={16} aria-hidden />
        {t('cv.download')}
      </a>
    );
  }

  return (
    <span
      aria-disabled="true"
      title={t('cv.missingText')}
      className={`btn btn-disabled ${size} ${className}`}
    >
      {status === 'checking' ? (
        <Loader2 size={16} className="animate-spin" aria-hidden />
      ) : (
        <FileClock size={16} aria-hidden />
      )}
      {t('cv.soon')}
    </span>
  );
}
