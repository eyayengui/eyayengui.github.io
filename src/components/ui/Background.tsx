/** Fixed decorative background: gradient, tech grid and slow-moving glows. */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#151b36_0%,#0B1020_55%)]" />
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] animate-drift rounded-full bg-primary/20 blur-[120px]" />
      <div
        className="absolute -right-40 top-1/3 h-[30rem] w-[30rem] animate-drift rounded-full bg-secondary/15 blur-[120px]"
        style={{ animationDelay: '-9s' }}
      />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-accent/5 blur-[120px]" />
    </div>
  );
}
