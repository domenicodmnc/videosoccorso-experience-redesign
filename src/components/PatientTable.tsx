import { ChevronDown, SearchX } from 'lucide-react'
import { PriorityBadge } from './PriorityBadge'
import { StatusBadge } from './StatusBadge'
import type { Patient, PatientStatus } from '../types'

const actions: { label: string; status: PatientStatus }[] = [
  { label: 'Preavvisa visita', status: 'next' }, { label: 'Chiama', status: 'called' },
  { label: 'Invia a esami', status: 'exam_waiting' }, { label: 'Attesa referto', status: 'report_waiting' },
  { label: 'Prepara dimissione', status: 'discharge_preparing' }, { label: 'Pronto per dimissione', status: 'discharge_ready' },
  { label: 'Dimetti', status: 'discharged' }, { label: 'Ricovera', status: 'admitted' },
]

export function PatientTable({ patients, onCall, onStatusChange }: { patients: Patient[]; onCall: (patient: Patient) => void; onStatusChange: (patient: Patient, status: PatientStatus) => void }) {
  const handleAction = (patient: Patient, value: string) => {
    if (!value) return
    const status = value as PatientStatus
    if (status === 'called') onCall(patient)
    else onStatusChange(patient, status)
  }
  return <div className="card overflow-hidden"><div className="max-h-[690px] overflow-auto"><table className="w-full min-w-[1280px] border-separate border-spacing-0 text-left"><thead className="sticky top-0 z-20 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 shadow-[0_1px_0_#e2e8f0]"><tr><th className="px-4 py-3">Ticket</th><th className="px-4 py-3">Paziente</th><th className="px-4 py-3">Età</th><th className="px-4 py-3">Codice triage</th><th className="px-4 py-3">Stato</th><th className="px-4 py-3">Attesa</th><th className="px-4 py-3">Destinazione</th><th className="px-4 py-3">Azioni</th></tr></thead>
    <tbody>{patients.length ? patients.map((p) => <tr key={p.id} className="group border-b transition hover:bg-teal-50/40"><td className="border-b px-4 py-3 align-top"><p className="font-bold tracking-wide text-teal-800">{p.ticketCode}</p><p className="mt-1 text-xs text-slate-500">Arrivo {p.arrivalTime}</p></td><td className="max-w-[260px] border-b px-4 py-3 align-top"><p className="font-semibold text-ink">{p.firstName} {p.lastName}</p><p className="mt-1 truncate text-xs text-slate-500" title={p.notes}>{p.notes}</p></td><td className="border-b px-4 py-3 align-top text-sm font-semibold text-slate-700">{p.age}</td><td className="border-b px-4 py-3 align-top"><PriorityBadge priority={p.priority} compact /></td><td className="border-b px-4 py-3 align-top"><StatusBadge status={p.status} /></td><td className="border-b px-4 py-3 align-top text-sm font-semibold">{p.estimatedWait ? `${p.estimatedWait} min` : '—'}</td><td className="border-b px-4 py-3 align-top text-sm text-slate-600">{p.room || 'Da assegnare'}</td><td className="border-b px-4 py-3 align-top"><div className="relative inline-flex items-center"><select aria-label={`Azioni per ${p.ticketCode}`} defaultValue="" onChange={(e) => { handleAction(p, e.target.value); e.currentTarget.value = '' }} className="min-h-10 appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-xs font-bold text-slate-700 transition hover:border-teal-400 hover:bg-teal-50"><option value="" disabled>Aggiorna stato…</option>{actions.map((action) => <option key={action.status} value={action.status}>{action.label}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-2.5 text-slate-500" /></div></td></tr>) : <tr><td colSpan={8} className="px-6 py-16 text-center"><SearchX className="mx-auto text-slate-400" size={34} /><p className="mt-4 text-lg font-bold text-ink">Nessun paziente trovato</p><p className="mt-1 text-sm text-slate-500">Modifica i filtri per visualizzare altri accessi.</p></td></tr>}</tbody></table></div>
    <div className="flex items-center justify-between border-t bg-slate-50 px-4 py-3 text-xs font-medium text-slate-500"><span>{patients.length} pazienti visualizzati</span><span>Scorri la tabella per vedere tutte le colonne</span></div></div>
}
