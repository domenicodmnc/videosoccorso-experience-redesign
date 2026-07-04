import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { DEMO_PATIENTS } from '../lib/demoData'
import type { NewPatientInput, Patient, PatientStatus } from '../types'

const STORAGE_KEY = 'careflow-demo-patients-v1'

interface DemoDataContextValue {
  patients: Patient[]
  addPatient: (input: NewPatientInput) => Patient
  updateStatus: (id: string, status: PatientStatus, room?: string) => void
  resetDemo: () => void
}

const DemoDataContext = createContext<DemoDataContextValue | null>(null)

const now = () => new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) as Patient[] : DEMO_PATIENTS
    } catch { return DEMO_PATIENTS }
  })

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(patients)) }, [patients])

  useEffect(() => {
    const syncAcrossTabs = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return
      try { setPatients(JSON.parse(event.newValue) as Patient[]) } catch { /* Ignore malformed demo data. */ }
    }
    window.addEventListener('storage', syncAcrossTabs)
    return () => window.removeEventListener('storage', syncAcrossTabs)
  }, [])

  const addPatient = (input: NewPatientInput) => {
    const ticketCode = `CF-${Math.floor(1000 + Math.random() * 9000)}`
    const patient: Patient = {
      ...input, id: crypto.randomUUID(), ticketCode, initials: `${input.firstName[0]}.${input.lastName[0]}.`, status: 'waiting',
      arrivalTime: now(), estimatedWait: input.priority === 'red' ? 0 : input.priority === 'orange' ? 12 : input.priority === 'blue' ? 35 : input.priority === 'green' ? 55 : 85,
      lastUpdate: now(),
    }
    setPatients((current) => [patient, ...current])
    return patient
  }

  const updateStatus = (id: string, status: PatientStatus, room?: string) => {
    setPatients((current) => current.map((p) => p.id === id ? { ...p, status, room: room || p.room, lastUpdate: now(), estimatedWait: status === 'triage_completed' || status === 'waiting' || status === 'next' ? p.estimatedWait : 0 } : p))
  }

  const resetDemo = () => setPatients(DEMO_PATIENTS)
  return <DemoDataContext.Provider value={{ patients, addPatient, updateStatus, resetDemo }}>{children}</DemoDataContext.Provider>
}

export function useDemoData() {
  const value = useContext(DemoDataContext)
  if (!value) throw new Error('useDemoData must be used inside DemoDataProvider')
  return value
}
