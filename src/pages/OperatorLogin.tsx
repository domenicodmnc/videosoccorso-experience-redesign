import { ArrowRight, Info, LockKeyhole, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { navigate } from '../lib/navigation'

export function OperatorLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim().toLowerCase() !== 'demo@ospedale.it' || password !== 'demo123') {
      setError('Credenziali non corrette. Usa email e password indicate nel box demo.')
      return
    }
    localStorage.setItem('isOperatorLoggedIn', 'true')
    navigate('/operator')
  }

  return <section className="container-page grid min-h-[calc(100vh-104px)] place-items-center py-12"><div className="w-full max-w-md"><div className="mb-7 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-teal-700 text-white"><LockKeyhole /></span><h1 className="mt-5 text-3xl font-bold">Area operatori</h1><p className="mt-2 text-sm leading-relaxed text-slate-500">Accesso demo riservato al personale. I dati mostrati sono fittizi e usati solo per simulare il funzionamento del servizio.</p></div>
    <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-blue-950"><div className="flex gap-3"><Info className="mt-0.5 shrink-0 text-blue-600" size={20} /><div><p className="font-bold">Credenziali demo</p><p className="mt-2 text-sm"><span className="font-semibold">Email:</span> demo@ospedale.it</p><p className="mt-1 text-sm"><span className="font-semibold">Password:</span> demo123</p></div></div></div>
    <form className="card p-7" onSubmit={submit} noValidate><label className="label" htmlFor="email">Email</label><input id="email" className="field" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} autoComplete="username" required placeholder="nome@ospedale.it" /><label className="label mt-5" htmlFor="password">Password</label><input id="password" className="field" type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError('') }} autoComplete="current-password" required placeholder="Inserisci la password" />{error && <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">{error}</div>}<button className="btn-primary mt-6 w-full">Accedi alla dashboard <ArrowRight size={18} /></button><p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-slate-400"><ShieldCheck size={16} className="shrink-0 text-teal-600" /> Accesso simulato nel browser, senza autenticazione o sistemi reali.</p></form></div></section>
}
