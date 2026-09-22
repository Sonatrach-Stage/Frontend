import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import GoogleCallbackPage from './pages/GoogleCallbackPage'
// ...

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
import SignupRolePage from './pages/SignupRolePage'
import SignupInformationPage from './pages/SignupInformationPage'
import SignupCompanyPage from './pages/SignupCompanyPage'
import SignupSupervisorPage from './pages/SignupSupervisorPage'
import SignupRequestPage from './pages/SignupRequestPage'
import AdminSignupPage from './pages/AdminSignupPage'
import RequestPendingPage from './pages/RequestPendingPage'
import DashboardEntry from './pages/DashboardEntry'
import VerifyOtpPage from './pages/VerifyOtpPage'
import ForgotPasswordFlowPage from './pages/ForgotPasswordFlowPage'

import type { SignupDraft } from './pages/data/internPilotData'

import { DashboardLayout } from './pages/dashboard/DashboardLayout'
import { PlaceholderPage } from './pages/dashboard/PlaceholderPage'
import { companyAdminNav, internNav, supervisorNav, superAdminNav } from './pages/dashboard/navConfig'
import { getCurrentUser } from './lib/auth'
import type { CurrentUser } from './lib/auth'

// Company Admin
import CompanyAdminHome from './pages/dashboard/company-admin/CompanyAdminHome'
import CompanyAdminDashboardTab from './pages/dashboard/company-admin/DashboardTab'
import ValidationsPage from './pages/dashboard/company-admin/ValidationsPage'
import InternsPage from './pages/dashboard/company-admin/InternsPage'
import AssignmentsPage from './pages/dashboard/company-admin/AssignmentsPage'
import EncadrantsPage from './pages/dashboard/company-admin/EncadrantsPage'
import DocumentDetailPage from './pages/dashboard/intern/DocumentDetailPage'
import CompanyAdminAssistantIAPage from './pages/dashboard/company-admin/AssistantIAPage'
import CompanyAdminNotificationsPage from './pages/dashboard/company-admin/NotificationsPage'
import CompanyPage from './pages/dashboard/company-admin/CompanyPage'
import CompanyAdminProfilePage from './pages/dashboard/company-admin/ProfilePage'

// Intern
import InternHome from './pages/dashboard/intern/InternHome'
import InternDashboardTab from './pages/dashboard/intern/DashboardTab'
import MySupervisorPage from './pages/dashboard/intern/MySupervisorPage'
import MyTasksPage from './pages/dashboard/intern/MyTasksPage'

import InternMessagesPage from './pages/dashboard/intern/MessagesPage'
import InternDocumentsPage from './pages/dashboard/intern/MyDocumentsPage'
import InternNotificationsPage from './pages/dashboard/intern/NotificationsPage'
import InternProfilePage from './pages/dashboard/intern/ProfilePage'
import MyActivitiesPage from './pages/dashboard/intern/MyActivitiesPage'
import InternCalendarPage from './pages/dashboard/intern/CalendarPage'
import AssistantIAPage from './pages/dashboard/intern/AssistantIAPage'

// Supervisor
import SupervisorHome from './pages/dashboard/SupervisorHome'
import SupervisorDashboardTab from './pages/dashboard/supervisor/DashboardTab'
import SupervisorInternsPage from './pages/dashboard/supervisor/InternsPage'
import SupervisorAssignmentsPage from './pages/dashboard/supervisor/AssignmentsPage'
import SupervisorActivitiesPage from './pages/dashboard/supervisor/ActivitiesPage'
import SupervisorTasksPage from './pages/dashboard/supervisor/TasksPage'
import SupervisorCalendarPage from './pages/dashboard/supervisor/CalendarPage'
import SupervisorMessagesPage from './pages/dashboard/supervisor/MessagesPage'

import SupervisorDocumentsPage from './pages/dashboard/supervisor/DocumentsPage'
import SupervisorAssistantIAPage from './pages/dashboard/supervisor/AssistantIAPage'
import SupervisorNotificationsPage from './pages/dashboard/supervisor/NotificationsPage'
import SupervisorProfilePage from './pages/dashboard/supervisor/ProfilePage'

// Super Admin
import SuperAdminHome from './pages/dashboard/SuperAdminHome'
import SuperAdminDashboardTab from './pages/dashboard/super-admin/DashboardTab'
import SuperAdminRequestsPage from './pages/dashboard/super-admin/RequestsPage'
import CompaniesPage from './pages/dashboard/super-admin/CompaniesPage'
import SuperAdminInternsPage from './pages/dashboard/super-admin/InternsPage'
import SupervisorsPage from './pages/dashboard/super-admin/SupervisorsPage'
import SuperAdminDocumentsPage from './pages/dashboard/super-admin/DocumentsPage'
import SuperAdminAssistantIAPage from './pages/dashboard/super-admin/AssistantIAPage'
import SuperAdminNotificationsPage from './pages/dashboard/super-admin/NotificationsPage'

function RoleLayout({
  basePath,
  navItems,
  roleLabel,
  expectedRole,
}: {
  basePath: string
  navItems: typeof companyAdminNav
  roleLabel: string
  expectedRole: CurrentUser['role']
}) {
  const user = getCurrentUser()
  if (!user) return <Navigate to="/" replace />
  if (user.role !== expectedRole) return <Navigate to={`/dashboard/${user.role}`} replace />
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
    confirmPassword: '',
    supervisor_id: '',
  })

  function updateSignupDraft(changes: Partial<SignupDraft>) {
    setSignupDraft((currentDraft) => ({ ...currentDraft, ...changes }))
  }

  return (
    <Routes>
      {/* AUTH / INSCRIPTION */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordFlowPage />} />
      <Route path="/signup" element={<SignupRolePage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route path="/signup/information" element={<SignupInformationPage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route path="/signup/company" element={<SignupCompanyPage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route path="/signup/supervisor" element={<SignupSupervisorPage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route path="/signup/admin" element={<AdminSignupPage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route path="/signup/request" element={<SignupRequestPage draft={signupDraft} />} />
      <Route path="/signup/verify-otp" element={<VerifyOtpPage draft={signupDraft} />} />
      <Route path="/request-pending" element={<RequestPendingPage draft={signupDraft} />} />
      <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />

      {/* ENTRÉE DASHBOARD */}
      <Route path="/dashboard" element={<DashboardEntry />} />

      {/* ADMINISTRATEUR ENTREPRISE */}
      <Route
        path="/dashboard/company-admin"
        element={
          <RoleLayout
            basePath="/dashboard/company-admin"
            navItems={companyAdminNav}
            roleLabel="Administrateur entreprise"
            expectedRole="company-admin"
          />
        }
      >
        <Route index element={<CompanyAdminHome />} />
        <Route path="tableau-de-bord" element={<CompanyAdminDashboardTab />} />
        <Route path="validations" element={<ValidationsPage />} />
        <Route path="stagiaires" element={<InternsPage />} />
        <Route path="encadrants" element={<EncadrantsPage />} />
        <Route path="affectations" element={<AssignmentsPage />} />
        <Route path="documents" element={<PlaceholderPage icon={FolderOpen} title="Documents" description="Bibliothèque documentaire de l'entreprise." />} />
       
        <Route path="ia" element={<CompanyAdminAssistantIAPage />} />
        <Route path="notifications" element={<CompanyAdminNotificationsPage />} />
        <Route path="entreprise" element={<CompanyPage />} />
        <Route path="profil" element={<CompanyAdminProfilePage />} />
      </Route>

      {/* STAGIAIRE */}
      <Route
        path="/dashboard/intern"
        element={
          <RoleLayout
            basePath="/dashboard/intern"
            navItems={internNav}
            roleLabel="Stagiaire"
            expectedRole="intern"
          />
        }
      >
        <Route index element={<InternHome />} />
        <Route path="tableau-de-bord" element={<InternDashboardTab />} />
        <Route path="mon-encadrant" element={<MySupervisorPage />} />
        <Route path="activites" element={<MyActivitiesPage />} />
        <Route path="taches" element={<MyTasksPage />} />
        <Route path="calendrier" element={<InternCalendarPage />} />
        <Route path="messages" element={<InternMessagesPage />} />
       <Route path="documents" element={<InternDocumentsPage />} />
<Route path="documents/:id" element={<DocumentDetailPage />} />
        <Route path="documents" element={<InternDocumentsPage />} />
        <Route path="ia" element={<AssistantIAPage />} />
        <Route path="notifications" element={<InternNotificationsPage />} />
        <Route path="profil" element={<InternProfilePage />} />
      </Route>

      {/* ENCADRANT */}
      <Route
        path="/dashboard/supervisor"
        element={
          <RoleLayout
            basePath="/dashboard/supervisor"
            navItems={supervisorNav}
            roleLabel="Encadrant"
            expectedRole="supervisor"
          />
        }
      >
        <Route index element={<SupervisorHome />} />
        <Route path="tableau-de-bord" element={<SupervisorDashboardTab />} />
        <Route path="stagiaires" element={<SupervisorInternsPage />} />
        <Route path="affectations" element={<SupervisorAssignmentsPage />} />
        <Route path="activites" element={<SupervisorActivitiesPage />} />
        <Route path="taches" element={<SupervisorTasksPage />} />
        <Route path="calendrier" element={<SupervisorCalendarPage />} />
        <Route path="messages" element={<SupervisorMessagesPage />} />
   
        <Route path="documents" element={<SupervisorDocumentsPage />} />
        <Route path="ia" element={<SupervisorAssistantIAPage />} />
        <Route path="notifications" element={<SupervisorNotificationsPage />} />
        <Route path="profil" element={<SupervisorProfilePage />} />
      </Route>

      {/* SUPER ADMINISTRATEUR */}
      <Route
        path="/dashboard/super-admin"
        element={
          <RoleLayout
            basePath="/dashboard/super-admin"
            navItems={superAdminNav}
            roleLabel="Super Administrateur"
            expectedRole="super-admin"
          />
        }
      >
        <Route index element={<SuperAdminHome />} />
        <Route path="tableau-de-bord" element={<SuperAdminDashboardTab />} />
        <Route path="demandes" element={<SuperAdminRequestsPage />} />
        <Route path="entreprises" element={<CompaniesPage />} />
        <Route path="stagiaires" element={<SuperAdminInternsPage />} />
        <Route path="encadrants" element={<SupervisorsPage />} />
        <Route path="documents" element={<SuperAdminDocumentsPage />} />
        <Route path="rapports" element={<PlaceholderPage icon={FileText} title="Rapports" description="Tous les rapports de la plateforme." />} />
        <Route path="ia" element={<SuperAdminAssistantIAPage />} />
        <Route path="notifications" element={<SuperAdminNotificationsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}