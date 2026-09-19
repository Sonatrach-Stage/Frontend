import { apiRequest } from './client';

export async function deleteMessage(messageId: number) {
  return apiRequest(`/messages/${messageId}`, {
    method: 'DELETE',
  });
}