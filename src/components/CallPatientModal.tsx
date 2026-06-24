import { useState } from 'react'
import { DoorOpen, X } from 'lucide-react'
import type { Patient } from '../types'

export function CallPatientModal({ patient, onClose, onConfirm }: { patient: Patient; onClose: () => void; onConfirm: (room: string) => void }) {
  const [room, setRoom] = useState('Ambulatorio 2')
  return <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="call-title">
    <div className="card w-full max-w-md p-6 shadow-2xl"><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-50 text-teal-700"><DoorOpen /></span><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Chiudi"><X /></button></div>
      <h2 id="call-title" className="mt-5 text-2xl font-bold">Chiama {patient.ticketCode}</h2><p className="mt-2 text-sm leading-relaxed text-slate-500">Il codice comparirà sul display pubblico. Nessun dato personale sarà mostrato.</p>
      <label className="label mt-6" htmlFor="room">Destinazione</label><select id="room" className="field" value={room} onChange={(e) => setRoom(e.target.value)}><option>Ambulatorio 1</option><option>Ambulatorio 2</option><option>Ambulatorio 3</option><option>Sala medicazioni</option></select>
      <div className="mt-6 grid grid-cols-2 gap-3"><button className="btn-secondary" onClick={onClose}>Annulla</button><button className="btn-primary" onClick={() => onConfirm(room)}>Conferma chiamata</button></div>
    </div>
  </div>
}
