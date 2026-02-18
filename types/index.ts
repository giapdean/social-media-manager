/**
 * Type definitions for Social Media Manager
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  avatar_url?: string;
  created_at: number;
  last_login_at: number;
  is_active: boolean;
  token?: string;
}

// Channel types
export type Platform = 'facebook' | 'tiktok' | 'youtube' | 'instagram' | 'zalo' | 'pinterest' | 'threads';

export interface Channel {
  id: string;
  user_id: string;
  platform: Platform;
  channel_name: string;
  channel_id: string;
  profile_url?: string;
  avatar_url?: string;
  follower_count?: number;
  is_connected: boolean;
  connected_at: number;
  last_synced_at: number;
  settings?: string;
}

// Post types
export type PostStatus = 'draft' | 'scheduled' | 'publishing' | 'published' | 'failed';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  media_ids: string[];
  channel_ids: string[];
  scheduled_at: number | null;
  published_at: number | null;
  status: PostStatus;
  platform_status: Record<string, { status: string; post_id?: string; error?: string }>;
  created_at: number;
  updated_at: number;
  created_by: string;
  tags: string[];
  metadata: Record<string, any>;
  trigger_id?: string;
}

export interface CreatePostDto {
  content: string;
  media_ids?: string[];
  channel_ids: string[];
  scheduled_at?: number;
  tags?: string[];
  metadata?: Record<string, any>;
  publish_immediately?: boolean;
}

// Media types
export interface Media {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  file_type: 'image' | 'video';
  mime_type: string;
  file_size: number;
  width: number;
  height: number;
  duration: number;
  folder_id: string;
  so9_media_id: string;
  uploaded_at: number;
}

// Analytics types
export interface AnalyticsDashboard {
  overview: {
    total_posts: number;
    scheduled_posts: number;
    published_posts: number;
    draft_posts: number;
    total_channels: number;
    total_followers: number;
    total_engagement: number;
  };
  channels: Channel[];
  recent_posts: Post[];
}

export interface PostAnalytics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  clicks?: number;
  reach?: number;
  impressions?: number;
}

// Comment types
export interface Comment {
  id: string;
  post_id: string;
  channel_id: string;
  platform_comment_id: string;
  author_name: string;
  author_avatar: string;
  content: string;
  created_at: number;
  is_replied: boolean;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// API response types
export interface ApiResponse<T = any> {
  status: number;
  data: T;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  avatar_url?: string;
}

// Calendar types
export interface CalendarData {
  [date: string]: Post[];
}

// Error types
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
