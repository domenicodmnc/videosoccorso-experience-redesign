import { Waypoints } from 'lucide-react'
import clsx from 'clsx'
import { projectMeta } from '../lib/projectMeta'

export function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return <span className="inline-flex items-center gap-3"><span className={clsx('relative grid shrink-0 place-items-center overflow-hidden rounded-[14px] bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 text-white shadow-lg shadow-teal-950/15', compact ? 'h-10 w-10' : 'h-12 w-12')}><span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white/20" /><Waypoints size={compact ? 21 : 25} strokeWidth={2.2} /></span><span className="text-left"><span className={clsx('block font-black leading-none tracking-[-.02em]', compact ? 'text-[15px]' : 'text-lg', inverse ? 'text-white' : 'text-[#102f46]')}>{projectMeta.name}</span><span className={clsx('mt-1 block font-bold uppercase tracking-[.13em]', compact ? 'text-[8px]' : 'text-[9px]', inverse ? 'text-cyan-200' : 'text-teal-700')}>{projectMeta.descriptor}</span></span></span>
}
