import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  eyebrow?: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}

export const PageShell = ({ title, eyebrow, description, actions, children, aside }: PageShellProps) => {
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/72 p-5 shadow-command lg:flex-row lg:items-start lg:justify-between">
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.25em] text-harbor">{eyebrow}</p> : null}
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/64">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>

      {aside ? (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">{children}</div>
          <aside className="min-w-0">{aside}</aside>
        </div>
      ) : (
        children
      )}
    </section>
  );
};
