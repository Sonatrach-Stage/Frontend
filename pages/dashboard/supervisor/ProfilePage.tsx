import { ProfilePage } from '../shared/ProfilePage'

export default function SupervisorProfilePage() {
  return (
    <ProfilePage
      roleLabel="Encadrant"
      extraFields={[
        { label: 'Poste', key: 'job' },
        { label: 'Département', key: 'department' },
        { label: 'Spécialisation', key: 'specialization' },
        { label: "Années d'expérience", key: 'years_of_experience' },
      ]}
    />
  )
}