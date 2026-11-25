import { useContext } from 'react'
import { CampaignsContext } from '../context/CampaignsContext'

export function useCampaigns() {
  const context = useContext(CampaignsContext)
  if (!context) {
    throw new Error('useCampaigns precisa ser usado dentro de CampaignsProvider')
  }
  return context
}
