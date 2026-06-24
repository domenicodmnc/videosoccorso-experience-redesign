import { Activity, AlertTriangle, Bell, ChevronDown, Info, MapPin, Radio, RefreshCw, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Patient, PatientStatus } from '../types'
import { PriorityBadge } from './PriorityBadge'
import { ProgressTracker } from './ProgressTracker'
import { PatientNotifications } from './PatientNotifications'

const messages: Record<PatientStatus, { title: string; text: string; badge?: string }> = {
  triage_completed: { title: 'Registrazione completata', text: 'Il triage è stato completato. Attendi le prossime indicazioni.' },
  waiting: { title: 'In attesa visita', text: 'Stai aspettando la visita medica. I tempi possono cambiare in base alle emergenze in corso.' },
  next: { title: 'Sta arrivando il tuo turno', text: 'Rimani nelle vicinanze e controlla il display per la chiamata.', badge: 'Preavviso' },
  called: { title: 'È il tuo turno', text: 'Recati in {destination}.', badge: 'Chiamato' },
  visiting: { title: 'Visita in corso', text: 'Il percorso è in corso. Attendi le indicazioni del personale.' },
  exam_waiting: { title: 'In attesa esami', text: 'Il personale ti chiamerà per raggiungere la destinazione indicata.' },
  report_waiting: { title: 'In attesa referto', text: 'Gli accertamenti sono in valutazione. Attendi le prossime indicazioni.' },
  discharge_preparing: { title: 'Dimissione in preparazione', text: 'Il percorso è quasi concluso. Rimani reperibile per le indicazioni finali.', badge: 'Uscita in preparazione' },
  discharge_ready: { title: 'Pronto per dimissione', text: 'L’accompagnatore può avvicinarsi all’area indicata.', badge: 'Pronto per uscita' },
  discharged: { title: 'Percorso concluso', text: 'Segui le indicazioni ricevute dal personale sanitario.' },
  admitted: { title: 'Percorso concluso in Pronto Soccorso', text: 'Segui le indicazioni del personale per il ricovero.' },
}

function InfoAccordion({ icon, title, children, tone = 'slate' }: { icon: ReactNode; title: string; children: ReactNode; tone?: 'slate' | 'amber' | 'blue' }) {
  const tones = { slate: 'text-slate-700', amber: 'text-amber-800', blue: 'text-blue-800' }
  return <details className="group rounded-xl border border-slate-200 bg-white"><summary className={`flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-sm font-bold ${tones[tone]}`}>{icon}<span className="flex-1">{title}</span><ChevronDown size={17} className="transition group-open:rotate-180" /></summary><div className="border-t px-4 py-3 text-xs leading-relaxed text-slate-600">{children}</div></details>
}

export function MobilePatientStatus({ patient, situation }: { patient: Patient; situation?: ReactNode }) {
  const message = messages[patient.status]
  const text = message.text.replace('{destination}', patient.room || 'destinazione indicata')
  const urgent = patient.status === 'called' || patient.status === 'next' || patient.status === 'discharge_ready'
  return <div className="space-y-3"><section className={`card overflow-hidden ${urgent ? 'ring-2 ring-teal-500' : ''}`}><div className="bg-[#102f46] px-4 py-2.5 text-white"><div className="flex items-center justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-blue-200">Il tuo percorso</p><p className="text-3xl font-black leading-tight tracking-[0.12em]">{patient.ticketCode}</p></div><PriorityBadge priority={patient.priority} compact /></div></div><div className={urgent ? 'bg-teal-50 px-4 py-3' : 'px-4 py-3'}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2">{message.badge && <span className="rounded-full bg-teal-700 px-2.5 py-1 text-[10px] font-bold text-white">{message.badge}</span>}<h1 className="text-base font-black leading-tight">{message.title}</h1></div><p className="mt-1 text-xs leading-relaxed text-slate-600">{text}</p></div><div className="max-w-[38%] shrink-0 rounded-lg bg-white/80 px-2.5 py-2 text-right shadow-sm"><p className="text-[8px] font-bold uppercase tracking-wide text-slate-500">Destinazione</p><p className="mt-0.5 flex items-start justify-end gap-1 text-xs font-bold leading-tight"><MapPin size={12} className="mt-0.5 shrink-0 text-teal-600" />{patient.room || 'Da assegnare'}</p></div></div><p className="mt-2 flex items-center gap-1 text-[9px] font-medium text-slate-500"><RefreshCw size={10} /> Aggiornato alle {patient.lastUpdate}</p></div></section>

    {situation}

    <section className="space-y-2 pt-1"><p className="px-1 text-[10px] font-bold uppercase tracking-[.14em] text-slate-500">Approfondisci</p><InfoAccordion icon={<Activity size={17} />} title="Avanzamento del percorso"><ProgressTracker status={patient.status} /></InfoAccordion><InfoAccordion icon={<Info size={17} />} title="Informazioni utili"><p><strong>Bagni:</strong> corridoio a destra · <strong>Distributori:</strong> ingresso principale.</p><p className="mt-1"><strong>Radiologia:</strong> piano terra · <strong>Prelievi:</strong> area diagnostica.</p></InfoAccordion><InfoAccordion icon={<Radio size={17} />} title="Come funziona il triage" tone="blue">Il triage stabilisce la priorità clinica. Alcune persone possono essere chiamate prima anche se sono arrivate dopo.</InfoAccordion><InfoAccordion icon={<AlertTriangle size={17} />} title="Cosa fare se peggiori" tone="amber">Se il tuo stato di salute peggiora durante l’attesa, avvisa subito il personale.</InfoAccordion><InfoAccordion icon={<ShieldCheck size={17} />} title="Privacy del ticket">Il ticket non contiene il tuo nome e permette di seguire il percorso senza mostrare dati personali.</InfoAccordion><InfoAccordion icon={<Bell size={17} />} title="Servizi e notifiche"><PatientNotifications patient={patient} /></InfoAccordion></section>
  </div>
}
