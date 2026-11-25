import { ArrowRight, CalendarDays, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from './Badge'
import Button from './Button'
import ProgressBar from './ProgressBar'
import { CAMPAIGN_STATUS_LABELS, formatCurrency, formatDate, formatInteger } from '../utils/format'
import { getCampaignStats } from '../utils/stats'

const statusTone = {
  active: 'grass',
  draft: 'gold',
  closed: 'slate',
}

export default function CampaignCard({ campaign }) {
  const stats = getCampaignStats(campaign)

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:shadow-float">
      <Link
        to={`/campanhas/${campaign.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-ink-900"
        aria-label={`Ver detalhes de ${campaign.name}`}
      >
        <img
          src={campaign.image}
          alt={`Imagem ilustrativa do prêmio: ${campaign.name}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <Badge tone={statusTone[campaign.status] ?? 'slate'} dot>
            {CAMPAIGN_STATUS_LABELS[campaign.status] ?? campaign.status}
          </Badge>
          <span className="rounded-full bg-ink-950/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
            {formatCurrency(campaign.pricePerNumber)} / número
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
            {campaign.beneficiary}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink-900">
            <Link to={`/campanhas/${campaign.slug}`} className="focus-ring rounded transition hover:text-brand-700">
              {campaign.name}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{campaign.tagline}</p>
        </div>

        <ProgressBar
          value={stats.paid}
          total={stats.total}
          label="Números pagos"
          tone="brand"
          size="sm"
        />

        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1.5 text-grass-700">
            <Ticket className="h-3.5 w-3.5" aria-hidden="true" />
            {formatInteger(stats.available)} disponíveis
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(campaign.drawDate)}
          </span>
        </div>

        <Button
          to={`/campanhas/${campaign.slug}`}
          full
          iconRight={ArrowRight}
          variant={campaign.status === 'active' ? 'primary' : 'outline'}
          className="mt-auto"
        >
          {campaign.status === 'active' ? 'Participar' : 'Ver detalhes'}
        </Button>
      </div>
    </article>
  )
}
