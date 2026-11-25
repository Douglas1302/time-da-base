import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, ChevronRight, Clock3, Copy, FileText, Hash, Info, Share2, ShieldCheck, Sparkles, Ticket, Trophy } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Badge from '../components/Badge'
import Button from '../components/Button'
import CampaignCard from '../components/CampaignCard'
import NotFoundState from '../components/NotFoundState'
import ProgressBar from '../components/ProgressBar'
import { useCampaigns } from '../hooks/useCampaigns'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { CAMPAIGN_STATUS_LABELS, formatCurrency, formatDate, formatInteger } from '../utils/format'
import { getCampaignStats } from '../utils/stats'

const statusTone = { active: 'grass', draft: 'gold', closed: 'slate' }

export default function CampaignDetails() {
  const { slug } = useParams()
  const { getCampaignBySlug, campaigns } = useCampaigns()
  const { copied, copy } = useCopyToClipboard()
  const campaign = getCampaignBySlug(slug)

  if (!campaign) {
    return (
      <NotFoundState
        code="—"
        title="Campanha não encontrada"
        description="A campanha que você tentou abrir não existe neste protótipo. Confira o endereço ou volte para a lista de campanhas."
      />
    )
  }

  const stats = getCampaignStats(campaign)
  const isActive = campaign.status === 'active'
  const related = campaigns
    .filter((item) => item.status === 'active' && item.id !== campaign.id)
    .slice(0, 3)

  const handleShare = () => {
    copy(window.location.href)
  }

  return (
    <div className="pb-16">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page flex flex-wrap items-center gap-2 py-3 text-xs font-medium text-slate-500">
          <Link to="/" className="transition hover:text-brand-700">
            Início
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link to="/#campanhas" className="transition hover:text-brand-700">
            Campanhas
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="truncate text-ink-800">{campaign.name}</span>
        </div>
      </div>

      <div className="container-page pt-8">
        <Link
          to="/#campanhas"
          className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-semibold text-slate-500 transition hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para as campanhas
        </Link>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1.55fr_1fr]">
          <div className="min-w-0 space-y-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-ink-900 shadow-card">
              <img
                src={campaign.image}
                alt={`Imagem ilustrativa do prêmio: ${campaign.name}`}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={statusTone[campaign.status] ?? 'slate'} dot>
                  {CAMPAIGN_STATUS_LABELS[campaign.status] ?? campaign.status}
                </Badge>
                <Badge tone="brand">{campaign.beneficiary}</Badge>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  Data prevista: {formatDate(campaign.drawDate)}
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                {campaign.name}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{campaign.description}</p>
            </div>

            <section className="card p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                <Trophy className="h-5 w-5 text-gold-500" aria-hidden="true" />
                Informações sobre o prêmio
              </h2>
              <ul className="mt-4 space-y-3">
                {campaign.prizeDetails.map((detail) => (
                  <li key={detail} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-grass-500" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Valor por número</p>
                  <p className="mt-0.5 font-display text-base font-bold text-ink-900">
                    {formatCurrency(campaign.pricePerNumber)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Total de números</p>
                  <p className="mt-0.5 font-display text-base font-bold text-ink-900">
                    {formatInteger(campaign.totalNumbers)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Data prevista</p>
                  <p className="mt-0.5 font-display text-base font-bold text-ink-900">
                    {formatDate(campaign.drawDate)}
                  </p>
                </div>
              </div>
            </section>

            <section className="card p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                <FileText className="h-5 w-5 text-brand-600" aria-hidden="true" />
                Regulamento ilustrativo
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Documento de exemplo para validar a hierarquia de informação na página da campanha.
              </p>

              <details className="group mt-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <summary className="focus-ring flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink-800">
                  Ler o regulamento completo
                  <ChevronRight className="h-4 w-4 text-slate-400 transition group-open:rotate-90" aria-hidden="true" />
                </summary>
                <div className="border-t border-slate-200 px-4 py-4 text-sm leading-relaxed text-slate-600">
                  {campaign.regulation || 'Regulamento ainda não cadastrado para esta campanha.'}
                </div>
              </details>

              <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-slate-400">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Conteúdo demonstrativo. A modalidade da campanha e sua conformidade legal devem ser
                verificadas antes de qualquer lançamento.
              </p>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="card overflow-hidden">
              <div className="relative bg-gradient-to-br from-brand-700 via-brand-700 to-ink-900 px-5 py-6 text-white">
                <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-grass-400/20 blur-2xl" aria-hidden="true" />
                <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-brand-100">
                  Valor por número
                </p>
                <p className="relative mt-1 font-display text-4xl font-extrabold">
                  {formatCurrency(campaign.pricePerNumber)}
                </p>
                <p className="relative mt-1.5 inline-flex items-center gap-1.5 text-sm text-brand-100">
                  <Ticket className="h-4 w-4" aria-hidden="true" />
                  {formatInteger(stats.available)} números disponíveis
                </p>
              </div>

              <div className="p-5">
                <ProgressBar
                  value={stats.paid}
                  total={stats.total}
                  label="Números pagos"
                  hint={`${formatInteger(stats.taken)} de ${formatInteger(stats.total)} números já ocupados`}
                  tone="brand"
                />

                <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Disponíveis', value: stats.available, className: 'text-grass-700 bg-grass-50' },
                    { label: 'Reservados', value: stats.reserved, className: 'text-amber-700 bg-gold-100' },
                    { label: 'Pagos', value: stats.paid, className: 'text-slate-600 bg-slate-100' },
                  ].map((item) => (
                    <div key={item.label} className={`rounded-xl px-2 py-2.5 ${item.className}`}>
                      <dt className="text-[10px] font-bold uppercase tracking-wide opacity-80">{item.label}</dt>
                      <dd className="font-display text-sm font-extrabold tabular-nums">{formatInteger(item.value)}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 space-y-2">
                  <Button
                    to={`/campanhas/${campaign.slug}/numeros`}
                    size="lg"
                    full
                    disabled={!isActive}
                    iconRight={ArrowRight}
                  >
                    Escolher meus números
                  </Button>
                  <Button to="/#como-funciona" variant="outline" full>
                    Como funciona
                  </Button>
                  <Button variant="ghost" size="sm" full icon={copied ? CheckCircle2 : Share2} onClick={handleShare}>
                    {copied ? 'Link copiado!' : 'Compartilhar campanha'}
                  </Button>
                </div>

                {!isActive && (
                  <p className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500">
                    Esta campanha não está aberta para novas participações.
                  </p>
                )}

                <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-500">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-grass-500" aria-hidden="true" />
                    Números reservados e pagos não podem ser selecionados.
                  </li>
                  <li className="flex items-start gap-2">
                    <Hash className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden="true" />
                    Grade completa de 000 a 999, atualizada a cada seleção.
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" aria-hidden="true" />
                    Apuração ilustrativa prevista para {formatDate(campaign.drawDate)}.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] leading-snug text-amber-800">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Protótipo visual: valores, prêmios e datas são fictícios e não geram obrigações reais.
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-xl font-bold sm:text-2xl">Outras campanhas abertas</h2>
              <Link to="/#campanhas" className="link-muted">
                Ver todas
              </Link>
            </div>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <CampaignCard key={item.id} campaign={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
