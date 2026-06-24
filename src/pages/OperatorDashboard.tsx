import { Activity, Beaker, CheckCircle2, Clock3, DoorOpen, LogOut, Plus, RotateCcw, Stethoscope, Timer, UserCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CallPatientModal } from '../components/CallPatientModal'
import { CurrentSituationOverview } from '../components/CurrentSituationOverview'
import { PatientTable } from '../components/PatientTable'
import { StatCard } from '../components/StatCard'
import { useDemoData } from '../context/DemoDataContext'
import { navigate } from '../lib/navigation'
import type { Patient, PatientStatus, Priority } from '../types'

type StatusFilter = 'all' | 'waiting' | 'next' | 'called' | 'visiting' | 'exams' | 'exit' | 'closed'
const terminalStatuses: PatientStatus[] = ['discharged', 'admitted']

export function OperatorDashboard() {
  const { patients, updateStatus, resetDemo } = useDemoData()
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [selected, setSelected] = useState<Patient | null>(null)
  const [dateTime, setDateTime] = useState(new Date())
  useEffect(() => { const id = window.setInterval(() => setDateTime(new Date()), 1000); return () => window.clearInterval(id) }, [])

  const matchesStatus = (status: PatientStatus) => {
    if (statusFilter === 'all') return true
    if (statusFilter === 'exams') return status === 'exam_waiting' || status === 'report_waiting'
    if (statusFilter === 'exit') return status === 'discharge_preparing' || status === 'discharge_ready'
    if (statusFilter === 'closed') return terminalStatuses.includes(status)
    return status === statusFilter
  }
  const visible = useMemo(() => patients.filter((p) => (priorityFilter === 'all' || p.priority === priorityFilter) && matchesStatus(p.status)), [patients, priorityFilter, statusFilter])
  const count = (...statuses: PatientStatus[]) => patients.filter((p) => statuses.includes(p.status)).length
  const call = (room: string) => { if (selected) updateStatus(selected.id, 'called', room); setSelected(null) }
  const logout = () => { localStorage.removeItem('isOperatorLoggedIn'); navigate('/login') }

  return <section className="container-page py-7 lg:py-9"><header className="card overflow-hidden"><div className="flex flex-col justify-between gap-6 border-b bg-gradient-to-r from-white to-teal-50/60 p-6 lg:flex-row lg:items-center"><div><div className="flex items-center gap-2 text-sm font-bold text-emerald-700"><span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" /></span>Sistema attivo</div><h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">VideoSoccorso — Dashboard operatore</h1><p className="mt-2 text-sm text-slate-500">Gestione coda, ticketing e aggiornamento stati</p></div><div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"><Clock3 size={20} className="text-teal-700" /><div><p className="text-sm font-bold tabular-nums">{dateTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</p><p className="text-xs capitalize text-slate-500">{dateTime.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p></div></div></div>
    <div className="flex flex-wrap items-center gap-2 bg-white p-4"><button className="btn-secondary px-4 py-2.5 text-sm" onClick={resetDemo}><RotateCcw size={17} /> Reset demo</button><button className="btn-secondary px-4 py-2.5 text-sm" onClick={logout}><LogOut size={17} /> Logout</button><button className="btn-primary ml-auto px-4 py-2.5 text-sm" onClick={() => navigate('/operator/new')}><Plus size={18} /> Nuovo paziente</button></div></header>

    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"><StatCard label="In attesa" value={count('waiting')} detail="in coda" icon={Timer} /><StatCard label="Prossimi alla visita" value={count('next')} detail="preavvisati" icon={UserCheck} tone="blue" /><StatCard label="Chiamati" value={count('called')} detail="verso ambulatorio" icon={DoorOpen} tone="amber" /><StatCard label="In visita" value={count('visiting')} detail="in gestione" icon={Stethoscope} tone="violet" /><StatCard label="In esami/referto" value={count('exam_waiting', 'report_waiting')} detail="percorso diagnostico" icon={Beaker} tone="blue" /><StatCard label="In uscita" value={count('discharge_preparing', 'discharge_ready')} detail="dimissione" icon={Activity} tone="amber" /><StatCard label="Dimessi/Ricoverati" value={count('discharged', 'admitted')} detail="conclusi" icon={CheckCircle2} /></div>

    <div className="mt-7"><CurrentSituationOverview patients={patients} /></div>

    <div className="mt-7 card p-4"><div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between"><div><h2 className="text-xl font-bold">Pazienti in carico</h2><p className="mt-1 text-sm text-slate-500">Dati identificativi visibili esclusivamente al personale nella demo operatore.</p></div><div className="grid gap-3 sm:grid-cols-2"><div><label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="priority-filter">Codice triage</label><select id="priority-filter" className="field min-w-[210px] py-2.5 text-sm" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as 'all' | Priority)}><option value="all">Tutti</option><option value="red">Rosso</option><option value="orange">Arancione</option><option value="blue">Azzurro</option><option value="green">Verde</option><option value="white">Bianco</option></select></div><div><label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="status-filter">Stato</label><select id="status-filter" className="field min-w-[220px] py-2.5 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}><option value="all">Tutti</option><option value="waiting">In attesa</option><option value="next">Prossimi</option><option value="called">Chiamati</option><option value="visiting">In visita</option><option value="exams">Esami/referto</option><option value="exit">Uscita</option><option value="closed">Conclusi</option></select></div></div></div></div>
    <div className="mt-4"><PatientTable patients={visible} onCall={setSelected} onStatusChange={(patient, status) => updateStatus(patient.id, status)} /></div>{selected && <CallPatientModal patient={selected} onClose={() => setSelected(null)} onConfirm={call} />}</section>
}
