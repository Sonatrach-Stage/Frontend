import { apiRequest } from './client';

// ===============================
// INSCRIPTION ADMIN D'ENTREPRISE (secondaire)
// ⚠️ Chemin à confirmer : je suppose '/auth/admin', vérifie dans ton swagger
// ===============================

export async function registerCompanyAdmin(formData: FormData) {
  return apiRequest('/auth/secondary-admin', {
    method: 'POST',
    body: formData,
  });
}

// ===============================
// INSCRIPTION STAGIAIRE
// ===============================

export async function registerIntern(formData: FormData) {
  return apiRequest('/auth/intern', {
    method: 'POST',
    body: formData,
  });
}

// ===============================
// INSCRIPTION ENCADRANT
// ===============================

export async function registerSupervisor(formData: FormData) {
  return apiRequest('/auth/supervisor', {
    method: 'POST',
    body: formData,
  });
}

// ===============================
// VÉRIFIER OTP ET FINALISER L'INSCRIPTION
// ===============================

export async function verifyEmailOtp(email: string, otpCode: string) {
  return apiRequest('/auth/verify-email-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp_code: otpCode }),
  });
}

// ===============================
// RENVOYER UN NOUVEAU OTP (inscription en attente)
// ===============================

export async function resendOtp(email: string) {
  return apiRequest('/auth/resend-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

// ===============================
// VÉRIFIER SI UN EMAIL EXISTE
// ===============================

export async function checkEmail(email: string) {
  return apiRequest('/auth/check-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

// ===============================
// LOGIN
// ===============================

export async function login(email: string, password: string) {
  return apiRequest('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

// ===============================
// RAFRAÎCHIR L'ACCESS TOKEN
// Le refreshToken doit être envoyé en header Authorization: Bearer <refreshToken>
// ===============================

export async function refreshAccessToken(refreshToken: string) {
  return apiRequest('/auth/refresh-token', {
    method: 'POST',
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
}

// ===============================
// DÉCONNEXION
// Le refreshToken doit être envoyé en header Authorization: Bearer <refreshToken>
// ===============================

export async function logout(refreshToken: string) {
  return apiRequest('/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
}

// ===============================
// MOT DE PASSE OUBLIÉ — envoyer OTP de réinitialisation
// ===============================

export async function forgotPassword(email: string) {
  return apiRequest('/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

// ===============================
// MOT DE PASSE OUBLIÉ — vérifier OTP de réinitialisation
// ⚠️ Ici le champ s'appelle "otp", pas "otp_code" (différent de verify-email-otp)
// ===============================

export async function verifyResetOtp(email: string, otp: string) {
  return apiRequest('/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
}

// ===============================
// RÉINITIALISER LE MOT DE PASSE
// Nécessite qu'un OTP ait déjà été vérifié via verify-otp
// ===============================

export async function resetPassword(email: string, password: string, confirmPassword: string) {
  return apiRequest('/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      confirm_password: confirmPassword,
    }),
  });
}