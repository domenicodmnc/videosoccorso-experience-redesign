import { useEffect, useState } from 'react'
import { AppShell } from './components/AppShell'
import { PublicDisplay } from './components/PublicDisplay'
import { LandingPage } from './pages/LandingPage'
import { MobileExperience } from './pages/MobileExperience'
import { NewPatientPage } from './pages/NewPatientPage'
import { OperatorDashboard } from './pages/OperatorDashboard'
import { OperatorLogin } from './pages/OperatorLogin'
import { ProjectPage } from './pages/ProjectPage'
import { navigate } from './lib/navigation'

function usePathname() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => { const sync = () => setPath(window.location.pathname); window.addEventListener('popstate', sync); return () => window.removeEventListener('popstate', sync) }, [])
  return path.replace(/\/$/, '') || '/'
}

export default function App() {
  const path = usePathname()
  const isOperatorRoute = path === '/operator' || path.startsWith('/operator/')
  const isOperatorLoggedIn = localStorage.getItem('isOperatorLoggedIn') === 'true'
  useEffect(() => {
    if (isOperatorRoute && !isOperatorLoggedIn) navigate('/login')
  }, [isOperatorRoute, isOperatorLoggedIn])
  let page: React.ReactNode
  if (path === '/') page = <LandingPage />
  else if (path === '/project') page = <ProjectPage />
  else if (path === '/mobile') page = <MobileExperience />
  else if (path.startsWith('/mobile/')) page = <MobileExperience ticketCode={decodeURIComponent(path.split('/')[2] || '')} />
  else if (path === '/display') page = <PublicDisplay />
  else if (path === '/login') page = <OperatorLogin />
  else if (path === '/operator/new') page = isOperatorLoggedIn ? <NewPatientPage /> : null
  else if (path === '/operator') page = isOperatorLoggedIn ? <OperatorDashboard /> : null
  else page = <section className="container-page py-24 text-center"><p className="eyebrow">Errore 404</p><h1 className="mt-3 text-4xl font-bold">Pagina non trovata</h1><a className="btn-primary mt-7" href="/">Torna alla home</a></section>
  return <AppShell currentPath={path}>{page}</AppShell>
}
