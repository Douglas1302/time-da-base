# Time da Base

Protótipo visual de uma plataforma de campanhas e sorteios para apoiar as categorias de base.
Todo o conteúdo é fictício: não há banco de dados, autenticação, arrecadação ou pagamentos reais.

## Stack

- React 18 + JavaScript
- Vite 6
- Tailwind CSS 3
- React Router 6
- Lucide React (ícones)

## Como rodar

```bash
npm install
npm run dev
```

Aplicação disponível em **http://localhost:5180**.

```bash
npm run build    # build de produção em dist/
npm run preview  # serve o build local
```

## Rotas

| Rota | Tela |
| --- | --- |
| `/` | Página inicial com banner e campanhas em andamento |
| `/campanhas/:slug` | Detalhes da campanha |
| `/campanhas/:slug/numeros` | Grade de 000 a 999 com filtros, contadores e seleção |
| `/campanhas/:slug/resumo` | Resumo da participação + formulário ilustrativo |
| `/campanhas/:slug/pagamento` | Pagamento Pix demonstrativo (QR Code e código copia e cola) |
| `/admin` | Dashboard administrativo |
| `/admin/campanhas` | Lista e filtros de campanhas |
| `/admin/campanhas/nova` | Criação de campanha |
| `/admin/campanhas/:id/editar` | Edição de campanha |
| `/admin/numeros` | Gerenciamento visual dos números |
| `/admin/participantes` | Participantes fictícios |

## Estrutura

```
src/
  assets/images/   # SVGs ilustrativos (substituíveis por fotos reais)
  components/      # Componentes reutilizáveis (header, footer, cards, grade, formulários)
  context/         # CampaignsContext (campanhas/números) e SelectionContext (seleção e checkout)
  data/            # Dados demonstrativos e gerador de números
  hooks/           # useCampaigns, useSelection, useNumberFilters, useCopyToClipboard
  layouts/         # SiteLayout e AdminLayout
  pages/           # Páginas públicas e administrativas
  styles/          # Tailwind e estilos globais
  utils/           # Formatação, máscaras e estatísticas
```

## Substituindo as imagens

As imagens de prêmios e do banner são arquivos SVG em `src/assets/images/`.
Para usar fotos reais, substitua os arquivos mantendo o mesmo nome ou atualize os imports em
`src/data/campaigns.js` (campanhas) e `src/pages/Home.jsx` (banner).

## Próximos passos (fora deste protótipo)

Backend Node.js, banco de dados, autenticação, reservas com expiração, integração Pix com webhooks,
painel administrativo real e validação legal da modalidade da campanha.
