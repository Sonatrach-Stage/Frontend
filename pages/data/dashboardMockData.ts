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
export type ThesisStatus = 'Brouillon' | 'Soumis' | 'En cours de révision' | 'À corriger' | 'Validé'

export type Thesis = {
  id: number
  intern: string
  company: string
  type: 'PFE' | 'PFC'
  kind: 'Rapport' | 'Mémoire'
  title: string
  version: string
  date: string
  status: ThesisStatus
  published: boolean
}

export const theses: Thesis[] = [
  { id: 1, intern: 'Ahmed Ben Ali', company: 'Atlas Telecom', type: 'PFE', kind: 'Rapport', title: 'Application RH — Rapport intermédiaire', version: 'V2', date: '12/09', status: 'À corriger', published: false },
  { id: 2, intern: 'Sara Amrane', company: 'Atlas Telecom', type: 'PFC', kind: 'Mémoire', title: 'Gestion des stages', version: 'V1', date: '13/09', status: 'Validé', published: true },
  { id: 3, intern: 'Lina Berrada', company: 'Novabank', type: 'PFE', kind: 'Mémoire', title: 'Fintech mobile', version: 'V1', date: '10/09', status: 'Soumis', published: false },
  { id: 4, intern: 'Youssef Amine', company: 'Sigma Energy', type: 'PFC', kind: 'Rapport', title: 'Audit cybersécurité', version: 'V1', date: '09/09', status: 'Validé', published: true },
]