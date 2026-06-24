export type Priority = 'red' | 'orange' | 'blue' | 'green' | 'white'
export type PatientStatus = 'triage_completed' | 'waiting' | 'next' | 'called' | 'visiting' | 'exam_waiting' | 'report_waiting' | 'discharge_preparing' | 'discharge_ready' | 'discharged' | 'admitted'

export interface Patient {
  id: string
  ticketCode: string
  initials: string
  firstName: string
  lastName: string
  age: number
  reason: string
  notes: string
  priority: Priority
  status: PatientStatus
  arrivalTime: string
  estimatedWait: number
  room?: string
  lastUpdate: string
}

export interface NewPatientInput {
  firstName: string
  lastName: string
  age: number
  reason: string
  notes: string
  priority: Priority
}
