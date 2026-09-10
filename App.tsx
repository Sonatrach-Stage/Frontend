import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import {
  Bell,
  Bot,
  CalendarDays,
  CheckSquare,
  FileText,
  FolderOpen,
  MessageSquare,
  User,
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

import type { SignupDraft } from './pages/data/internPilotData'

import CompanyAdminDashboardTab from './pages/dashboard/company-admin/DashboardTab'
import SupervisorDashboardTab from './pages/dashboard/supervisor/DashboardTab'
import SuperAdminDashboardTab from './pages/dashboard/super-admin/DashboardTab'

import { DashboardLayout } from './pages/dashboard/DashboardLayout'
import { PlaceholderPage } from './pages/dashboard/PlaceholderPage'
import {
  companyAdminNav,
  internNav,
  supervisorNav,
  superAdminNav,
} from './pages/dashboard/navConfig'

import { getCurrentUser } from './lib/auth'

import CompanyAdminHome from './pages/dashboard/company-admin/CompanyAdminHome'
import RequestsPage from './pages/dashboard/company-admin/RequestsPage'
import InternsPage from './pages/dashboard/company-admin/InternsPage'
import AssignmentsPage from './pages/dashboard/company-admin/AssignmentsPage'

import InternHome from './pages/dashboard/intern/InternHome'
import DashboardTab from './pages/dashboard/intern/DashboardTab'
import MyInternshipPage from './pages/dashboard/intern/MyInternshipPage'
import MySupervisorPage from './pages/dashboard/intern/MySupervisorPage'
import MyTasksPage from './pages/dashboard/intern/MyTasksPage'

import SuperAdminHome from './pages/dashboard/SuperAdminHome'
import SupervisorHome from './pages/dashboard/SupervisorHome'

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

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <DashboardLayout
      basePath={basePath}
      navItems={navItems}
      roleLabel={roleLabel}
      user={user}
    />
  )
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
    setSignupDraft((currentDraft) => ({
      ...currentDraft,
      ...changes,
    }))
  }

  return (
    <Routes>
      {/* =========================
          AUTHENTIFICATION / INSCRIPTION
          ========================= */}

      <Route path="/" element={<LoginPage />} />

      <Route
        path="/signup"
        element={
          <SignupRolePage
            draft={signupDraft}
            updateDraft={updateSignupDraft}
          />
        }
      />

      <Route
        path="/signup/information"
        element={
          <SignupInformationPage
            draft={signupDraft}
            updateDraft={updateSignupDraft}
          />
        }
      />

      <Route
        path="/signup/company"
        element={
          <SignupCompanyPage
            draft={signupDraft}
            updateDraft={updateSignupDraft}
          />
        }
      />

      <Route
        path="/signup/supervisor"
        element={
          <SignupSupervisorPage
            draft={signupDraft}
            updateDraft={updateSignupDraft}
          />
        }
      />

      <Route path="/signup/admin" element={<AdminSignupPage />} />

      <Route
        path="/signup/request"
        element={<SignupRequestPage draft={signupDraft} />}
      />

      <Route
        path="/request-pending"
        element={<RequestPendingPage draft={signupDraft} />}
      />

      {/* =========================
          ENTRÉE DASHBOARD
          ========================= */}

      <Route path="/dashboard" element={<DashboardEntry />} />

      {/* =========================
          ADMINISTRATEUR ENTREPRISE
          ========================= */}

      <Route
        path="/dashboard/company-admin"
        element={
          <RoleLayout
            basePath="/dashboard/company-admin"
            navItems={companyAdminNav}
            roleLabel="Administrateur entreprise"
          />
        }
      >
        <Route index element={<CompanyAdminHome />} />

        <Route
          path="tableau-de-bord"
          element={<CompanyAdminDashboardTab />}
        />

        <Route path="demandes" element={<RequestsPage />} />

        <Route path="stagiaires" element={<InternsPage />} />

        <Route path="affectations" element={<AssignmentsPage />} />

        <Route
          path="encadrants"
          element={
            <PlaceholderPage
              icon={Layers}
              title="Encadrants"
              description="Liste des encadrants de votre entreprise — à connecter à l'API."
            />
          }
        />

        <Route
          path="offres"
          element={
            <PlaceholderPage
              icon={FileText}
              title="Offres de stage"
              description="Créez et publiez vos offres de stage."
            />
          }
        />

        <Route
          path="activites"
          element={
            <PlaceholderPage
              icon={CalendarDays}
              title="Activités"
              description="Activités liées aux stagiaires de l'entreprise."
            />
          }
        />

        <Route
          path="taches"
          element={
            <PlaceholderPage
              icon={CheckSquare}
              title="Tâches"
              description="Suivi des tâches assignées."
            />
          }
        />

        <Route
          path="calendrier"
          element={
            <PlaceholderPage
              icon={CalendarDays}
              title="Calendrier"
              description="Réunions, deadlines et rendez-vous."
            />
          }
        />

        <Route
          path="documents"
          element={
            <PlaceholderPage
              icon={FolderOpen}
              title="Documents"
              description="Bibliothèque documentaire de l'entreprise."
            />
          }
        />

        <Route
          path="rapports"
          element={
            <PlaceholderPage
              icon={FileText}
              title="Rapports"
              description="Rapports déposés par vos stagiaires."
            />
          }
        />

        <Route
          path="notifications"
          element={
            <PlaceholderPage
              icon={Bell}
              title="Notifications"
              description="Toutes vos notifications."
            />
          }
        />

        <Route
          path="profil"
          element={
            <PlaceholderPage
              icon={User}
              title="Profil"
              description="Gérez votre profil administrateur."
            />
          }
        />
      </Route>

      {/* =========================
          STAGIAIRE
          ========================= */}

      <Route
        path="/dashboard/intern"
        element={
          <RoleLayout
            basePath="/dashboard/intern"
            navItems={internNav}
            roleLabel="Stagiaire"
          />
        }
      >
        <Route index element={<InternHome />} />

        <Route
          path="tableau-de-bord"
          element={<DashboardTab />}
        />

        <Route
          path="mon-stage"
          element={<MyInternshipPage />}
        />

        <Route
          path="mon-encadrant"
          element={<MySupervisorPage />}
        />

        <Route
          path="activites"
          element={
            <PlaceholderPage
              icon={CalendarDays}
              title="Mes activités"
              description="Activités assignées par l'encadrant."
            />
          }
        />

        <Route path="taches" element={<MyTasksPage />} />

        <Route
          path="calendrier"
          element={
            <PlaceholderPage
              icon={CalendarDays}
              title="Calendrier"
              description="Réunions, deadlines et soutenance."
            />
          }
        />

        <Route
          path="messages"
          element={
            <PlaceholderPage
              icon={MessageSquare}
              title="Messages"
              description="Chat avec votre encadrant affecté uniquement."
            />
          }
        />

        <Route
          path="rapport"
          element={
            <PlaceholderPage
              icon={FileText}
              title="Mon rapport / mémoire"
              description="Upload, soumission et suivi de votre rapport ou mémoire."
            />
          }
        />

        <Route
          path="documents"
          element={
            <PlaceholderPage
              icon={FolderOpen}
              title="Mes documents"
              description="Convention, rapports, attestation."
            />
          }
        />

        <Route
          path="ia"
          element={
            <PlaceholderPage
              icon={Bot}
              title="Assistant IA"
              description="Résumez vos rapports et posez des questions sur vos documents."
            />
          }
        />

        <Route
          path="notifications"
          element={
            <PlaceholderPage
              icon={Bell}
              title="Notifications"
              description="Toutes vos notifications."
            />
          }
        />

        <Route
          path="profil"
          element={
            <PlaceholderPage
              icon={User}
              title="Profil"
              description="Gérez votre profil stagiaire."
            />
          }
        />
      </Route>

      {/* =========================
          ENCADRANT
          ========================= */}

      <Route
        path="/dashboard/supervisor"
        element={
          <RoleLayout
            basePath="/dashboard/supervisor"
            navItems={supervisorNav}
            roleLabel="Encadrant"
          />
        }
      >
        <Route index element={<SupervisorHome />} />

        <Route
          path="tableau-de-bord"
          element={<SupervisorDashboardTab />}
        />

        <Route
          path="stagiaires"
          element={
            <PlaceholderPage
              icon={Layers}
              title="Mes stagiaires"
              description="Stagiaires qui vous ont été affectés par l'administrateur."
            />
          }
        />

        <Route
          path="affectations"
          element={
            <PlaceholderPage
              icon={Layers}
              title="Affectations"
              description="Vos affectations en cours."
            />
          }
        />

        <Route
          path="activites"
          element={
            <PlaceholderPage
              icon={CalendarDays}
              title="Activités"
              description="Créez et assignez des activités."
            />
          }
        />

        <Route
          path="taches"
          element={
            <PlaceholderPage
              icon={CheckSquare}
              title="Tâches"
              description="Créez des tâches pour vos stagiaires."
            />
          }
        />

        <Route
          path="calendrier"
          element={
            <PlaceholderPage
              icon={CalendarDays}
              title="Calendrier"
              description="Réunions et rendez-vous."
            />
          }
        />

        <Route
          path="messages"
          element={
            <PlaceholderPage
              icon={MessageSquare}
              title="Messages"
              description="Chat avec vos stagiaires affectés."
            />
          }
        />

        <Route
          path="rapports"
          element={
            <PlaceholderPage
              icon={FileText}
              title="Rapports et mémoires"
              description="Documents soumis par vos stagiaires."
            />
          }
        />

        <Route
          path="documents"
          element={
            <PlaceholderPage
              icon={FolderOpen}
              title="Documents"
              description="Bibliothèque personnelle."
            />
          }
        />

        <Route
          path="ia"
          element={
            <PlaceholderPage
              icon={Bot}
              title="Assistant IA"
              description="Résumez et analysez les documents autorisés."
            />
          }
        />

        <Route
          path="notifications"
          element={
            <PlaceholderPage
              icon={Bell}
              title="Notifications"
              description="Toutes vos notifications."
            />
          }
        />

        <Route
          path="profil"
          element={
            <PlaceholderPage
              icon={User}
              title="Profil"
              description="Gérez votre profil encadrant."
            />
          }
        />
      </Route>

      {/* =========================
          SUPER ADMINISTRATEUR
          ========================= */}

      <Route
        path="/dashboard/super-admin"
        element={
          <RoleLayout
            basePath="/dashboard/super-admin"
            navItems={superAdminNav}
            roleLabel="Super Administrateur"
          />
        }
      >
        <Route index element={<SuperAdminHome />} />

        <Route
          path="tableau-de-bord"
          element={<SuperAdminDashboardTab />}
        />

        <Route
          path="entreprises"
          element={
            <PlaceholderPage
              icon={Layers}
              title="Entreprises"
              description="Toutes les entreprises inscrites sur la plateforme."
            />
          }
        />

        <Route
          path="administrateurs"
          element={
            <PlaceholderPage
              icon={User}
              title="Administrateurs"
              description="Tous les administrateurs d'entreprise."
            />
          }
        />

        <Route
          path="stagiaires"
          element={
            <PlaceholderPage
              icon={Layers}
              title="Stagiaires"
              description="Tous les stagiaires, toutes entreprises confondues."
            />
          }
        />

        <Route
          path="encadrants"
          element={
            <PlaceholderPage
              icon={Layers}
              title="Encadrants"
              description="Tous les encadrants de la plateforme."
            />
          }
        />

        <Route
          path="documents"
          element={
            <PlaceholderPage
              icon={FolderOpen}
              title="Documents"
              description="Bibliothèque centralisée."
            />
          }
        />

        <Route
          path="rapports"
          element={
            <PlaceholderPage
              icon={FileText}
              title="Rapports"
              description="Tous les rapports de la plateforme."
            />
          }
        />

        <Route
          path="notifications"
          element={
            <PlaceholderPage
              icon={Bell}
              title="Notifications"
              description="Centre de notifications global."
            />
          }
        />
      </Route>

      {/* =========================
          ROUTE PAR DÉFAUT
          ========================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}