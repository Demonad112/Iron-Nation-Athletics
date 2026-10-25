import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import MyoMedic from './pages/MyoMedic'
import Online from './pages/Online'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import { PortalLoading } from './components/portal/PortalLoading'
import Pricing from './pages/Pricing'
import Results from './pages/Results'
import Training from './pages/Training'

// The portal pulls in Recharts, so it loads on demand and stays out of the main bundle.
const Portal = lazy(() => import('./pages/Portal'))

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
          <Route
            path="portal"
            element={
              <Suspense fallback={<PortalLoading label="Loading the client portal…" />}>
                <Portal />
              </Suspense>
            }
          />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
