import { ChevronLeft, SearchX } from 'lucide-react'
import { MobilePatientStatus } from '../components/MobilePatientStatus'
import { MobileTicketSearch } from '../components/MobileTicketSearch'
import { CurrentSituationOverview } from '../components/CurrentSituationOverview'
import { useDemoData } from '../context/DemoDataContext'
import { navigate } from '../lib/navigation'

export function MobileExperience({ ticketCode }: { ticketCode?: string }) {
  const { patients } = useDemoData()
  const patient = ticketCode ? patients.find((p) => p.ticketCode.toUpperCase() === ticketCode.toUpperCase()) : undefined
  return <section className="min-h-[calc(100vh-104px)] bg-gradient-to-b from-teal-50/70 to-mist px-3 py-3 sm:px-4"><div className="mx-auto max-w-md"><button onClick={() => navigate(ticketCode ? '/mobile' : '/')} className="mb-2 inline-flex min-h-8 items-center gap-1 rounded-lg px-1 text-xs font-bold text-slate-700"><ChevronLeft size={16} /> Indietro</button>{ticketCode ? patient ? <MobilePatientStatus patient={patient} situation={<CurrentSituationOverview patients={patients} mobile focusPriority={patient.priority} />} /> : <div className="card p-8 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-slate-500"><SearchX size={30} /></span><p className="eyebrow mt-6">Codice non riconosciuto</p><h1 className="mt-2 text-2xl font-bold">Ticket non trovato</h1><p className="mt-3 text-sm leading-relaxed text-slate-600">Controlla che il codice sia scritto correttamente oppure prova uno dei ticket disponibili nella demo.</p><button className="btn-primary mt-6 w-full" onClick={() => navigate('/mobile')}>Torna alla ricerca</button></div> : <MobileTicketSearch />}</div></section>
}
