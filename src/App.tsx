import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import MyoMedic from './pages/MyoMedic'
import Online from './pages/Online'
import { Portal } from './pages/stubs'
import Pricing from './pages/Pricing'
import Results from './pages/Results'
import Training from './pages/Training'

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
