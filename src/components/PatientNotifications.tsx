import { Bell, BellRing, CheckCircle2, Info, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Patient, PatientStatus } from '../types'

const ENABLED_KEY = 'videosoccorso-demo-notifications'
const notifiedStatuses: PatientStatus[] = ['next', 'called', 'discharge_preparing', 'discharge_ready']

function notificationMessage(patient: Patient) {
  switch (patient.status) {
    case 'next': return `Sta arrivando il tuo turno — Ticket ${patient.ticketCode}`
    case 'called': return `È il tuo turno — Recati in ${patient.room || 'destinazione indicata'}`
    case 'discharge_preparing': return `Dimissione in preparazione — Ticket ${patient.ticketCode}`
    case 'discharge_ready': return `Pronto per dimissione — Ticket ${patient.ticketCode}`
    default: return ''
  }
}

export function PatientNotifications({ patient }: { patient: Patient }) {
  const previousStatus = useRef(patient.status)
  const [toast, setToast] = useState('')
  const [feedback, setFeedback] = useState('')
  const [enabled, setEnabled] = useState(() => typeof Notification !== 'undefined' && Notification.permission === 'granted' && localStorage.getItem(ENABLED_KEY) === 'true')

  useEffect(() => {
    if (patient.status === previousStatus.current) return
    previousStatus.current = patient.status
    if (!notifiedStatuses.includes(patient.status)) return
    const message = notificationMessage(patient)
    setToast(message)
    const timeout = window.setTimeout(() => setToast(''), 9000)
    if (enabled && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try { new Notification('VideoSoccorso', { body: message, tag: `videosoccorso-${patient.ticketCode}`, icon: '/favicon.ico' }) } catch { /* The in-app notification remains available. */ }
    }
    return () => window.clearTimeout(timeout)
  }, [patient.status, patient.room, patient.ticketCode, enabled])

  const enableNotifications = async () => {
    if (typeof Notification === 'undefined') {
      setFeedback('Questo browser non supporta le notifiche. Gli aggiornamenti in-app restano attivi.')
      return
    }
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        localStorage.setItem(ENABLED_KEY, 'true')
        setEnabled(true)
        setFeedback('Notifiche demo attivate su questo dispositivo.')
      } else {
        localStorage.removeItem(ENABLED_KEY)
        setEnabled(false)
        setFeedback('Permesso non concesso. Continuerai a ricevere gli aggiornamenti in-app.')
      }
    } catch {
      setFeedback('Non è stato possibile attivare le notifiche browser. Gli aggiornamenti in-app restano attivi.')
    }
  }

  return <><section className="card p-5"><div className="flex items-start gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${enabled ? 'bg-emerald-50 text-emerald-700' : 'bg-teal-50 text-teal-700'}`}>{enabled ? <CheckCircle2 size={20} /> : <Bell size={20} />}</span><div className="min-w-0 flex-1"><p className="font-bold">{enabled ? 'Notifiche demo attive' : 'Ricevi gli aggiornamenti'}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">Le notifiche demo funzionano solo se questa pagina resta aperta.</p>{!enabled && <button onClick={enableNotifications} className="btn-secondary mt-3 w-full px-4 py-2.5 text-sm"><BellRing size={17} /> Attiva notifiche demo</button>}{feedback && <p className="mt-3 flex gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600"><Info size={15} className="shrink-0 text-teal-600" />{feedback}</p>}</div></div></section>
    {toast && <div className="fixed left-4 right-4 top-28 z-50 mx-auto max-w-md animate-[pulse_450ms_ease-out_1] rounded-2xl border border-teal-300 bg-teal-900 p-4 text-white shadow-2xl" role="status" aria-live="assertive"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15"><BellRing size={21} /></span><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-wider text-teal-200">Aggiornamento ticket</p><p className="mt-1 text-base font-bold leading-snug">{toast}</p></div><button onClick={() => setToast('')} className="rounded-lg p-1 text-teal-100 hover:bg-white/10" aria-label="Chiudi notifica"><X size={18} /></button></div></div>}
  </>
}
