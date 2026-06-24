import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { navigate } from '../lib/navigation'
import { BrandMark } from './BrandMark'

const links = [
  { label: 'Panoramica', path: '/' }, { label: 'Paziente', path: '/mobile' },
  { label: 'Sala d’attesa', path: '/display' }, { label: 'Progetto UX', path: '/project' }, { label: 'Operatori', path: '/operator' },
]

export function Header({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false)
  const go = (path: string) => { setOpen(false); navigate(path) }
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#102f46]/95 text-white shadow-sm backdrop-blur-xl">
    <div className="container-page flex h-[72px] items-center justify-between">
      <button onClick={() => go('/')} className="flex items-center gap-3 rounded-lg" aria-label="Vai alla home">
        <BrandMark inverse compact />
      </button>
      <nav className="hidden items-center gap-1 md:flex" aria-label="Navigazione principale">
        {links.map((link) => <button key={link.path} onClick={() => go(link.path)} className={clsx('min-h-11 rounded-xl px-4 py-2 text-sm font-semibold transition', currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path)) ? 'bg-white text-[#102f46] shadow-sm' : 'text-blue-50/80 hover:bg-white/10 hover:text-white')}>{link.label}</button>)}
      </nav>
      <button className="rounded-lg p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Apri menu">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="container-page grid gap-1 border-t border-white/10 py-3 md:hidden">{links.map((link) => <button key={link.path} onClick={() => go(link.path)} className="min-h-12 rounded-lg px-4 py-3 text-left font-semibold text-white hover:bg-white/10">{link.label}</button>)}</nav>}
  </header>
}
