import suvImage from '../assets/images/premio-suv.svg'
import motoImage from '../assets/images/premio-moto.svg'
import phoneImage from '../assets/images/premio-phone.svg'
import dinheiroImage from '../assets/images/premio-dinheiro.svg'
import kitImage from '../assets/images/premio-kit.svg'
import tvImage from '../assets/images/premio-tv.svg'
import viagemImage from '../assets/images/premio-viagem.svg'
import { buildNumbers } from './numbers'

const regulationTemplate = (name, drawDate) =>
  `Regulamento ilustrativo da campanha "${name}". A campanha é uma demonstração de interface: não há venda real de números, arrecadação ou sorteio. Em um cenário de produção, o regulamento completo descreveria a modalidade da campanha, os critérios de participação, a forma de apuração, a data prevista de ${drawDate}, o prêmio, as regras de entrega e as condições de cancelamento, sempre em conformidade com a legislação aplicável e com autorização dos órgãos competentes quando exigida.`

const seeds = [
  {
    id: 'camp-001',
    slug: 'suv-0km',
    name: 'SUV 0km na Garagem',
    beneficiary: 'Categoria Sub-15',
    tagline: 'Apoie a viagem da Sub-15 e concorra a um SUV 0km completo.',
    description:
      'Campanha demonstrativa criada para apresentar a experiência da plataforma. Cada número concorre a um SUV 0km com um ano de seguro incluso. Imagens, valores e condições são apenas ilustrativos.',
    prizeDetails: [
      'SUV 0km com um ano de seguro incluso',
      'Entrega em até 30 dias após a apuração',
      'Apuração ilustrativa pela Loteria Federal',
      'Valor estimado do prêmio: R$ 120.000,00',
    ],
    pricePerNumber: 5,
    totalNumbers: 1000,
    drawDate: '2026-12-20',
    status: 'active',
    image: suvImage,
    distribution: { paidRatio: 0.46, reservedRatio: 0.08 },
    regulation: regulationTemplate('SUV 0km na Garagem', '20/12/2026'),
  },
  {
    id: 'camp-002',
    slug: 'moto-esportiva',
    name: 'Moto Esportiva 0km',
    beneficiary: 'Categoria Sub-17',
    tagline: 'Ajude a estrutura da Sub-17 e concorra a uma moto 0km.',
    description:
      'Demonstração de campanha com prêmio único. A moto esportiva 0km é apresentada apenas como referência visual para validar a experiência de compra de números.',
    prizeDetails: [
      'Moto esportiva 0km com capacete incluso',
      'Documentação e primeiro emplacamento ilustrativos',
      'Entrega na cidade do ganhador (demonstrativo)',
      'Valor estimado do prêmio: R$ 32.000,00',
    ],
    pricePerNumber: 2.5,
    totalNumbers: 1000,
    drawDate: '2026-11-30',
    status: 'active',
    image: motoImage,
    distribution: { paidRatio: 0.34, reservedRatio: 0.1 },
    regulation: regulationTemplate('Moto Esportiva 0km', '30/11/2026'),
  },
  {
    id: 'camp-003',
    slug: 'smartphone-top',
    name: 'Smartphone Top de Linha',
    beneficiary: 'Categoria Sub-13',
    tagline: 'Números a partir de R$ 1,00 para reforçar o material esportivo.',
    description:
      'Campanha ilustrativa com bilhetes acessíveis. O smartphone top de linha é o prêmio principal e as imagens são meramente demonstrativas.',
    prizeDetails: [
      'Smartphone top de linha com 512GB',
      'Fone sem fio incluso no kit ilustrativo',
      'Envio pelos Correios (demonstrativo)',
      'Valor estimado do prêmio: R$ 8.500,00',
    ],
    pricePerNumber: 1,
    totalNumbers: 1000,
    drawDate: '2026-11-22',
    status: 'active',
    image: phoneImage,
    distribution: { paidRatio: 0.62, reservedRatio: 0.07 },
    regulation: regulationTemplate('Smartphone Top de Linha', '22/11/2026'),
  },
  {
    id: 'camp-004',
    slug: 'premio-em-dinheiro',
    name: 'R$ 25 mil em Dinheiro',
    beneficiary: 'Categoria Sub-20',
    tagline: 'Prêmio em dinheiro para quem apoia a reta final da temporada.',
    description:
      'Demonstração de campanha com prêmio em dinheiro. O valor é ilustrativo e nenhuma quantia será arrecadada ou paga nesta etapa do projeto.',
    prizeDetails: [
      'Prêmio único de R$ 25.000,00 (ilustrativo)',
      'Transferência via Pix em até 48h após a apuração',
      'Apuração ilustrativa pela Loteria Federal',
      'Sem custo de entrega para o ganhador',
    ],
    pricePerNumber: 3,
    totalNumbers: 1000,
    drawDate: '2026-12-05',
    status: 'active',
    image: dinheiroImage,
    distribution: { paidRatio: 0.29, reservedRatio: 0.12 },
    regulation: regulationTemplate('R$ 25 mil em Dinheiro', '05/12/2026'),
  },
  {
    id: 'camp-005',
    slug: 'kit-oficial',
    name: 'Kit Oficial do Time',
    beneficiary: 'Categoria Sub-11',
    tagline: 'Kit completo com camisa, short e meião personalizados.',
    description:
      'Campanha de demonstração com prêmio de merchandising. O kit oficial é ilustrativo e não representa um produto real disponível para venda nesta fase.',
    prizeDetails: [
      'Camisa oficial personalizada com seu nome',
      'Short e meião no tamanho escolhido',
      'Bolsa esportiva do clube',
      'Valor estimado do prêmio: R$ 650,00',
    ],
    pricePerNumber: 1,
    totalNumbers: 1000,
    drawDate: '2026-11-18',
    status: 'active',
    image: kitImage,
    distribution: { paidRatio: 0.71, reservedRatio: 0.05 },
    regulation: regulationTemplate('Kit Oficial do Time', '18/11/2026'),
  },
  {
    id: 'camp-006',
    slug: 'smart-tv-75',
    name: 'Smart TV 75" + Home Theater',
    beneficiary: 'Categoria Sub-15',
    tagline: 'Sala de casa cheia para assistir aos jogos da base.',
    description:
      'Campanha demonstrativa com combo de eletrônicos. Ideal para apresentar prêmios de maior valor agregado na plataforma.',
    prizeDetails: [
      'Smart TV 75" 4K',
      'Home theater 5.1 com 800W',
      'Suporte de parede incluso',
      'Valor estimado do prêmio: R$ 9.800,00',
    ],
    pricePerNumber: 1.5,
    totalNumbers: 1000,
    drawDate: '2026-12-12',
    status: 'active',
    image: tvImage,
    distribution: { paidRatio: 0.41, reservedRatio: 0.09 },
    regulation: regulationTemplate('Smart TV 75" + Home Theater', '12/12/2026'),
  },
  {
    id: 'camp-007',
    slug: 'viagem-para-a-final',
    name: 'Viagem para a Final',
    beneficiary: 'Categoria Sub-17',
    tagline: 'Campanha encerrada: acompanhe o resultado ilustrativo.',
    description:
      'Campanha de demonstração já encerrada, usada para validar a visualização de campanhas finalizadas no painel administrativo.',
    prizeDetails: [
      'Pacote para duas pessoas com hospedagem',
      'Ingressos para a final (ilustrativos)',
      'Passagens aéreas incluídas',
      'Valor estimado do prêmio: R$ 12.000,00',
    ],
    pricePerNumber: 2,
    totalNumbers: 1000,
    drawDate: '2026-09-14',
    status: 'closed',
    image: viagemImage,
    distribution: { paidRatio: 0.93, reservedRatio: 0.02 },
    regulation: regulationTemplate('Viagem para a Final', '14/09/2026'),
  },
  {
    id: 'camp-008',
    slug: 'camisa-autografada',
    name: 'Camisa Autografada',
    beneficiary: 'Categoria Sub-20',
    tagline: 'Rascunho de campanha para validar o fluxo de criação.',
    description:
      'Campanha em rascunho, criada apenas para demonstrar o estado de campanhas ainda não publicadas no painel administrativo.',
    prizeDetails: [
      'Camisa autografada por todo o elenco',
      'Certificado de autenticidade ilustrativo',
      'Entrega presencial em dia de jogo',
      'Valor estimado do prêmio: R$ 1.200,00',
    ],
    pricePerNumber: 1,
    totalNumbers: 1000,
    drawDate: '2027-01-10',
    status: 'draft',
    image: kitImage,
    distribution: { paidRatio: 0, reservedRatio: 0 },
    regulation: regulationTemplate('Camisa Autografada', '10/01/2027'),
  },
]

export function createSeedCampaigns() {
  return seeds.map((seed) => ({
    ...seed,
    numbers: buildNumbers(seed.id, { total: seed.totalNumbers, ...seed.distribution }),
  }))
}

export const campaignsSeed = createSeedCampaigns()

export const campaignStatusOptions = [
  { value: 'active', label: 'Em andamento' },
  { value: 'draft', label: 'Rascunho' },
  { value: 'closed', label: 'Encerrada' },
]
