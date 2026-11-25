import { Route, Routes } from 'react-router-dom'
import ScrollManager from './components/ScrollManager'
import AdminLayout from './layouts/AdminLayout'
import SiteLayout from './layouts/SiteLayout'
import CampaignDetails from './pages/CampaignDetails'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import NumberSelection from './pages/NumberSelection'
import ParticipationSummary from './pages/ParticipationSummary'
import Payment from './pages/Payment'
import AdminCampaignForm from './pages/admin/AdminCampaignForm'
import AdminCampaigns from './pages/admin/AdminCampaigns'
import AdminNumbers from './pages/admin/AdminNumbers'
import AdminParticipants from './pages/admin/AdminParticipants'
import Dashboard from './pages/admin/Dashboard'

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="campanhas/:slug" element={<CampaignDetails />} />
          <Route path="campanhas/:slug/numeros" element={<NumberSelection />} />
          <Route path="campanhas/:slug/resumo" element={<ParticipationSummary />} />
          <Route path="campanhas/:slug/pagamento" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="campanhas" element={<AdminCampaigns />} />
          <Route path="campanhas/nova" element={<AdminCampaignForm />} />
          <Route path="campanhas/:id/editar" element={<AdminCampaignForm />} />
          <Route path="numeros" element={<AdminNumbers />} />
          <Route path="participantes" element={<AdminParticipants />} />
        </Route>
      </Routes>
    </>
  )
}
