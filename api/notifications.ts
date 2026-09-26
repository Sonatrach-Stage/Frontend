import { apiRequest } from './client';

export type NotificationType = 'TASK' | 'DOCUMENT' | 'APPOINTMENT' | string

export type ApiNotification = {
  id: number
  user_id: number
  title: string
  message: string
  type: NotificationType
  is_read: boolean
  created_at: string
}

export async function getMyNotifications(): Promise<{ success: boolean; notifications: ApiNotification[] }> {
  return apiRequest('/notifications');
}

export async function getUnreadNotifications(): Promise<{ success: boolean; notifications: ApiNotification[] }> {
  return apiRequest('/notifications/unread');
}

export async function getUnreadCount(): Promise<{ success: boolean; count: number }> {
  return apiRequest('/notifications/unread/count');
}

export async function markAllAsRead(): Promise<{ success: boolean; message: string; notifications: ApiNotification[] }> {
  return apiRequest('/notifications/read-all', { method: 'PATCH' });
}

export async function markAsRead(notificationId: number): Promise<{ success: boolean; message: string; notification: ApiNotification }> {
  return apiRequest(`/notifications/${notificationId}/read`, { method: 'PATCH' });
}

export async function deleteNotification(notificationId: number): Promise<{ success: boolean; message: string }> {
  return apiRequest(`/notifications/${notificationId}`, { method: 'DELETE' });
}