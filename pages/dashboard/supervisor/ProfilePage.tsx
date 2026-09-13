import { ProfilePage } from '../shared/ProfilePage'

export default function SupervisorProfilePage() {
  return (
    <ProfilePage
      roleLabel="Encadrant"
      extraFields={[
        { label: 'Poste', defaultValue: 'Architecte réseau senior' },
        { label: 'Département', defaultValue: 'Infrastructure' },
        { label: 'Spécialisation', defaultValue: 'Réseaux & Cloud hybride' },
      ]}
    />
  )
}