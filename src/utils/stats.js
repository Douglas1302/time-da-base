import { NUMBER_STATUS } from './format'

export function getCampaignStats(campaign) {
  const numbers = campaign?.numbers ?? []
  let available = 0
  let reserved = 0
  let paid = 0

  for (const status of numbers) {
    if (status === NUMBER_STATUS.paid) paid += 1
    else if (status === NUMBER_STATUS.reserved) reserved += 1
    else available += 1
  }

  const total = numbers.length
  const taken = paid + reserved
  const price = Number(campaign?.pricePerNumber) || 0

  return {
    total,
    available,
    reserved,
    paid,
    taken,
    occupancy: total ? Math.round((taken / total) * 100) : 0,
    paidPercentage: total ? Math.round((paid / total) * 100) : 0,
    revenue: paid * price,
  }
}

export function aggregateCampaigns(campaigns) {
  return campaigns.reduce(
    (accumulator, campaign) => {
      const stats = getCampaignStats(campaign)
      return {
        campaigns: accumulator.campaigns + 1,
        total: accumulator.total + stats.total,
        available: accumulator.available + stats.available,
        reserved: accumulator.reserved + stats.reserved,
        paid: accumulator.paid + stats.paid,
        revenue: accumulator.revenue + stats.revenue,
      }
    },
    { campaigns: 0, total: 0, available: 0, reserved: 0, paid: 0, revenue: 0 },
  )
}
