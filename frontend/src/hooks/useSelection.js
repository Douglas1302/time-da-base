import { useContext, useMemo } from 'react'
import { SelectionContext } from '../context/SelectionContext'

export function useSelection() {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error('useSelection precisa ser usado dentro de SelectionProvider')
  }
  return context
}

export function useSelectionTotals(campaign) {
  const { selection } = useSelection()
  const belongsToCampaign = Boolean(campaign) && selection.campaignId === campaign.id
  const numbers = belongsToCampaign ? selection.numbers : []
  const unitPrice = Number(campaign?.pricePerNumber) || 0

  return useMemo(
    () => ({
      numbers,
      quantity: numbers.length,
      unitPrice,
      total: numbers.length * unitPrice,
      belongsToCampaign,
    }),
    [numbers, unitPrice, belongsToCampaign],
  )
}
