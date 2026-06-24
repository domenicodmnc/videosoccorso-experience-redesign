import type { LucideIcon } from 'lucide-react'

export function StatCard({ label, value, detail, icon: Icon, tone = 'teal' }: { label: string; value: string | number; detail: string; icon: LucideIcon; tone?: 'teal' | 'blue' | 'amber' | 'violet' }) {
  const tones = { teal: 'bg-teal-50 text-teal-700', blue: 'bg-blue-50 text-blue-700', amber: 'bg-amber-50 text-amber-700', violet: 'bg-violet-50 text-violet-700' }
  return <div className="card flex h-full min-h-36 items-start justify-between gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-soft"><div><p className="text-sm font-bold leading-tight text-slate-600">{label}</p><p className="mt-3 text-3xl font-black tracking-tight text-ink">{value}</p><p className="mt-1 text-xs font-medium text-slate-500">{detail}</p></div><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tones[tone]}`}><Icon size={21} /></span></div>
}
