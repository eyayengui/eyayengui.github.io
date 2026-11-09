import { ArrowRight, ChevronDown, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile';
import { useTList } from '../hooks/useTList';
import CvButton from './ui/CvButton';
import SocialLinks from './ui/SocialLinks';

const ease = [0.22, 1, 0.36, 1] as const;

const floatingTags = [
  { label: 'Kubernetes', className: '-left-6 top-10', delay: 0 },
  { label: 'Azure AKS', className: '-right-4 top-2', delay: 1.2 },
  { label: 'Terraform', className: '-left-10 bottom-24', delay: 2.1 },
  { label: 'GitHub Actions', className: '-right-8 bottom-16', delay: 0.6 },
  { label: 'Chaos Mesh', className: 'left-1/3 -bottom-5', delay: 1.6 },
];

function CodeCard() {
  const k = 'text-accent';
  const s = 'text-secondary';
  const c = 'text-muted/60';
  return (
    <div className="glass relative rounded-2xl p-1 shadow-2xl shadow-primary/10">
      <div className="flex items-center gap-2 border-b border-line/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-xs text-muted">engineer.yaml</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-6 sm:text-[13px]">
        <code>
          <span className={c}># cloud-native profile</span>
          {'\n'}
          <span className={k}>apiVersion</span>: <span className={s}>portfolio/v1</span>
          {'\n'}
          <span className={k}>kind</span>: <span className={s}>Engineer</span>
          {'\n'}
          <span className={k}>metadata</span>:{'\n'}
          {'  '}
          <span className={k}>name</span>: <span className={s}>eya-yengui</span>
          {'\n'}
          {'  '}
          <span className={k}>location</span>: <span className={s}>tunisia</span>
          {'\n'}
          <span className={k}>spec</span>:{'\n'}
          {'  '}
          <span className={k}>roles</span>: [<span className={s}>cloud</span>, <span className={s}>devops</span>,{' '}
          <span className={s}>full-stack</span>]{'\n'}
          {'  '}
          <span className={k}>cloud</span>: [<span className={s}>azure</span>, <span className={s}>aks</span>,{' '}
          <span className={s}>openstack</span>]{'\n'}
          {'  '}
          <span className={k}>delivery</span>: [<span className={s}>docker</span>, <span className={s}>k8s</span>,{' '}
          <span className={s}>gh-actions</span>]{'\n'}
          {'  '}
          <span className={k}>iac</span>: [<span className={s}>terraform</span>, <span className={s}>ansible</span>]{'\n'}
          {'  '}
          <span className={k}>apps</span>: [<span className={s}>angular</span>, <span className={s}>react</span>,{' '}
          <span className={s}>spring-boot</span>]{'\n'}
          {'  '}
          <span className={k}>resilience</span>: [<span className={s}>chaos-mesh</span>, <span className={s}>prometheus</span>]{'\n'}
          <span className={k}>status</span>:{'\n'}
          {'  '}
          <span className={k}>phase</span>: <span className="text-emerald-400">Running</span>
          <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent/80" aria-hidden />
        </code>
      </pre>
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const list = useTList();
  const badges = list('hero.badges');

  return (
    <section id="home" aria-label={t('nav.home')} className="relative flex min-h-[100svh] items-center pb-20 pt-28">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            className="font-mono text-sm text-muted"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-secondary">~$</span> {t('hero.greeting')}{' '}
            <strong className="font-semibold text-fg">{profile.name}</strong>.
          </motion.p>

          <motion.h1
            className="mt-5 text-[2.5rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <span className="text-gradient block pb-1">{t('hero.title1')}</span>
            <span className="block text-fg">{t('hero.title2')}</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg font-medium text-fg/90 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            className="mt-4 max-w-2xl leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
          >
            {t('hero.description')}
          </motion.p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <motion.li
                key={badge}
                className="chip"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.4, ease }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" aria-hidden />
                {badge}
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
          >
            <a href="#projects" className="btn btn-primary group">
              {t('hero.ctaProjects')}
              <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </a>
            <CvButton />
            <a href="#contact" className="btn btn-ghost">
              <Mail size={16} aria-hidden />
              {t('hero.ctaContact')}
            </a>
          </motion.div>

          <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <div aria-hidden className="absolute inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/20 blur-3xl" />
          <CodeCard />
          {floatingTags.map((tag) => (
            <span
              key={tag.label}
              aria-hidden
              className={`absolute hidden animate-float rounded-lg border border-line/80 bg-surface/90 px-3 py-1.5 font-mono text-xs text-accent shadow-lg backdrop-blur sm:block ${tag.className}`}
              style={{ animationDelay: `${tag.delay}s` }}
            >
              {tag.label}
            </span>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted transition-colors hover:text-fg md:flex"
      >
        <span className="font-mono">{t('hero.scroll')}</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <ChevronDown size={14} aria-hidden />
      </a>
    </section>
  );
}
