import { apiRequest } from './client'

export async function registerCompanyAdmin(formData: FormData) {
  return apiRequest('/auth/secondary-admin', {
    method: 'POST',
    body: formData,
  })
}

export async function registerIntern(formData: FormData) {
  return apiRequest('/auth/intern', {
    method: 'POST',
    body: formData,
  })
}

export async function registerSupervisor(formData: FormData) {
  return apiRequest('/auth/supervisor', {
    method: 'POST',
    body: formData,
  })
}

export async function verifyEmailOtp(email: string, otpCode: string) {
  return apiRequest('/auth/verify-email-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      otp_code: otpCode,
    }),
  })
}

export async function resendOtp(email: string) {
  return apiRequest('/auth/resend-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

export async function checkEmail(email: string) {
  return apiRequest('/auth/check-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

export async function login(email: string, password: string) {
  return apiRequest('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

export async function refreshAccessToken(refreshToken: string) {
  return apiRequest('/auth/refresh-token', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
}

export async function logout(refreshToken: string) {
  return apiRequest('/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
}

export async function forgotPassword(email: string) {
  return apiRequest('/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

export async function verifyResetOtp(email: string, otp: string) {
  return apiRequest('/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      otp,
    }),
  })
}

export async function resetPassword(
  email: string,
  password: string,
  confirmPassword: string
) {
  return apiRequest('/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      confirm_password: confirmPassword,
    }),
  })
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  return apiRequest('/auth/change-password', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }),
  })
}