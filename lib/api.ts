/**
 * API Client for communicating with GAS Backend
 */

import type {
  ApiResponse,
  User,
  Channel,
  Post,
  CreatePostDto,
  Media,
  AnalyticsDashboard,
  PostAnalytics,
  Comment,
  PaginatedResponse,
  CalendarData,
  LoginCredentials,
  RegisterData,
}
from '@/types';
import { ApiError } from '@/types';

const GAS_API_URL = process.env.NEXT_PUBLIC_GAS_API_URL || '';

/**
 * Make API request to GAS backend
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${GAS_API_URL}?path=${encodeURIComponent(endpoint)}`;

  // Get token from localStorage
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('auth_token');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // Handle GAS JSONP-like response
  const text = await response.text();
  let data: ApiResponse<T>;

  try {
    // GAS might wrap in different format
    const parsed = JSON.parse(text.replace(/^[\w\s]*\(|\)[\w\s]*$/g, ''));
    data = parsed;
  } catch {
    throw new ApiError(500, 'Invalid response from server');
  }

  if (data.status >= 400) {
    throw new ApiError(data.status, (data.data as any).error || 'Request failed');
  }

  return data.data;
}

/**
 * Auth API
 */
export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiRequest<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (data: RegisterData) =>
    apiRequest<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiRequest<{ message: string }>('/auth/logout', {
      method: 'POST',
    }),

  getMe: () =>
    apiRequest<User>('/auth/me'),
};

/**
 * Channels API
 */
export const channelsApi = {
  list: () =>
    apiRequest<Channel[]>('/channels'),

  connect: (platform: string) =>
    apiRequest<{ auth_url: string; state: string; platform: string }>('/channels/connect', {
      method: 'POST',
      body: JSON.stringify({ platform }),
    }),

  disconnect: (channelId: string) =>
    apiRequest<{ message: string }>(`/channels/${channelId}`, {
      method: 'DELETE',
    }),

  getBoards: (channelId: string) =>
    apiRequest<any>(`/channels/${channelId}/boards`),

  sync: (channelId: string) =>
    apiRequest<Channel>(`/channels/${channelId}/sync`, {
      method: 'POST',
    }),
};

/**
 * Posts API
 */
export const postsApi = {
  list: (params?: { page?: number; limit?: number; status?: string }) =>
    apiRequest<PaginatedResponse<Post>>('/posts', {
      method: 'GET',
      body: JSON.stringify(params || {}),
    }),

  get: (postId: string) =>
    apiRequest<Post>(`/posts/${postId}`),

  create: (data: CreatePostDto) =>
    apiRequest<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (postId: string, data: Partial<CreatePostDto>) =>
    apiRequest<Post>(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (postId: string) =>
    apiRequest<{ message: string }>(`/posts/${postId}`, {
      method: 'DELETE',
    }),

  publish: (postId: string) =>
    apiRequest<Post>(`/posts/${postId}/publish`, {
      method: 'POST',
    }),

  schedule: (postId: string, scheduledAt: number) =>
    apiRequest<Post>(`/posts/${postId}/schedule`, {
      method: 'POST',
      body: JSON.stringify({ scheduled_at: scheduledAt }),
    }),

  bulkUpload: (csv: string) =>
    apiRequest<{ created: Post[]; errors: Array<{ row: number; error: string }> }>('/posts/bulk', {
      method: 'POST',
      body: JSON.stringify({ csv }),
    }),

  calendar: (startDate: number, endDate: number) =>
    apiRequest<CalendarData>('/posts/calendar', {
      method: 'GET',
      body: JSON.stringify({ start_date: startDate, end_date: endDate }),
    }),
};

/**
 * Media API
 */
export const mediaApi = {
  list: () =>
    apiRequest<Media[]>('/media'),

  upload: (fileName: string, base64Data: string, mimeType: string) =>
    apiRequest<Media>('/media/upload', {
      method: 'POST',
      body: JSON.stringify({
        file_name: fileName,
        base64_data: base64Data,
        mime_type: mimeType,
      }),
    }),

  get: (mediaId: string) =>
    apiRequest<Media>(`/media/${mediaId}`),

  delete: (mediaId: string) =>
    apiRequest<{ message: string }>(`/media/${mediaId}`, {
      method: 'DELETE',
    }),

  uploadToSO9: (mediaId: string) =>
    apiRequest<Media>(`/media/${mediaId}/so9`, {
      method: 'POST',
    }),
};

/**
 * Analytics API
 */
export const analyticsApi = {
  dashboard: (days: number = 30) =>
    apiRequest<AnalyticsDashboard>('/analytics/dashboard', {
      method: 'GET',
      body: JSON.stringify({ days }),
    }),

  postAnalytics: (postId: string) =>
    apiRequest<PostAnalytics>(`/analytics/post/${postId}`),

  channelAnalytics: (channelId: string) =>
    apiRequest<PostAnalytics>(`/analytics/channel/${channelId}`),

  export: (startDate: number, endDate: number, format: 'json' | 'csv' = 'json') =>
    apiRequest<any>('/analytics/export', {
      method: 'GET',
      body: JSON.stringify({ start_date: startDate, end_date: endDate, format }),
    }),
};

/**
 * Comments API
 */
export const commentsApi = {
  list: (params?: { post_id?: string; channel_id?: string }) =>
    apiRequest<Comment[]>('/comments', {
      method: 'GET',
      body: JSON.stringify(params || {}),
    }),

  getByPost: (postId: string) =>
    apiRequest<Comment[]>(`/comments/post/${postId}`),

  reply: (commentId: string, text: string) =>
    apiRequest<{ message: string }>(`/comments/${commentId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),

  delete: (commentId: string) =>
    apiRequest<{ message: string }>(`/comments/${commentId}`, {
      method: 'DELETE',
    }),
};

/**
 * Users API
 */
export const usersApi = {
  list: () =>
    apiRequest<User[]>('/users'),

  get: (userId: string) =>
    apiRequest<User>(`/users/${userId}`),

  update: (userId: string, data: Partial<User>) =>
    apiRequest<User>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (userId: string) =>
    apiRequest<{ message: string }>(`/users/${userId}`, {
      method: 'DELETE',
    }),

  updateRole: (userId: string, role: string) =>
    apiRequest<User>(`/users/${userId}/role`, {
      method: 'POST',
      body: JSON.stringify({ role }),
    }),
};

/**
 * Settings API
 */
export const settingsApi = {
  get: () =>
    apiRequest<any>('/settings'),

  update: (data: Record<string, any>) =>
    apiRequest<{ message: string; settings: Record<string, any> }>('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
