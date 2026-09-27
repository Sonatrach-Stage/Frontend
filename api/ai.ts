import { apiRequest } from './client';

export type AISource = { document_id: number; title: string; excerpt: string }

export type AIConversation = {
  id: number
  user_id?: number
  title: string
  created_at: string
  updated_at?: string
}

export type AIMessage = {
  id: number
  conversation_id: number
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export async function askAI(question: string, conversationId?: number): Promise<{
  conversation: { id: number; title: string }
  answer: string
  sources: AISource[]
}> {
  return apiRequest('/ai/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, ...(conversationId ? { conversationId } : {}) }),
  });
}

export async function getDocumentSummary(id: number): Promise<{
  documentId: number
  title: string
  summary: string
  keyPoints: string[]
}> {
  return apiRequest(`/ai/documents/${id}/summary`, { method: 'POST' });
}

export async function getSimilarDocuments(id: number): Promise<{
  documentId: number
  similarProjects: { document_id: number; title: string; similarity_score: number }[]
}> {
  return apiRequest(`/ai/documents/${id}/similar`);
}

export async function compareDocuments(documentId1: number, documentId2: number): Promise<{
  document1: { id: number; title: string }
  document2: { id: number; title: string }
  comparison: string
  similarities: string[]
  differences: string[]
}> {
  return apiRequest('/ai/documents/compare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentId1, documentId2 }),
  });
}

export async function getMyAIConversations(): Promise<{ conversations: AIConversation[] }> {
  return apiRequest('/ai/conversations');
}

export async function getAIConversation(id: number): Promise<{ conversation: AIConversation; messages: AIMessage[] }> {
  return apiRequest(`/ai/conversations/${id}`);
}

export async function deleteAIConversation(id: number): Promise<{ message: string }> {
  return apiRequest(`/ai/conversations/${id}`, { method: 'DELETE' });
}