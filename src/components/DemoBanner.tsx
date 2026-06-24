import { FlaskConical } from 'lucide-react'

export function DemoBanner() {
  return <div className="bg-teal-900 px-4 py-2 text-center text-xs font-medium tracking-wide text-teal-50">
    <span className="inline-flex items-center gap-2"><FlaskConical size={14} aria-hidden /> Demo con dati fittizi — progetto UX non collegato a sistemi sanitari reali.</span>
  </div>
}
