import type { Patient, Priority } from '../types'

export interface CurrentSituationRow {
  priority: Priority
  label: string
  totalActive: number
  waiting: number
  next: number
  called: number
  visiting: number
  examsReports: number
  exitPreparing: number
  readyForDischarge: number
  concluded: number
  indicativeWait: string
}

const priorities: { priority: Priority; label: string; indicativeWait: string }[] = [
  { priority: 'red', label: 'Rosso', indicativeWait: 'Accesso immediato' },
  { priority: 'orange', label: 'Arancione', indicativeWait: 'Priorità alta' },
  { priority: 'blue', label: 'Azzurro', indicativeWait: '30–60 min' },
  { priority: 'green', label: 'Verde', indicativeWait: '1–3 ore' },
  { priority: 'white', label: 'Bianco', indicativeWait: 'Oltre 3 ore' },
]

export function getCurrentSituation(patients: Patient[]): CurrentSituationRow[] {
  return priorities.map(({ priority, label, indicativeWait }) => {
    const group = patients.filter((patient) => patient.priority === priority)
    const count = (...statuses: Patient['status'][]) => group.filter((patient) => statuses.includes(patient.status)).length
    const concluded = count('discharged', 'admitted')
    return {
      priority, label, indicativeWait, concluded,
      totalActive: group.length - concluded,
      waiting: count('triage_completed', 'waiting'),
      next: count('next'),
      called: count('called'),
      visiting: count('visiting'),
      examsReports: count('exam_waiting', 'report_waiting'),
      exitPreparing: count('discharge_preparing'),
      readyForDischarge: count('discharge_ready'),
    }
  })
}
