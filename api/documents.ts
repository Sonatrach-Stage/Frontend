import { apiRequest } from './client';

export type DocumentStatus = 'PENDING' | 'APPROVED' | 'REVISION_REQUIRED' | 'REJECTED' | null

export type ApiDocument = {
  id: number
  intern_id: number
  task_id: number | null
  title: string
  description?: string
  document_type: string
  status: DocumentStatus
  created_at: string
  updated_at?: string
}

export type PendingDocument = ApiDocument & {
  intern_name: string
  intern_email: string
  version_id: number
  version_number: number
  file_name: string
  file_url: string
  version_created_at: string
}

export type DocumentVersion = {
  id: number
  document_id: number
  version_number: number
  file_name: string
  file_url: string
  uploaded_by: number
  created_at: string
  public_id?: string
  resource_type?: string
}

export type DocumentReview = {
  id: number
  document_id: number
  version_id: number
  supervisor_id: number
  comment: string
  status: string
  created_at: string
}

// --- Stagiaire ---
export async function createDocument(input: {
  title: string
  description: string
  document_type: string
  task_title?: string
}): Promise<{ message: string; document: ApiDocument }> {
  return apiRequest('/documents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

export async function getMyDocuments(): Promise<{ message: string; documents: ApiDocument[] }> {
  return apiRequest('/documents/my');
}

export async function getDocumentDetails(id: number): Promise<{ message: string; document: ApiDocument }> {
  return apiRequest(`/documents/${id}`);
}

export async function updateDocument(id: number, input: Partial<{
  title: string
  description: string
  document_type: string
  task_id: number
}>): Promise<{ message: string; document: ApiDocument }> {
  return apiRequest(`/documents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

export async function deleteDocument(id: number): Promise<{ message: string }> {
  return apiRequest(`/documents/${id}`, { method: 'DELETE' });
}

export async function getDocumentVersions(id: number): Promise<{ message: string; versions: DocumentVersion[] }> {
  return apiRequest(`/documents/${id}/versions`);
}

export async function addDocumentVersion(id: number, file: File): Promise<{ message: string; version: DocumentVersion }> {
  const formData = new FormData();
  formData.append('file', file);
  return apiRequest(`/documents/${id}/versions`, {
    method: 'POST',
    body: formData,
  });
}

export async function getVersionDetails(id: number, versionId: number): Promise<{ message: string; version: DocumentVersion }> {
  return apiRequest(`/documents/${id}/versions/${versionId}`);
}

export async function getDocumentReviews(id: number): Promise<{ message: string; reviews: DocumentReview[] }> {
  return apiRequest(`/documents/${id}/reviews`);
}

// --- Encadrant ---
export async function getPendingDocuments(): Promise<{ message: string; documents: PendingDocument[] }> {
  return apiRequest('/documents/pending');
}

export async function reviewDocument(id: number, input: {
  version_id: number
  status: 'APPROVED' | 'REVISION_REQUIRED' | 'REJECTED'
  comment: string
}): Promise<{ message: string; review: DocumentReview }> {
  return apiRequest(`/documents/${id}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

// --- Commun (stagiaire ou encadrant selon rôle détecté côté serveur) ---
export async function searchDocuments(q: string): Promise<{ message: string; search: string; documents: PendingDocument[] }> {
  return apiRequest(`/documents/search?q=${encodeURIComponent(q)}`);
}