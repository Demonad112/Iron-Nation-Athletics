import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import { About, Contact, MyoMedic, Online, Portal, Pricing, Results, Training } from './pages/stubs'

// HashRouter keeps deep links and refreshes working on GitHub Pages.
// TODO(client): switch to BrowserRouter when moving to a real host + custom domain.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="training" element={<Training />} />
          <Route path="online" element={<Online />} />
          <Route path="myomedic" element={<MyoMedic />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="results" element={<Results />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portal" element={<Portal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
