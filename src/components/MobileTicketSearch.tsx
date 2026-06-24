import { ArrowRight, ShieldCheck, Ticket } from 'lucide-react'
import { useState } from 'react'
import { navigate } from '../lib/navigation'
import { useDemoData } from '../context/DemoDataContext'

const demoTickets = [
  { code: 'C02', status: 'Chiamato' }, { code: 'C12', status: 'Sta arrivando il turno' },
  { code: 'V21', status: 'Dimissione in preparazione' }, { code: 'A24', status: 'Pronto per dimissione' },
  { code: 'B25', status: 'Percorso concluso' },
]

export function MobileTicketSearch() {
  const { patients } = useDemoData()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const verify = (ticketCode: string) => {
    const normalized = ticketCode.trim().toUpperCase()
    if (!patients.some((patient) => patient.ticketCode === normalized)) { setError('Ticket non trovato. Controlla il codice oppure prova uno dei ticket demo.'); return }
    navigate(`/mobile/${normalized}`)
  }
  const submit = (event: React.FormEvent) => { event.preventDefault(); verify(code) }

  return <div className="space-y-3"><section className="card overflow-hidden"><div className="flex items-center gap-3 bg-[#102f46] p-5 text-white"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-500"><Ticket /></span><div><h1 className="text-2xl font-bold">Segui il tuo percorso</h1><p className="mt-0.5 text-xs text-blue-100">Inserisci il codice ticket ricevuto al triage.</p></div></div><form onSubmit={submit} className="p-5"><label className="label" htmlFor="ticket">Codice ticket</label><div className="flex gap-2"><input id="ticket" className="field text-lg font-bold uppercase tracking-[0.16em]" value={code} onChange={(event) => { setCode(event.target.value); setError('') }} placeholder="Es. C12" autoComplete="off" required /><button className="btn-primary shrink-0 px-4" aria-label="Verifica stato"><ArrowRight size={20} /></button></div>{error && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{error}</p>}<div className="mt-4 flex gap-2 border-t pt-4"><ShieldCheck className="mt-0.5 shrink-0 text-teal-700" size={17} /><p className="text-xs leading-relaxed text-slate-600">Non serve registrarsi. Il ticket segue il percorso senza mostrare dati personali.</p></div></form></section>
    <section className="card p-4"><h2 className="text-sm font-bold">Prova un ticket demo</h2><div className="mt-3 grid grid-cols-2 gap-2">{demoTickets.map((ticket) => <button key={ticket.code} onClick={() => verify(ticket.code)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-left transition hover:border-teal-400 hover:bg-teal-50"><span className="block text-base font-black tracking-wide text-teal-800">{ticket.code}</span><span className="mt-0.5 block truncate text-[10px] font-semibold text-slate-500">{ticket.status}</span></button>)}</div></section>
  </div>
}
