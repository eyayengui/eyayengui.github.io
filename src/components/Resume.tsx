import { Award, Briefcase, Eye, FileClock, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile';
import { cvUrl, useCvAvailable } from '../hooks/useCvAvailable';
import { useTList } from '../hooks/useTList';
import CvButton from './ui/CvButton';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function DocPreview() {
  const { t } = useTranslation();
  const list = useTList();
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-2xl border border-line/50 bg-card/40" />
      <div className="relative rounded-2xl border border-line/80 bg-gradient-to-b from-[#161F35] to-surface p-7 shadow-2xl shadow-black/40">
        <span className="absolute right-4 top-4 rounded-md border border-line bg-ink/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
          {t('resume.preview')}
        </span>
        <div className="flex items-center gap-4 border-b border-line/60 pb-5">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary font-extrabold text-white">
            {profile.initials}
          </div>
          <div>
            <p className="text-lg font-bold">{profile.name}</p>
            <p className="text-sm text-accent">{t('hero.title1')}</p>
          </div>
        </div>
        <div className="mt-5 space-y-5 text-sm">
          <div>
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-secondary">
              <GraduationCap size={13} aria-hidden /> {t('resume.education')}
            </p>
            <ul className="space-y-1.5 text-fg/85">
              {list('resume.educationItems').map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-secondary">
              <Briefcase size={13} aria-hidden /> {t('resume.experience')}
            </p>
            <p className="text-fg/85">{t('resume.experienceItem')}</p>
          </div>
          <div aria-hidden className="space-y-2 pt-1">
            <div className="h-1.5 w-full rounded bg-line/50" />
            <div className="h-1.5 w-5/6 rounded bg-line/40" />
            <div className="h-1.5 w-2/3 rounded bg-line/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Resume() {
  const { t } = useTranslation();
  const list = useTList();
  const status = useCvAvailable();

  return (
    <section id="resume" aria-labelledby="resume-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="06" id="resume-title" eyebrow={t('resume.eyebrow')} title={t('resume.title')} subtitle={t('resume.subtitle')} />

        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <DocPreview />

              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <GraduationCap size={18} className="text-accent" aria-hidden />
                  {t('resume.education')}
                </h3>
                <ul className="mt-3 space-y-2">
                  {list('resume.educationItems').map((e) => (
                    <li key={e} className="flex items-start gap-2 text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                      {e}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 flex items-center gap-2 text-lg font-semibold">
                  <Award size={18} className="text-accent" aria-hidden />
                  {t('resume.specialties')}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {list('resume.specialtyItems').map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap gap-3">
                  <CvButton variant="primary" />
                  {status === 'available' && (
                    <a href={cvUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                      <Eye size={16} aria-hidden />
                      {t('cv.view')}
                    </a>
                  )}
                </div>

                {status === 'missing' && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-amber-400/40 bg-amber-400/5 p-4 text-sm">
                    <FileClock size={18} className="mt-0.5 shrink-0 text-amber-300" aria-hidden />
                    <div>
                      <p className="font-medium text-amber-200">{t('cv.missingTitle')}</p>
                      <p className="mt-1 text-muted">{t('cv.missingText')}</p>
                      {import.meta.env.DEV && <p className="mt-2 font-mono text-xs text-muted/80">{t('cv.devHint')}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
