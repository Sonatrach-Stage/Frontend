import { apiRequest } from './client';

export type Conversation = {
  id: number
  supervisor_id: number
  intern_id: number
  created_at: string
}

export type ChatMessage = {
  id: number
  conversation_id: number
  sender_id: number
  content: string
  is_read: boolean
  created_at: string
}

export async function getOrCreateConversation(userName: string): Promise<{ message: string; conversation: Conversation }> {
  return apiRequest('/chat/conversations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_name: userName }),
  });
}

export async function getMyConversations(): Promise<{ conversations: Conversation[] }> {
  return apiRequest('/chat/conversations');
}

export async function getConversationMessages(conversationId: number): Promise<{
  conversation: Conversation & { supervisor_user_id: number; intern_user_id: number }
  messages: ChatMessage[]
}> {
  return apiRequest(`/chat/conversations/${conversationId}/messages`);
}

export async function editMessage(messageId: number, content: string) {
  return apiRequest(`/chat/messages/${messageId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
}

export async function deleteMessage(messageId: number) {
  return apiRequest(`/chat/messages/${messageId}`, {
    method: 'DELETE',
  });
}