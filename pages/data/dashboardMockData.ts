export const superAdminStats = [
  { label: 'Entreprises', value: '45' },
  { label: 'En attente', value: '7' },
  { label: 'Stages', value: '128' },
  { label: 'Stagiaires', value: '250' },
]

export const registrationRequests = [
  { company: 'ABC', responsible: 'Ahmed', date: '08/09/2026', status: 'En attente' },
  { company: 'XYZ', responsible: 'Sara', date: '08/09/2026', status: 'En attente' },
]

export const companyAdminStats = [
  { label: 'Stagiaires actifs', value: '12' },
  { label: 'Stages en cours', value: '8' },
  { label: 'Stages terminés', value: '15' },
  { label: 'Demandes en attente', value: '4' },
]

export const internshipRequests = [
  { name: 'Sara Amrani', formation: 'Génie logiciel', type: 'PFE', startDate: '01/09/2026', status: 'En attente' },
  { name: 'Lina Berrada', formation: 'Réseaux', type: 'PFC', startDate: '05/09/2026', status: 'En attente' },
]

export const supervisorStats = [
  { label: 'Mes stagiaires', value: '5' },
  { label: 'Stages en cours', value: '4' },
  { label: 'Rapports à vérifier', value: '2' },
  { label: 'Tâches en attente', value: '7' },
]

export const supervisorInterns = [
  { name: 'Sara', progress: 75 },
  { name: 'Ahmed', progress: 55 },
  { name: 'Lina', progress: 90 },
]

export const supervisorReports = [
  { title: 'Rapport hebdomadaire — Sara', status: 'À valider' },
  { title: 'Rapport de progression — Ahmed', status: 'À valider' },
  { title: 'Rapport final — Lina', status: 'Validé' },
]

export const supervisorAlert = "Ahmed n'a pas envoyé son rapport hebdomadaire."
export type DocumentItem = {
  id: number
  name: string
  type: string
  author: string
  date: string
  status: 'Brouillon' | 'Soumis' | 'En cours d\'examen' | 'Validé' | 'Corrections demandées' | 'Refusé'
}

export const internDocuments: DocumentItem[] = [
  { id: 1, name: 'Convention de stage', type: 'Convention', author: 'Sara Amrani', date: '01/09/2026', status: 'Validé' },
  { id: 2, name: 'Rapport Semaine 1', type: 'Rapport hebdomadaire', author: 'Sara Amrani', date: '07/09/2026', status: 'Validé' },
  { id: 3, name: 'Rapport Semaine 2', type: 'Rapport hebdomadaire', author: 'Sara Amrani', date: '14/09/2026', status: 'Validé' },
  { id: 4, name: 'Rapport Semaine 3', type: 'Rapport hebdomadaire', author: 'Sara Amrani', date: '21/09/2026', status: 'En cours d\'examen' },
]

export type NotificationItem = {
  id: number
  text: string
  date: string
  read: boolean
}

export const internNotifications: NotificationItem[] = [
  { id: 1, text: 'Votre encadrant Ahmed Benali vous a été affecté.', date: 'Il y a 3 jours', read: true },
  { id: 2, text: 'Votre rapport Semaine 2 a été validé.', date: 'Il y a 1 jour', read: true },
  { id: 3, text: 'Nouvelle tâche ajoutée : Documentation.', date: 'Il y a 5 heures', read: false },
]

export const companyAdminNotifications: NotificationItem[] = [
  { id: 1, text: 'Nouvelle demande de stage de Lina Berrada.', date: 'Il y a 2 jours', read: true },
  { id: 2, text: 'Rapport soumis par Sara Amrani.', date: 'Il y a 1 jour', read: false },
]

export const supervisorNotifications: NotificationItem[] = [
  { id: 1, text: 'Nouveau stagiaire affecté : Sara Amrani.', date: 'Il y a 4 jours', read: true },
  { id: 2, text: 'Ahmed n\'a pas envoyé son rapport hebdomadaire.', date: 'Il y a 6 heures', read: false },
]

export const superAdminNotifications: NotificationItem[] = [
  { id: 1, text: 'Nouvelle entreprise à valider : XYZ.', date: 'Il y a 1 jour', read: false },
  { id: 2, text: 'Nouveau administrateur inscrit.', date: 'Il y a 3 jours', read: true },
]
// --- Chat stagiaire <-> encadrant ---
export type ChatMessage = {
  id: number
  sender: 'intern' | 'supervisor'
  text: string
  time: string
}

export const chatByIntern: Record<string, ChatMessage[]> = {
  Sara: [
    { id: 1, sender: 'supervisor', text: 'Bonjour Sara, bienvenue dans l\'équipe.', time: '09:02' },
    { id: 2, sender: 'intern', text: 'Merci Ahmed ! Je commence l\'analyse des besoins aujourd\'hui.', time: '09:05' },
    { id: 3, sender: 'supervisor', text: 'Parfait, tiens-moi au courant si tu as des questions.', time: '09:06' },
  ],
  Ahmed: [
    { id: 1, sender: 'supervisor', text: 'Ahmed, peux-tu envoyer ton rapport hebdomadaire ?', time: 'Hier' },
  ],
  Lina: [
    { id: 1, sender: 'intern', text: 'Bonjour, j\'ai terminé la maquette demandée.', time: 'Hier' },
    { id: 2, sender: 'supervisor', text: 'Super, je regarde ça aujourd\'hui.', time: 'Hier' },
  ],
}

// --- Super Admin : Stagiaires (toutes entreprises) ---
export type SuperAdminIntern = {
  id: number
  name: string
  formation: string
  company: string
  type: 'PFE' | 'PFC'
  supervisor: string
  startDate: string
  endDate: string
  progress: number
  status: string
}

export const allInterns: SuperAdminIntern[] = [
  { id: 1, name: 'Sara Amrani', formation: 'Génie logiciel', company: 'Atlas Telecom', type: 'PFE', supervisor: 'Ahmed Benali', startDate: '01/09/2026', endDate: '30/09/2026', progress: 75, status: 'En cours' },
  { id: 2, name: 'Ahmed Kaci', formation: 'Réseaux', company: 'Atlas Telecom', type: 'PFC', supervisor: 'Salma Idrissi', startDate: '01/09/2026', endDate: '30/11/2026', progress: 55, status: 'En cours' },
  { id: 3, name: 'Lina Berrada', formation: 'Data science', company: 'Novabank', type: 'PFE', supervisor: 'Nora El Fassi', startDate: '15/08/2026', endDate: '15/02/2027', progress: 90, status: 'En cours' },
  { id: 4, name: 'Youssef Amine', formation: 'Cybersécurité', company: 'Sigma Energy', type: 'PFC', supervisor: 'Omar Tazi', startDate: '01/07/2026', endDate: '30/09/2026', progress: 100, status: 'Terminé' },
]

// --- Super Admin : Administrateurs d'entreprise ---
export type CompanyAdminAccount = {
  id: number
  name: string
  email: string
  company: string
  type: string
  status: 'Actif' | 'Désactivé'
  createdAt: string
}

export const companyAdmins: CompanyAdminAccount[] = [
  { id: 1, name: 'Ahmed Benali', email: 'ahmed.benali@abc.com', company: 'ABC', type: 'Administrateur entreprise', status: 'Actif', createdAt: '08/09/2026' },
  { id: 2, name: 'Sara Idrissi', email: 'sara.idrissi@xyz.com', company: 'XYZ', type: 'Administrateur entreprise', status: 'Actif', createdAt: '08/09/2026' },
  { id: 3, name: 'Karim Fassi', email: 'karim.fassi@novabank.ma', company: 'Novabank', type: 'Administrateur entreprise', status: 'Désactivé', createdAt: '12/03/2026' },
]
// --- Documents encadrant : catégories + statut par défaut ---
export type DocCategory = 'Convention' | 'Rapport' | 'Mémoire' | 'Cahier des charges' | 'Attestation' | 'Administratif' | 'Autre'

export type SupervisorDocument = {
  id: number
  name: string
  intern: string
  category: DocCategory
  date: string
  seen: boolean
}

export const supervisorDocuments: SupervisorDocument[] = [
  { id: 1, name: 'Convention.pdf', intern: 'Ahmed Ben Ali', category: 'Convention', date: '10/09', seen: true },
  { id: 2, name: 'Cahier-des-charges.pdf', intern: 'Ahmed Ben Ali', category: 'Cahier des charges', date: '11/09', seen: true },
  { id: 3, name: 'Rapport-V2.pdf', intern: 'Ahmed Ben Ali', category: 'Rapport', date: '12/09', seen: false },
  { id: 4, name: 'Convention.pdf', intern: 'Sara Amrane', category: 'Convention', date: '10/09', seen: true },
  { id: 5, name: 'Memoire-V1.pdf', intern: 'Sara Amrane', category: 'Mémoire', date: '13/09', seen: false },
]

// --- Rapports et mémoires : PFE / PFC, publication globale ---


export type ThesisStatus =
  | 'Brouillon'
  | 'Soumis'
  | 'En cours de révision'
  | 'À corriger'
  | 'Validé'

export type Thesis = {
  id: number
  title: string
  intern: string
  company: string
  kind: 'Rapport' | 'Mémoire'
  version: number
  date: string
  status: ThesisStatus
  published: boolean
}

export const theses: Thesis[] = [
  {
    id: 1,
    title: 'Application de gestion des stages',
    intern: 'Zineb Ouled Laid',
    company: 'Atlas Telecom',
    kind: 'Rapport',
    version: 1,
    date: '10/09/2026',
    status: 'Soumis',
    published: false,
  },
  {
    id: 2,
    title: 'Plateforme intelligente de gestion des stages',
    intern: 'Ahmed Benali',
    company: 'Atlas Telecom',
    kind: 'Mémoire',
    version: 2,
    date: '08/09/2026',
    status: 'En cours de révision',
    published: false,
  },
  {
    id: 3,
    title: 'Système de suivi des stagiaires',
    intern: 'Sarah K.',
    company: 'Sonatrach',
    kind: 'Rapport',
    version: 1,
    date: '05/09/2026',
    status: 'Validé',
    published: true,
  },
  {
    id: 4,
    title: 'Intelligence artificielle pour la gestion des PFE',
    intern: 'Mohamed A.',
    company: 'Sonatrach',
    kind: 'Mémoire',
    version: 1,
    date: '03/09/2026',
    status: 'À corriger',
    published: false,
  },
]
export const supervisorTodo = [
  { icon: '⚠️', text: '3 tâches à valider' },
  { icon: '📄', text: '2 rapports à consulter' },
  { icon: '📅', text: '1 rendez-vous aujourd\'hui' },
  { icon: '🔔', text: '4 nouvelles notifications' },
]

export type Appointment = { id: number; time: string; title: string; date: string; intern?: string }

export const supervisorAppointments: Appointment[] = [
  { id: 1, time: '10:00', title: 'Réunion avec Ahmed', date: 'Aujourd\'hui', intern: 'Ahmed Ben Ali' },
  { id: 2, time: '14:00', title: 'Suivi de Sara', date: 'Aujourd\'hui', intern: 'Sara Amrane' },
]

export const supervisorDeadlines = [
  { id: 1, date: '20 septembre', title: 'Rapport intermédiaire' },
  { id: 2, date: '30 septembre', title: 'Version finale' },
]

export const supervisorEventTypes = ['Réunion', 'Soutenance', 'Remise de rapport', 'Remise de mémoire', "Échéance d'activité"]

export const supervisorActivityFeed = [
  'Sara a ajouté une nouvelle tâche',
  'Ahmed a envoyé son rapport',
  'Yacine a terminé une activité',
  'Vous avez validé une tâche',
]

export const supervisorDashboardStats = [
  { label: 'Total stagiaires', value: '8' },
  { label: 'Stages actifs', value: '5' },
  { label: 'Stages terminés', value: '3' },
  { label: 'Rapports en attente', value: '4' },
]

export const supervisorProgressChart = [
  { name: 'Ahmed', progress: 70 },
  { name: 'Sara', progress: 45 },
  { name: 'Ali', progress: 60 },
  { name: 'Yacine', progress: 90 },
]
export type SupervisorIntern = {
  id: number
  name: string
  email: string
  phone: string
  company: string
  project: string
  type: 'PFE' | 'PFC'
  status: 'Actif' | 'Terminé' | 'En attente'
  startDate: string
  endDate: string
  progress: number
}

export const supervisorInternsDetailed: SupervisorIntern[] = [
  {
    id: 1,
    name: 'Zineb Ouled Laid',
    email: 'zineb@example.com',
    phone: '0550000000',
    company: 'Atlas Telecom',
    project: 'Plateforme de gestion des stages',
    type: 'PFE',
    status: 'Actif',
    startDate: '01/09/2026',
    endDate: '31/12/2026',
    progress: 45,
  },
  {
    id: 2,
    name: 'Ahmed Benali',
    email: 'ahmed@example.com',
    phone: '0551000000',
    company: 'Atlas Telecom',
    project: 'Application mobile de suivi',
    type: 'PFC',
    status: 'Actif',
    startDate: '15/09/2026',
    endDate: '15/11/2026',
    progress: 30,
  },
  {
    id: 3,
    name: 'Sarah K.',
    email: 'sarah@example.com',
    phone: '0552000000',
    company: 'Sonatrach',
    project: 'Système de gestion documentaire',
    type: 'PFE',
    status: 'En attente',
    startDate: '20/09/2026',
    endDate: '20/01/2027',
    progress: 0,
  },
]
export const internDashboardStats = [
  { label: 'Stage', value: '120 jours' },
  { label: 'Progression', value: '65%' },
  { label: 'Tâches terminées', value: '24' },
  { label: 'Activités réalisées', value: '12' },
  { label: 'Documents', value: '8' },
  { label: 'Jours restants', value: '45' },
]

export const internTimeline = [
  { label: 'Stage commencé', done: true },
  { label: 'Convention validée', done: true },
  { label: 'Sujet validé', done: true },
  { label: 'Première activité', done: true },
  { label: 'Rapport intermédiaire', done: false },
  { label: 'Rapport final', done: false },
  { label: 'Soutenance', done: false },
]

export const internDeadlines = [
  { icon: '', text: 'Remise version 2 du rapport', date: '20 septembre' },
  { icon: '', text: 'Réunion avec encadrant', date: '22 septembre' },
  { icon: '', text: 'Soutenance', date: '15 décembre' },
]

export type InternActivity = {
  id: number
  title: string
  description: string
  date: string
  duration: string
  category: string
  status: 'En attente' | 'En cours de validation' | 'Validée' | 'Refusée'
  source: 'supervisor' | 'intern'
}

export const internActivities: InternActivity[] = [
  { id: 1, title: 'Analyse des besoins', description: 'Recueil des besoins fonctionnels.', date: '05/09', duration: '4h', category: 'Analyse', status: 'Validée', source: 'supervisor' },
  { id: 2, title: 'Maquettage', description: 'Création des maquettes UI.', date: '08/09', duration: '6h', category: 'Conception', status: 'En cours de validation', source: 'supervisor' },
]

export type ReportVersionEntry = {
  version: number
  date: string
  status: ThesisStatus
  comment?: string
}

export const internReportHistory: ReportVersionEntry[] = [
  { version: 1, date: '01/09/2026', status: 'Validé' },
  { version: 2, date: '12/09/2026', status: 'À corriger', comment: 'Revoir la problématique et ajouter les références bibliographiques.' },
]

export const internAppointments: Appointment[] = [
  { id: 1, time: '10:00', title: 'Réunion avec encadrant', date: '15 septembre' },
]
export const internWeeklyTasks = [
  { week: 'S1', count: 3 }, { week: 'S2', count: 5 }, { week: 'S3', count: 4 }, { week: 'S4', count: 6 },
]

export const internWeeklyActivities = [
  { week: 'S1', count: 2 }, { week: 'S2', count: 3 }, { week: 'S3', count: 3 }, { week: 'S4', count: 4 },
]

export const internTimeRemainingPercent = 27
// --- Demandes de validation de compte (différent des demandes de stage) ---
export type AccountValidationRequest = {
  id: number
  name: string
  email: string
  phone: string
  role: 'Stagiaire' | 'Encadrant'
  type?: 'PFE' | 'PFC'
  university?: string
  fonction?: string
  department?: string
  date: string
  status: 'En attente' | 'Accepté' | 'Refusé'
  refusalReason?: string
}

export const accountValidationRequests: AccountValidationRequest[] = [
  { id: 1, name: 'Sara Amrani', email: 'sara@email.com', phone: '+213 555 00 01', role: 'Stagiaire', type: 'PFE', university: 'USTHB', date: '14/09/2026', status: 'En attente' },
  { id: 2, name: 'Ahmed Kaci', email: 'ahmed.k@email.com', phone: '+213 555 00 02', role: 'Stagiaire', type: 'PFC', university: 'ENSIAS', date: '13/09/2026', status: 'En attente' },
  { id: 3, name: 'Karim Bennani', email: 'karim@email.com', phone: '+213 555 00 03', role: 'Encadrant', fonction: 'Ingénieur logiciel', department: 'IT', date: '14/09/2026', status: 'En attente' },
]

// --- Entreprise (séparé du profil personnel) ---
export type CompanyInfo = {
  name: string
  description: string
  address: string
  website: string
  email: string
  phone: string
  registrationNumber: string
  companyId: string
  createdAt: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

export const companyInfo: CompanyInfo = {
  name: 'Atlas Telecom',
  description: 'Opérateur télécom et infrastructures réseau.',
  address: 'Technopark, Alger',
  website: 'https://atlas-telecom.dz',
  email: 'contact@atlas-telecom.dz',
  phone: '+213 21 00 00 11',
  registrationNumber: 'AT-2024-0187',
  companyId: '1',
  createdAt: '12/01/2024',
  contactName: 'Ahmed Benali',
  contactEmail: 'ahmed.benali@atlas-telecom.dz',
  contactPhone: '+213 661 23 45 10',
}

export const companyOngoingInternships = [
  { intern: 'Sara Amrani', type: 'PFE' as const, supervisor: 'Karim Bennani', subject: 'Application RH', progress: 70, endDate: '30/06', status: 'Actif' },
  { intern: 'Ahmed Kaci', type: 'PFC' as const, supervisor: 'Salma Idrissi', subject: 'Gestion des stages', progress: 45, endDate: '30/12', status: 'Actif' },
]

export const companyAdminDashboardStats = [
  { label: 'Total stagiaires', value: '24' },
  { label: 'Stagiaires PFE', value: '14' },
  { label: 'Stagiaires PFC', value: '10' },
  { label: 'Encadrants actifs', value: '10' },
  { label: 'Stages en cours', value: '18' },
  { label: 'Demandes en attente', value: '5' },
  { label: 'Rapports en attente', value: '4' },
  { label: 'Documents à valider', value: '6' },
]

export const stageStatusBreakdown = [
  { label: 'En attente', count: 5 },
  { label: 'En cours', count: 18 },
  { label: 'Terminés', count: 9 },
  { label: 'Refusés', count: 2 },
]

export const monthlyRequests = [
  { month: 'Juin', count: 6 }, { month: 'Juil', count: 9 }, { month: 'Août', count: 4 }, { month: 'Sept', count: 12 },
]
// --- Affectations par département ---
export const internshipRequestsWithDept = [
  { name: 'Sara Amrani', formation: 'Génie logiciel', type: 'PFE', startDate: '01/09/2026', status: 'En attente', department: 'IT' },
  { name: 'Lina Berrada', formation: 'Réseaux', type: 'PFC', startDate: '05/09/2026', status: 'En attente', department: 'Infrastructure' },
  { name: 'Yacine Ali', formation: 'RH digital', type: 'PFC', startDate: '02/09/2026', status: 'En attente', department: 'RH' },
]

// --- Super Admin : Demandes d'ouverture d'entreprise (accept/refuse) ---
export type CompanyRequest = {
  id: number
  company: string
  responsible: string
  date: string
  status: 'En attente' | 'Acceptée' | 'Refusée'
}

export const companyRequests: CompanyRequest[] = [
  { id: 1, company: 'ABC', responsible: 'Ahmed', date: '08/09/2026', status: 'En attente' },
  { id: 2, company: 'XYZ', responsible: 'Sara', date: '08/09/2026', status: 'En attente' },
]