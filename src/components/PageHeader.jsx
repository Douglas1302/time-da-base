export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
