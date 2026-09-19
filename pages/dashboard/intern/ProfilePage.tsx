import { ProfilePage } from '../shared/ProfilePage'

export default function InternProfilePage() {
  return (
    <ProfilePage
      roleLabel="Stagiaire"
      extraFields={[
        { label: 'Secteur', key: 'sector' },
        { label: "Niveau d'études", key: 'studies_level' },
        { label: 'Établissement', key: 'establishment' },
      ]}
    />
  )
}