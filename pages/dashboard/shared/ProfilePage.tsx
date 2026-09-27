import { useEffect, useState } from 'react'
import { Camera, Save } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { getCurrentUser } from '../../../lib/auth'
import { changePassword } from '../../../services/auth'
import { getMyProfile, updateMyProfile, type MyProfile } from '../../../services/profile'

type ExtraFieldKey =
  | 'job'
  | 'department'
  | 'specialization'
  | 'years_of_experience'
  | 'sector'
  | 'studies_level'
  | 'establishment'
type ExtraField = { label: string; key: ExtraFieldKey }

export function ProfilePage({ roleLabel, extraFields = [] }: { roleLabel: string; extraFields?: ExtraField[] }) {
  const localUser = getCurrentUser()

  const [profile, setProfile] = useState<MyProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [extraValues, setExtraValues] = useState<Record<string, string>>({})
  const [newPhoto, setNewPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')
  const [pwLoading, setPwLoading] = useState(false)

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        setProfile(res.profile)
        const [first, ...rest] = (res.profile.name ?? '').split(' ')
        setFirstName(first ?? '')
        setLastName(rest.join(' '))
        setPhone(res.profile.phone ?? '')

        const values: Record<string, string> = {}
        extraFields.forEach((field) => {
          const raw = res.profile[field.key]
          if (raw !== undefined && raw !== null) values[field.key] = String(raw)
        })
        setExtraValues(values)
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : 'Erreur de chargement du profil'))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      setSaveError('La photo de profil doit être au format JPG ou PNG.')
      return
    }
    setSaveError('')
    setNewPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  async function handleSaveProfile() {
    setSaveError('')
    setSaveSuccess('')
    setSaving(true)

    try {
      const formData = new FormData()
      formData.append('name', `${firstName} ${lastName}`.trim())
      formData.append('phone', phone)

      extraFields.forEach((field) => {
        const value = extraValues[field.key]
        if (value !== undefined) formData.append(field.key, value)
      })

      if (newPhoto) formData.append('profil_image', newPhoto)

      const res = await updateMyProfile(formData)
      setProfile((current) => (current ? { ...current, ...res.profile } : current))
      setSaveSuccess('Profil modifié avec succès.')
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Erreur lors de la modification du profil')
    } finally {
      setSaving(false)
    }
  }

  async function handleChangePassword() {
    setPwError('')
    setPwSuccess('')

    if (newPassword !== confirmPassword) {
      setPwError('Les mots de passe ne correspondent pas.')
      return
    }

    setPwLoading(true)
    try {
      await changePassword(currentPassword, newPassword, confirmPassword)
      setPwSuccess('Mot de passe modifié avec succès.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setPwError(err instanceof Error ? err.message : 'Erreur lors du changement de mot de passe')
    } finally {
      setPwLoading(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Chargement du profil...</p>
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Profil</h1>
        <p className="mt-2 text-sm text-muted-foreground">Gérez vos informations personnelles et professionnelles.</p>
      </div>

      {loadError && <p className="mb-4 max-w-2xl rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{loadError}</p>}

      <Card className="max-w-2xl rounded-3xl p-8 shadow-retool-sm">
        <div className="flex items-center gap-5">
          <div className="relative">
            {photoPreview ? (
              <img src={photoPreview} alt="Aperçu" className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] text-2xl font-black text-[rgb(var(--intern-navy))]">
                {localUser?.avatarInitials ?? '??'}
              </div>
            )}
            <label
              htmlFor="profile_photo_input"
              className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[rgb(var(--intern-navy))] text-white"
            >
              <Camera className="h-3.5 w-3.5" />
            </label>
            <input id="profile_photo_input" type="file" accept="image/jpeg,image/png" className="hidden" onChange={handlePhotoChange} />
          </div>
          <div>
            <p className="text-lg font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{profile?.name ?? localUser?.name}</p>
            <p className="text-sm text-muted-foreground">
              {roleLabel}{localUser?.companyName ? ` · ${localUser.companyName}` : ''}
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-wide text-muted-foreground">Informations personnelles</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Prénom</label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-10 rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Nom</label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-10 rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">E-mail</label>
            <Input value={profile?.email ?? ''} type="email" disabled className="h-10 rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Téléphone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+213 5 00 00 00 00" className="h-10 rounded-xl" />
          </div>
        </div>

        {extraFields.length > 0 && (
          <>
            <p className="mt-7 text-xs font-bold uppercase tracking-wide text-muted-foreground">Informations professionnelles</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {extraFields.map((field) => (
                <div key={field.key}>
                  <label className="mb-2 block text-sm font-semibold text-foreground">{field.label}</label>
                  <Input
                    value={extraValues[field.key] ?? ''}
                    onChange={(e) => setExtraValues((current) => ({ ...current, [field.key]: e.target.value }))}
                    className="h-10 rounded-xl"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {saveError && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{saveError}</p>}
        {saveSuccess && <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-600">{saveSuccess}</p>}

        <Button disabled={saving} className="mt-7 rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={handleSaveProfile}>
          <Save className="h-4 w-4" />
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>

        <div className="mt-9 border-t pt-7">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Changer le mot de passe</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-foreground">Mot de passe actuel</label>
              <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className="h-10 rounded-xl" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Nouveau mot de passe</label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="h-10 rounded-xl" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Confirmer le mot de passe</label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="h-10 rounded-xl" />
            </div>
          </div>

          {pwError && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{pwError}</p>}
          {pwSuccess && <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-600">{pwSuccess}</p>}

          <Button
            disabled={pwLoading || !currentPassword || !newPassword || !confirmPassword}
            className="mt-4 rounded-xl bg-[rgb(var(--intern-navy))] text-white"
            onClick={handleChangePassword}
          >
            {pwLoading ? 'Modification...' : 'Changer le mot de passe'}
          </Button>
        </div>
      </Card>
    </>
  )
}