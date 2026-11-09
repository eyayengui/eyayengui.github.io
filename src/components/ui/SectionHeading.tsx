import Reveal from './Reveal';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({ index, eyebrow, title, subtitle, id }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent/70">{index}.</span>
        {eyebrow}
        <span aria-hidden className="h-px w-12 bg-gradient-to-r from-secondary/70 to-transparent" />
      </p>
      <h2 id={id} className="mt-4 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
