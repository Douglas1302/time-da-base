import { ArrowRight, BadgeCheck, CalendarDays, CreditCard, FileCheck2, ShieldCheck, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import bannerHero from '../assets/images/banner-hero.svg'
import Badge from '../components/Badge'
import Button from '../components/Button'
import CampaignCard from '../components/CampaignCard'
import EmptyState from '../components/EmptyState'
import StatCard from '../components/StatCard'
import { useCampaigns } from '../hooks/useCampaigns'
import { formatCurrency, formatInteger } from '../utils/format'
import { aggregateCampaigns } from '../utils/stats'

const steps = [
  {
    icon: Ticket,
    title: 'Escolha seus números',
    description:
      'Abra a campanha e navegue pela grade de 000 a 999. Números verdes estão disponíveis para seleção.',
  },
  {
    icon: BadgeCheck,
    title: 'Confirme a participação',
    description:
      'Revise a quantidade, o valor unitário e o total. Os dados do formulário são ilustrativos nesta etapa.',
  },
  {
    icon: CreditCard,
    title: 'Acompanhe o pagamento',
    description:
      'A tela de pagamento exibe o status e um QR Code de exemplo. Nenhuma cobrança real é processada.',
  },
]

const assurances = [
  {
    icon: ShieldCheck,
    title: 'Transparência na ocupação',
    description: 'Números disponíveis, reservados e pagos ficam visíveis para todos os visitantes.',
  },
  {
    icon: FileCheck2,
    title: 'Regulamento acessível',
    description: 'Cada campanha apresenta o regulamento ilustrativo e a data prevista de apuração.',
  },
  {
    icon: CalendarDays,
    title: 'Apoio direto às categorias',
    description: 'As campanhas são organizadas por categoria da base, com objetivo claramente indicado.',
  },
]

export default function Home() {
  const { campaigns, participants } = useCampaigns()
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === 'active')
  const summary = aggregateCampaigns(activeCampaigns)

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950">
        <img
          src={bannerHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/40" />

        <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div className="animate-fade-up">
            <Badge tone="white" dot>
              Temporada 2026 · campanhas ilustrativas
            </Badge>

            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] text-white sm:text-4xl lg:text-[3.35rem]">
              Fortaleça a base.
              <span className="mt-1 block text-grass-400">Concorra a prêmios de verdade.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              O Time da Base reúne campanhas de apoio às categorias de base em uma experiência simples,
              transparente e segura. Escolha seus números e acompanhe cada etapa da participação.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/#campanhas" size="lg" iconRight={ArrowRight}>
                Ver campanhas abertas
              </Button>
              <Button
                to="/#como-funciona"
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15 hover:text-white"
              >
                Como funciona
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-300">
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-grass-400" aria-hidden="true" />
                Números 000 a 999
              </li>
              <li className="inline-flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-grass-400" aria-hidden="true" />
                Pix ilustrativo
              </li>
              <li className="inline-flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-grass-400" aria-hidden="true" />
                Regulamento visível
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-float backdrop-blur-md sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-100">
                <span className="h-2 w-2 rounded-full bg-grass-400 animate-pulse-soft" aria-hidden="true" />
                Números disponíveis agora
              </p>
              <Badge tone="white">ao vivo</Badge>
            </div>

            <p className="mt-4 font-display text-4xl font-extrabold leading-none text-white sm:text-5xl">
              {formatInteger(summary.available)}
            </p>
            <p className="mt-1 text-sm text-slate-300">em {activeCampaigns.length} campanhas abertas</p>

            <dl className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: 'Reservados', value: formatInteger(summary.reserved) },
                { label: 'Pagos', value: formatInteger(summary.paid) },
                { label: 'Arrecadação ilustrativa', value: formatCurrency(summary.revenue) },
                { label: 'Participantes fictícios', value: formatInteger(participants.length) },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-ink-950/40 p-3 ring-1 ring-inset ring-white/10">
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 truncate font-display text-lg font-bold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 text-[11px] leading-snug text-slate-400">
              Dados simulados em tempo real para demonstrar a experiência da plataforma.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="container-page grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Campanhas abertas" value={activeCampaigns.length} icon={Ticket} tone="brand" hint="Temporada 2026" />
          <StatCard label="Números disponíveis" value={formatInteger(summary.available)} icon={BadgeCheck} tone="grass" hint="De 1.000 por campanha" />
          <StatCard label="Participações pagas" value={formatInteger(summary.paid)} icon={ShieldCheck} tone="slate" hint="Simuladas" />
          <StatCard label="Prêmios cadastrados" value={activeCampaigns.length} icon={CalendarDays} tone="gold" hint="Imagens ilustrativas" />
        </div>
      </section>

      <section id="campanhas" className="scroll-mt-24">
        <div className="container-page py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
                Campanhas em andamento
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Escolha a causa e participe</h2>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Cada campanha apoia uma categoria da base. Selecione os números disponíveis e acompanhe a
                ocupação em tempo real.
              </p>
            </div>
            <Badge tone="slate">
              {activeCampaigns.length} {activeCampaigns.length === 1 ? 'campanha ativa' : 'campanhas ativas'}
            </Badge>
          </div>

          {activeCampaigns.length === 0 ? (
            <EmptyState
              className="mt-8"
              title="Nenhuma campanha aberta no momento"
              description="Crie uma campanha no painel administrativo para vê-la nesta lista."
              action={
                <Button to="/admin/campanhas/nova" variant="outline">
                  Criar campanha
                </Button>
              }
            />
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 border-y border-slate-200 bg-white">
        <div className="container-page py-14">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">Como funciona</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Três passos até a sua participação</h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              O fluxo completo está navegável neste protótipo — do primeiro clique até a confirmação
              visual do pagamento.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="card relative p-6">
                <span className="absolute right-5 top-5 font-display text-4xl font-extrabold text-slate-100">
                  0{index + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink-900">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 ring-1 ring-inset ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Quer ver a grade de números funcionando? Abra uma campanha e selecione quantos números
              quiser.
            </p>
            <Button to="/#campanhas" variant="dark" size="sm" iconRight={ArrowRight}>
              Abrir uma campanha
            </Button>
          </div>
        </div>
      </section>

      <section id="transparencia" className="scroll-mt-24">
        <div className="container-page py-14">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
                Transparência
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Informação clara em cada etapa da campanha
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                A plataforma foi desenhada para que o participante entenda a campanha antes de escolher
                os números: prêmio, valor unitário, quantidade total, ocupação da grade e data prevista.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/#campanhas" iconRight={ArrowRight}>
                  Ver campanhas
                </Button>
                <Button to="/admin" variant="outline">
                  Conhecer o painel
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {assurances.map((item) => (
                <div key={item.title} className="card flex items-start gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-grass-50 text-grass-600">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="scroll-mt-24">
        <div className="container-page pb-14">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-10 sm:px-10">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/25 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-grass-500/20 blur-2xl" aria-hidden="true" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-grass-400">
                  Sobre o projeto
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Protótipo visual da plataforma Time da Base
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  Esta versão demonstra a experiência completa de navegação: campanhas, seleção de
                  números, resumo da participação, pagamento ilustrativo e painel administrativo. Não há
                  banco de dados, autenticação real ou integração de pagamentos.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button to="/#campanhas" variant="accent" iconRight={ArrowRight}>
                  Explorar campanhas
                </Button>
                <Button
                  to="/admin"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15 hover:text-white"
                >
                  Painel administrativo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-center gap-3 border-t border-slate-200 pt-10 text-center">
          <p className="text-sm text-slate-500">
            Pronto para escolher seus números?{' '}
            <Link to="/#campanhas" className="font-semibold text-brand-700 hover:text-brand-800">
              Veja as campanhas abertas
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
