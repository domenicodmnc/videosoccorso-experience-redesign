import { Beaker, ClipboardCheck, Clock3, DoorOpen, Stethoscope } from 'lucide-react'
import clsx from 'clsx'
import type { PatientStatus } from '../types'

const steps = [
  { label: 'Triage', icon: ClipboardCheck }, { label: 'Attesa', icon: Clock3 },
  { label: 'Visita', icon: Stethoscope }, { label: 'Esami', icon: Beaker }, { label: 'Uscita', icon: DoorOpen },
]
const rank: Record<PatientStatus, number> = {
  triage_completed: 0, waiting: 1, next: 1, called: 1, visiting: 2, exam_waiting: 3,
  report_waiting: 3, discharge_preparing: 4, discharge_ready: 4, discharged: 4, admitted: 4,
}

export function ProgressTracker({ status }: { status: PatientStatus }) {
  const active = rank[status]
  return <div className="relative grid grid-cols-5 gap-1"><div className="absolute left-[10%] right-[10%] top-4 h-0.5 bg-slate-200" /><div className="absolute left-[10%] top-4 h-0.5 bg-teal-600 transition-all" style={{ width: `${Math.min(active, 4) * 20}%` }} />{steps.map((step, index) => { const Icon = step.icon; const done = index <= active; return <div key={step.label} className="relative z-10 flex flex-col items-center text-center"><span className={clsx('grid h-8 w-8 place-items-center rounded-full border-[3px] border-white transition', done ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-400')}><Icon size={14} /></span><span className={clsx('mt-1.5 text-[9px] font-bold', done ? 'text-teal-800' : 'text-slate-400')}>{step.label}</span></div> })}</div>
}
