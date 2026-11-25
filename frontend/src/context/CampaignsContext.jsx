import { createContext, useCallback, useMemo, useState } from 'react'
import { createSeedCampaigns } from '../data/campaigns'
import { buildEmptyNumbers, resizeNumbers } from '../data/numbers'
import { participantsSeed } from '../data/participants'
import defaultImage from '../assets/images/premio-kit.svg'
import { toSlug } from '../utils/format'

export const CampaignsContext = createContext(null)

function uniqueSlug(base, campaigns) {
  const slugBase = base || 'campanha'
  const taken = new Set(campaigns.map((campaign) => campaign.slug))
  if (!taken.has(slugBase)) return slugBase

  let suffix = 2
  while (taken.has(`${slugBase}-${suffix}`)) suffix += 1
  return `${slugBase}-${suffix}`
}

export function CampaignsProvider({ children }) {
  const [campaigns, setCampaigns] = useState(() => createSeedCampaigns())
  const [participants, setParticipants] = useState(() => participantsSeed)

  const getCampaignById = useCallback(
    (id) => campaigns.find((campaign) => campaign.id === id) ?? null,
    [campaigns],
  )

  const getCampaignBySlug = useCallback(
    (slug) => campaigns.find((campaign) => campaign.slug === slug) ?? null,
    [campaigns],
  )

  const setNumbersStatus = useCallback((campaignId, indexes, status) => {
    if (!indexes?.length) return
    const target = new Set(indexes)
    setCampaigns((current) =>
      current.map((campaign) => {
        if (campaign.id !== campaignId) return campaign
        const numbers = campaign.numbers.map((currentStatus, index) =>
          target.has(index) ? status : currentStatus,
        )
        return { ...campaign, numbers }
      }),
    )
  }, [])

  const createCampaign = useCallback(
    (payload) => {
      const totalNumbers = Number(payload.totalNumbers) || 1000
      const slug = uniqueSlug(toSlug(payload.name), campaigns)
      const campaign = {
        id: `camp-${Date.now().toString(36)}`,
        slug,
        name: payload.name,
        beneficiary: payload.beneficiary || 'Categorias de base',
        tagline: payload.tagline || payload.description?.slice(0, 100) || '',
        description: payload.description || '',
        prizeDetails: payload.prizeDetails?.length
          ? payload.prizeDetails
          : ['Detalhes do prêmio serão publicados em breve.'],
        pricePerNumber: Number(payload.pricePerNumber) || 0,
        totalNumbers,
        drawDate: payload.drawDate || '',
        status: payload.status || 'draft',
        image: payload.image || defaultImage,
        regulation: payload.regulation || '',
        numbers: buildEmptyNumbers(totalNumbers),
      }

      setCampaigns((current) => [campaign, ...current])
      return campaign
    },
    [campaigns],
  )

  const updateCampaign = useCallback((campaignId, payload) => {
    setCampaigns((current) =>
      current.map((campaign) => {
        if (campaign.id !== campaignId) return campaign
        const totalNumbers = Number(payload.totalNumbers) || campaign.totalNumbers
        return {
          ...campaign,
          ...payload,
          totalNumbers,
          pricePerNumber: Number(payload.pricePerNumber ?? campaign.pricePerNumber) || 0,
          image: payload.image || campaign.image,
          numbers: resizeNumbers(campaign.numbers, totalNumbers),
        }
      }),
    )
  }, [])

  const registerParticipant = useCallback((participant) => {
    setParticipants((current) => [
      {
        id: `part-${Date.now().toString(36)}`,
        createdAt: new Date().toISOString().slice(0, 10),
        ...participant,
      },
      ...current,
    ])
  }, [])

  const value = useMemo(
    () => ({
      campaigns,
      participants,
      getCampaignById,
      getCampaignBySlug,
      setNumbersStatus,
      createCampaign,
      updateCampaign,
      registerParticipant,
    }),
    [
      campaigns,
      participants,
      getCampaignById,
      getCampaignBySlug,
      setNumbersStatus,
      createCampaign,
      updateCampaign,
      registerParticipant,
    ],
  )

  return <CampaignsContext.Provider value={value}>{children}</CampaignsContext.Provider>
}
