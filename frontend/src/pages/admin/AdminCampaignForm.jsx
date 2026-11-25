import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Info } from 'lucide-react'
import CampaignForm from '../../components/CampaignForm'
import NotFoundState from '../../components/NotFoundState'
import { useCampaigns } from '../../hooks/useCampaigns'

export default function AdminCampaignForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCampaignById, createCampaign, updateCampaign } = useCampaigns()

  const isEditing = Boolean(id)
  const campaign = isEditing ? getCampaignById(id) : null

  if (isEditing && !campaign) {
    return (
      <NotFoundState
        code="—"
        title="Campanha não encontrada"
        description="A campanha que você tentou editar não existe neste protótipo."
      />
    )
  }

  const handleSubmit = (payload) => {
    if (isEditing) {
      updateCampaign(campaign.id, payload)
      navigate('/admin/campanhas', {
        state: { flash: `Campanha "${payload.name}" atualizada (demonstração).` },
      })
      return
    }

    const created = createCampaign(payload)
    navigate('/admin/campanhas', {
      state: {
        flash: `Campanha "${created.name}" criada com ${created.totalNumbers} números disponíveis.`,
      },
    })
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/admin/campanhas"
          className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-semibold text-slate-500 transition hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para campanhas
        </Link>
        {isEditing && (
          <p className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            Editando: {campaign.name}
          </p>
        )}
      </div>

      <CampaignForm
        key={campaign?.id ?? 'new'}
        initialCampaign={campaign}
        submitLabel={isEditing ? 'Salvar alterações' : 'Criar campanha'}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/campanhas')}
      />
    </div>
  )
}
