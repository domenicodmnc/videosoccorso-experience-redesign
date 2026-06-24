import clsx from 'clsx'
import { priorityLabels, statusLabels } from '../lib/demoData'
import type { PatientStatus, Priority } from '../types'

const priorityStyles: Record<Priority, string> = {
  red: 'border-red-200 bg-red-50 text-red-700', orange: 'border-orange-200 bg-orange-50 text-orange-700',
  blue: 'border-blue-200 bg-blue-50 text-blue-700', green: 'border-emerald-200 bg-emerald-50 text-emerald-700', white: 'border-slate-200 bg-slate-50 text-slate-600',
}
export function PriorityBadge({ priority, compact = false }: { priority: Priority; compact?: boolean }) {
  return <span className={clsx('inline-flex items-center gap-1.5 rounded-full border font-semibold', compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm', priorityStyles[priority])}><span className="h-2 w-2 rounded-full bg-current" />{priorityLabels[priority]}</span>
}

const statusStyles: Record<PatientStatus, string> = {
  triage_completed: 'bg-sky-50 text-sky-700', waiting: 'bg-slate-100 text-slate-700', next: 'bg-cyan-50 text-cyan-700', called: 'bg-amber-50 text-amber-700',
  visiting: 'bg-violet-50 text-violet-700', exam_waiting: 'bg-blue-50 text-blue-700', report_waiting: 'bg-indigo-50 text-indigo-700',
  discharge_preparing: 'bg-orange-50 text-orange-700', discharge_ready: 'bg-lime-50 text-lime-700',
  discharged: 'bg-emerald-50 text-emerald-700', admitted: 'bg-rose-50 text-rose-700',
}
export function StatusBadge({ status }: { status: PatientStatus }) { return <span className={clsx('inline-flex whitespace-nowrap rounded-full border border-current/10 px-3 py-1.5 text-xs font-bold leading-none', statusStyles[status])}>{statusLabels[status]}</span> }
