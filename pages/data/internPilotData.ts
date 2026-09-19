export type Role = 'super-admin' | 'company-admin' | 'supervisor' | 'intern'
export type SignupRole = 'intern' | 'supervisor' | 'company-admin'
export type InternType = 'PFE' | 'PFC'

export type SignupDraft = {
  role: SignupRole | null
  internType: InternType
  selectedCompanyId: number | null
  selectedSupervisorId: number | null
  
  confirmPassword: string

  // Informations stagiaire
  name: string
  email: string
  phone: string
  establishment: string
  studies_level: string
  sector: string
  start_date: string
  end_date: string

  profil_image: File | null
  memoire: string
  convention_file: File | null

  // Informations encadrant
  company_id: string
  job: string
  department: string
  specialization: string
  years_of_experience: string
  password: string
  supervisor_id: string
}

export const companies = [
  {
    id: 1,
    name: 'Atlas Telecom',
    address: 'Technopark, Casablanca',
    logo: '',
    description: 'Opérateur télécom et infrastructures réseau.',
    website_URL: 'https://atlas-telecom.ma',
    registration_number: 'AT-2024-0187',
    company_email: 'contact@atlas-telecom.ma',
    company_phone: '+212 522 00 00 11',
    created_at: '2024-01-12T09:30:00',
    updated_at: '2024-09-18T16:45:00',
    supervisors_count: 11,
    interns_count: 42,
  },
  {
    id: 2,
    name: 'Novabank',
    address: 'Boulevard Al Massira, Casablanca',
    logo: '',
    description: "Banque d'investissement et services financiers digitaux.",
    website_URL: 'https://novabank.ma',
    registration_number: 'NB-2023-4012',
    company_email: 'rh@novabank.ma',
    company_phone: '+212 522 00 00 22',
    created_at: '2023-07-04T11:00:00',
    updated_at: '2024-10-02T10:20:00',
    supervisors_count: 8,
    interns_count: 27,
  },
  {
    id: 3,
    name: 'Sigma Energy',
    address: 'Zone industrielle, Tanger',
    logo: '',
    description: 'Énergies renouvelables et ingénierie industrielle.',
    website_URL: 'https://sigma-energy.ma',
    registration_number: 'SE-2022-7781',
    company_email: 'stages@sigma-energy.ma',
    company_phone: '+212 539 00 00 33',
    created_at: '2022-03-20T08:15:00',
    updated_at: '2024-08-28T13:10:00',
    supervisors_count: 6,
    interns_count: 18,
  },
]

export const supervisors = [
  {
    id: 1,
    user_id: 11,
    company_id: 1,
    name: 'Karim Bennani',
    email: 'karim.bennani@atlas-telecom.ma',
    phone: '+212 661 23 45 10',
    profil_image: '',
    job: 'Architecte réseau senior',
    department: 'Infrastructure',
    created_at: '2024-01-20T10:00:00',
    specialization: 'Réseaux & Cloud hybride',
    years_of_experience: 12,
    interns_count: 5,
  },
  {
    id: 2,
    user_id: 12,
    company_id: 1,
    name: 'Salma Idrissi',
    email: 'salma.idrissi@atlas-telecom.ma',
    phone: '+212 662 23 45 10',
    profil_image: '',
    job: 'Lead Data Scientist',
    department: 'Data & IA',
    created_at: '2024-01-28T10:00:00',
    specialization: 'Machine learning appliqué',
    years_of_experience: 9,
    interns_count: 4,
  },
  {
    id: 3,
    user_id: 13,
    company_id: 1,
    name: 'Youssef Amrani',
    email: 'youssef.amrani@atlas-telecom.ma',
    phone: '+212 663 23 45 10',
    profil_image: '',
    job: 'Responsable cybersécurité',
    department: 'Sécurité',
    created_at: '2024-02-02T10:00:00',
    specialization: 'SOC & réponse à incident',
    years_of_experience: 15,
    interns_count: 3,
  },
  {
    id: 4,
    user_id: 14,
    company_id: 2,
    name: 'Nora El Fassi',
    email: 'nora.elfassi@novabank.ma',
    phone: '+212 664 23 45 10',
    profil_image: '',
    job: 'Product manager digital',
    department: 'Innovation',
    created_at: '2024-02-11T10:00:00',
    specialization: 'Fintech & parcours client',
    years_of_experience: 8,
    interns_count: 4,
  },
  {
    id: 5,
    user_id: 15,
    company_id: 3,
    name: 'Omar Tazi',
    email: 'omar.tazi@sigma-energy.ma',
    phone: '+212 665 23 45 10',
    profil_image: '',
    job: 'Ingénieur énergie solaire',
    department: 'R&D',
    created_at: '2024-03-01T10:00:00',
    specialization: 'Optimisation photovoltaïque',
    years_of_experience: 10,
    interns_count: 2,
  },
]

export const dashboardStats = [
  { label: 'Demandes actives', value: '12', trend: '+3 cette semaine' },
  { label: 'Tâches à faire', value: '8', trend: '4 prioritaires' },
  { label: 'Documents validés', value: '5', trend: 'Bibliothèque à jour' },
  { label: 'Progression stage', value: '68%', trend: 'PFE Data & IA' },
]

export const activityItems = [
  { title: 'Convention envoyée', meta: "En attente de validation par l'administrateur", status: 'En revue' },
  { title: 'Réunion encadrant', meta: 'Aujourd’hui à 15:00 avec Karim Bennani', status: 'Planifiée' },
  { title: 'Rapport intermédiaire', meta: 'Version brouillon sauvegardée', status: 'À compléter' },
]
export const departments = ['IT', 'RH', 'Finance', 'Marketing', 'Infrastructure', 'R&D', 'Sécurité'] as const