import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './appTheme.css'
import LoginPage from './pages/LoginPage'
import SignupRolePage from './pages/SignupRolePage'
import SignupInformationPage from './pages/SignupInformationPage'
import SignupCompanyPage from './pages/SignupCompanyPage'
import SignupSupervisorPage from './pages/SignupSupervisorPage'
import SignupRequestPage from './pages/SignupRequestPage'
import AdminSignupPage from './pages/AdminSignupPage'
import DashboardPage from './pages/DashboardPage'
import type { SignupDraft } from './pages/data/internPilotData'

export default function App() {
  const [signupDraft, setSignupDraft] = useState<SignupDraft>({
  role: null,
  internType: 'PFE',
  selectedCompanyId: null,
  selectedSupervisorId: null,

  // Informations stagiaire
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

  // Informations encadrant
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
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupRolePage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route
        path="/signup/information"
        element={<SignupInformationPage draft={signupDraft} updateDraft={updateSignupDraft} />}
      />
      <Route path="/signup/company" element={<SignupCompanyPage draft={signupDraft} updateDraft={updateSignupDraft} />} />
      <Route
        path="/signup/supervisor"
        element={<SignupSupervisorPage draft={signupDraft} updateDraft={updateSignupDraft} />}
      />
      <Route path="/signup/admin" element={<AdminSignupPage />} />
      <Route path="/signup/request" element={<SignupRequestPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
