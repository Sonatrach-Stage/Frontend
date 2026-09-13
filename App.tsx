import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import {
  Bell,
  Bot,
  CalendarDays,
  CheckSquare,
  FileText,
  FolderOpen,
  Layers,
} from 'lucide-react'

import './appTheme.css'

import LoginPage from './pages/LoginPage'
import SupervisorInternsPage from './pages/dashboard/supervisor/InternsPage'
import SupervisorAssignmentsPage from './pages/dashboard/supervisor/AssignmentsPage'
import SupervisorCalendarPage from './pages/dashboard/supervisor/CalendarPage'
import SignupRolePage from './pages/SignupRolePage'
import SignupInformationPage from './pages/SignupInformationPage'
import SignupCompanyPage from './pages/SignupCompanyPage'
import SignupSupervisorPage from './pages/SignupSupervisorPage'
import SignupRequestPage from './pages/SignupRequestPage'
import AdminSignupPage from './pages/AdminSignupPage'
import RequestPendingPage from './pages/RequestPendingPage'
import DashboardEntry from './pages/DashboardEntry'
import ReportsAndThesesPage from './pages/dashboard/supervisor/ReportsAndThesesPage'
import SupervisorActivitiesPage from './pages/dashboard/supervisor/ActivitiesPage'
import SupervisorTasksPage from './pages/dashboard/supervisor/TasksPage'

import type { SignupDraft } from './pages/data/internPilotData'

import { DashboardLayout } from './pages/dashboard/DashboardLayout'
import { PlaceholderPage } from './pages/dashboard/PlaceholderPage'
import { companyAdminNav, internNav, supervisorNav, superAdminNav } from './pages/dashboard/navConfig'
import { getCurrentUser } from './lib/auth'

// Company Admin
import CompanyAdminHome from './pages/dashboard/company-admin/CompanyAdminHome'
import CompanyAdminDashboardTab from './pages/dashboard/company-admin/DashboardTab'
import RequestsPage from './pages/dashboard/company-admin/RequestsPage'
import InternsPage from './pages/dashboard/company-admin/InternsPage'
import AssignmentsPage from './pages/dashboard/company-admin/AssignmentsPage'
import CompanyAdminDocumentsPage from './pages/dashboard/company-admin/DocumentsPage'
import CompanyAdminNotificationsPage from './pages/dashboard/company-admin/NotificationsPage'
import CompanyAdminProfilePage from './pages/dashboard/company-admin/ProfilePage'

// Intern
import InternHome from './pages/dashboard/intern/InternHome'
import InternDashboardTab from './pages/dashboard/intern/DashboardTab'
import MyInternshipPage from './pages/dashboard/intern/MyInternshipPage'
import MySupervisorPage from './pages/dashboard/intern/MySupervisorPage'
import MyTasksPage from './pages/dashboard/intern/MyTasksPage'
import MyReportPage from './pages/dashboard/intern/MyReportPage'
import InternMessagesPage from './pages/dashboard/intern/MessagesPage'
import InternDocumentsPage from './pages/dashboard/intern/MyDocumentsPage'
import InternNotificationsPage from './pages/dashboard/intern/NotificationsPage'
import InternProfilePage from './pages/dashboard/intern/ProfilePage'

// Supervisor
import SupervisorHome from './pages/dashboard/SupervisorHome'
import SupervisorDashboardTab from './pages/dashboard/supervisor/DashboardTab'
import SupervisorMessagesPage from './pages/dashboard/supervisor/MessagesPage'
import SupervisorDocumentsPage from './pages/dashboard/supervisor/DocumentsPage'
import SupervisorNotificationsPage from './pages/dashboard/supervisor/NotificationsPage'
import SupervisorProfilePage from './pages/dashboard/supervisor/ProfilePage'

// Super Admin
import SuperAdminHome from './pages/dashboard/SuperAdminHome'
import SuperAdminDashboardTab from './pages/dashboard/super-admin/DashboardTab'
import CompaniesPage from './pages/dashboard/super-admin/CompaniesPage'
import AdminsPage from './pages/dashboard/super-admin/AdminsPage'
import SuperAdminInternsPage from './pages/dashboard/super-admin/InternsPage'
import SupervisorsPage from './pages/dashboard/super-admin/SupervisorsPage'
import SuperAdminDocumentsPage from './pages/dashboard/super-admin/DocumentsPage'
import SuperAdminNotificationsPage from './pages/dashboard/super-admin/NotificationsPage'

function RoleLayout({
  basePath,
  navItems,
  roleLabel,
}: {
  basePath: string
  navItems: typeof companyAdminNav
  roleLabel: string
}) {
  const user = getCurrentUser()
  if (!user) return <Navigate to="/" replace />
  return <DashboardLayout basePath={basePath} navItems={navItems} roleLabel={roleLabel} user={user} />
}

export default function App() {
  const [signupDraft, setSignupDraft] = useState<SignupDraft>({
    role: null,
    internType: 'PFE',
    selectedCompanyId: null,
    selectedSupervisorId: null,
    name: '',
    email: '',
    phone: '',
    establishment: '',
    studies_level: 'bac5',
    sector: '',
    start_date: '',
    end_date: '',
    profil_image: null,
    memoire: '',
    convention_file: null,
    company_id: '',
    job: '',
    department: '',
    specialization: '',
    years_of_experience: '',
    password: '',
    supervisor_id: '',
  })

  function updateSignupDraft(changes: Partial<SignupDraft>) {
    setSignupDraft((currentDraft) => ({ ...currentDraft, ...changes }))
  }

  return (
    <Routes>
      {/* AUTH / INSCRIPTION */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupRolePage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route path="/signup/information" element={<SignupInformationPage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route path="/signup/company" element={<SignupCompanyPage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route path="/signup/supervisor" element={<SignupSupervisorPage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route path="/signup/admin" element={<AdminSignupPage />} />
      <Route path="/signup/request" element={<SignupRequestPage draft={signupDraft} />} />
      <Route path="/request-pending" element={<RequestPendingPage draft={signupDraft} />} />

      {/* ENTRÉE DASHBOARD */}
      <Route path="/dashboard" element={<DashboardEntry />} />

      {/* ADMINISTRATEUR ENTREPRISE */}
      <Route
        path="/dashboard/company-admin"
        element={<RoleLayout basePath="/dashboard/company-admin" navItems={companyAdminNav} roleLabel="Administrateur entreprise" />}
      >
        <Route index element={<CompanyAdminHome />} />
        <Route path="tableau-de-bord" element={<CompanyAdminDashboardTab />} />
        <Route path="demandes" element={<RequestsPage />} />
        <Route path="stagiaires" element={<InternsPage />} />
        <Route path="affectations" element={<AssignmentsPage />} />
        <Route path="encadrants" element={<PlaceholderPage icon={Layers} title="Encadrants" description="Liste des encadrants de votre entreprise." />} />
        <Route path="offres" element={<PlaceholderPage icon={FileText} title="Offres de stage" description="Créez et publiez vos offres de stage." />} />
        <Route path="activites" element={<PlaceholderPage icon={CalendarDays} title="Activités" description="Activités liées aux stagiaires." />} />
        <Route path="taches" element={<PlaceholderPage icon={CheckSquare} title="Tâches" description="Suivi des tâches assignées." />} />
        <Route path="calendrier" element={<PlaceholderPage icon={CalendarDays} title="Calendrier" description="Réunions, deadlines et rendez-vous." />} />
        <Route path="documents" element={<CompanyAdminDocumentsPage />} />
        <Route path="rapports" element={<PlaceholderPage icon={FileText} title="Rapports" description="Rapports déposés par vos stagiaires." />} />
        <Route path="notifications" element={<CompanyAdminNotificationsPage />} />
        <Route path="profil" element={<CompanyAdminProfilePage />} />
      </Route>

      {/* STAGIAIRE */}
      <Route
        path="/dashboard/intern"
        element={<RoleLayout basePath="/dashboard/intern" navItems={internNav} roleLabel="Stagiaire" />}
      >
        <Route index element={<InternHome />} />
        <Route path="tableau-de-bord" element={<InternDashboardTab />} />
        <Route path="mon-stage" element={<MyInternshipPage />} />
        <Route path="mon-encadrant" element={<MySupervisorPage />} />
        <Route path="activites" element={<PlaceholderPage icon={CalendarDays} title="Mes activités" description="Activités assignées par l'encadrant." />} />
        <Route path="taches" element={<MyTasksPage />} />
        <Route path="calendrier" element={<PlaceholderPage icon={CalendarDays} title="Calendrier" description="Réunions, deadlines et soutenance." />} />
        <Route path="messages" element={<InternMessagesPage />} />
        <Route path="rapport" element={<MyReportPage />} />
        <Route path="documents" element={<InternDocumentsPage />} />
        <Route path="ia" element={<PlaceholderPage icon={Bot} title="Assistant IA" description="Résumez vos rapports et posez des questions." />} />
        <Route path="notifications" element={<InternNotificationsPage />} />
        <Route path="profil" element={<InternProfilePage />} />
      </Route>

      {/* ENCADRANT */}
      <Route
        path="/dashboard/supervisor"
        element={<RoleLayout basePath="/dashboard/supervisor" navItems={supervisorNav} roleLabel="Encadrant" />}
      >
        <Route index element={<SupervisorHome />} />
        <Route path="tableau-de-bord" element={<SupervisorDashboardTab />} />
        <Route path="stagiaires" element={<SupervisorInternsPage />} />
<Route path="affectations" element={<SupervisorAssignmentsPage />} />
<Route path="calendrier" element={<SupervisorCalendarPage />} />
        
        <Route path="activites" element={<SupervisorActivitiesPage />} />
        <Route path="taches" element={<SupervisorTasksPage />} />
        
        <Route path="messages" element={<SupervisorMessagesPage />} />
        <Route path="rapports" element={<ReportsAndThesesPage />} />
        <Route path="documents" element={<SupervisorDocumentsPage />} />
        <Route path="ia" element={<PlaceholderPage icon={Bot} title="Assistant IA" description="Résumez et analysez les documents autorisés." />} />
        <Route path="notifications" element={<SupervisorNotificationsPage />} />
        <Route path="profil" element={<SupervisorProfilePage />} />
      </Route>

      {/* SUPER ADMINISTRATEUR */}
      <Route
        path="/dashboard/super-admin"
        element={<RoleLayout basePath="/dashboard/super-admin" navItems={superAdminNav} roleLabel="Super Administrateur" />}
      >
        <Route index element={<SuperAdminHome />} />
        <Route path="tableau-de-bord" element={<SuperAdminDashboardTab />} />
        <Route path="entreprises" element={<CompaniesPage />} />
        <Route path="administrateurs" element={<AdminsPage />} />
        <Route path="stagiaires" element={<SuperAdminInternsPage />} />
        <Route path="encadrants" element={<SupervisorsPage />} />
        <Route path="documents" element={<SuperAdminDocumentsPage />} />
        <Route path="rapports" element={<PlaceholderPage icon={FileText} title="Rapports" description="Tous les rapports de la plateforme." />} />
        <Route path="notifications" element={<SuperAdminNotificationsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}