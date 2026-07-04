import type { Patient, PatientStatus, Priority } from '../types'

type Seed = [string, string, string, number, Priority, PatientStatus, string, number, string?, string?]
const seeds: Seed[] = [
  ['C02', 'Marco', 'Rinaldi', 42, 'orange', 'called', '08:42', 0, 'Ambulatorio 2', 'Dolore toracico, ECG eseguito'],
  ['C12', 'Anna', 'Bianchi', 68, 'orange', 'next', '09:05', 8, undefined, 'Dispnea da questa mattina'],
  ['V21', 'Luca', 'Conti', 27, 'green', 'discharge_preparing', '09:31', 0, 'Area dimissioni', 'Trauma arto superiore'],
  ['A24', 'Giulia', 'Testa', 54, 'blue', 'discharge_ready', '09:48', 0, 'Area dimissioni', 'Dolore addominale'],
  ['B25', 'Sara', 'Parisi', 35, 'white', 'discharged', '10:02', 0, 'Uscita', 'Cefalea persistente'],
  ['9013', 'Elena', 'Ferri', 19, 'white', 'waiting', '10:14', 92, undefined, 'Ferita superficiale'],
  ['6210', 'Nicola', 'De Luca', 76, 'blue', 'discharged', '08:17', 0, 'Uscita', 'Parametri stabili'],
  ['1158', 'Paolo', 'Greco', 61, 'orange', 'exam_waiting', '08:56', 0, 'Radiologia', 'Sospetta frattura costale'],
  ['4490', 'Marta', 'Romano', 31, 'blue', 'report_waiting', '09:12', 0, 'Area B', 'In attesa referto RX'],
  ['7284', 'Davide', 'Gallo', 47, 'green', 'discharge_preparing', '07:54', 0, 'Area dimissioni', 'Terapia domiciliare da consegnare'],
  ['5631', 'Lucia', 'Costa', 83, 'orange', 'admitted', '07:31', 0, 'Medicina interna', 'Ricovero disposto'],
  ['2047', 'Andrea', 'Fontana', 23, 'green', 'discharge_ready', '08:28', 0, 'Area dimissioni', 'Documentazione pronta'],
  ['8865', 'Rosa', 'Marino', 72, 'red', 'visiting', '10:21', 0, 'Sala emergenza', 'Monitoraggio continuo'],
  ['3329', 'Simone', 'Caruso', 39, 'blue', 'next', '10:25', 8, undefined, 'Trauma distorsivo caviglia'],
  ['7741', 'Chiara', 'Moretti', 45, 'green', 'waiting', '10:32', 58, undefined, 'Nausea e vertigini'],
  ['1906', 'Fabio', 'Barbieri', 58, 'orange', 'called', '10:37', 0, 'Ambulatorio 2', 'Ipertensione sintomatica'],
  ['6583', 'Irene', 'Giordano', 29, 'blue', 'exam_waiting', '09:44', 0, 'Laboratorio', 'Prelievi ematici'],
  ['4172', 'Stefano', 'Rizzi', 66, 'green', 'report_waiting', '09:52', 0, 'Area C', 'Attesa esito ematochimici'],
  ['9350', 'Laura', 'Lombardi', 52, 'blue', 'discharge_preparing', '08:06', 0, 'Area dimissioni', 'Controllo ortopedico programmato'],
  ['2864', 'Matteo', 'Leone', 34, 'white', 'waiting', '10:41', 105, undefined, 'Irritazione oculare'],
  ['7419', 'Alessia', 'Martini', 41, 'green', 'next', '10:05', 18, undefined, 'Dolore lombare'],
  ['5086', 'Roberto', 'Santoro', 70, 'orange', 'visiting', '09:39', 0, 'Ambulatorio 4', 'Aritmia riferita'],
  ['1235', 'Federica', 'Villa', 26, 'blue', 'discharged', '07:47', 0, 'Uscita', 'Trauma minore trattato'],
  ['6798', 'Giorgio', 'Serra', 63, 'green', 'discharge_ready', '08:35', 0, 'Area dimissioni', 'In attesa accompagnatore'],
  ['8527', 'Valentina', 'Pellegrini', 37, 'white', 'waiting', '10:49', 116, undefined, 'Rash cutaneo localizzato'],
]

const reasons = ['Dolore toracico', 'Difficoltà respiratoria', 'Trauma arto superiore', 'Dolore addominale', 'Cefalea persistente', 'Ferita superficiale']
export const DEMO_PATIENTS: Patient[] = seeds.map(([code, firstName, lastName, age, priority, status, arrivalTime, estimatedWait, room, notes], index) => ({
  id: String(index + 1), ticketCode: /^[A-Z]/.test(code) ? code : `CF-${code}`, firstName, lastName,
  initials: `${firstName[0]}.${lastName[0]}.`, age, reason: reasons[index % reasons.length], notes: notes || 'Nessuna nota',
  priority, status, arrivalTime, estimatedWait, room, lastUpdate: '10:52',
}))

export const priorityLabels: Record<Priority, string> = { red: 'Rosso', orange: 'Arancione', blue: 'Azzurro', green: 'Verde', white: 'Bianco' }
export const statusLabels: Record<PatientStatus, string> = {
  triage_completed: 'Triage completato', waiting: 'In attesa visita', next: 'Prossimo alla visita', called: 'Chiamato', visiting: 'In visita',
  exam_waiting: 'In attesa esami', report_waiting: 'In attesa referto', discharge_preparing: 'Dimissione in preparazione',
  discharge_ready: 'Pronto per dimissione', discharged: 'Dimesso', admitted: 'Ricoverato',
}
