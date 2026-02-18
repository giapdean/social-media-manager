/**
 * Zustand Stores for state management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Channel, Post, Media } from '@/types';

/**
 * Auth Store
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true });
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

/**
 * Channels Store
 */
interface ChannelsState {
  channels: Channel[];
  loading: boolean;
  error: string | null;
  setChannels: (channels: Channel[]) => void;
  addChannel: (channel: Channel) => void;
  removeChannel: (channelId: string) => void;
  updateChannel: (channelId: string, data: Partial<Channel>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChannelsStore = create<ChannelsState>((set) => ({
  channels: [],
  loading: false,
  error: null,
  setChannels: (channels) => set({ channels }),
  addChannel: (channel) => set((state) => ({ channels: [...state.channels, channel] })),
  removeChannel: (channelId) =>
    set((state) => ({ channels: state.channels.filter((c) => c.id !== channelId) })),
  updateChannel: (channelId, data) =>
    set((state) => ({
      channels: state.channels.map((c) => (c.id === channelId ? { ...c, ...data } : c)),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

/**
 * Posts Store
 */
interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  setPosts: (posts: Post[]) => void;
  setCurrentPost: (post: Post | null) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, data: Partial<Post>) => void;
  removePost: (postId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: Partial<PostsState['pagination']>) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  setPosts: (posts) => set({ posts }),
  setCurrentPost: (post) => set({ currentPost: post }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (postId, data) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, ...data } : p)),
      currentPost: state.currentPost?.id === postId ? { ...state.currentPost, ...data } : state.currentPost,
    })),
  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== postId),
      currentPost: state.currentPost?.id === postId ? null : state.currentPost,
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setPagination: (pagination) =>
    set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
}));

/**
 * Media Store
 */
interface MediaState {
  media: Media[];
  loading: boolean;
  error: string | null;
  selectedMedia: string[];
  setMedia: (media: Media[]) => void;
  addMedia: (media: Media) => void;
  removeMedia: (mediaId: string) => void;
  toggleSelected: (mediaId: string) => void;
  clearSelected: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMediaStore = create<MediaState>((set) => ({
  media: [],
  loading: false,
  error: null,
  selectedMedia: [],
  setMedia: (media) => set({ media }),
  addMedia: (media) => set((state) => ({ media: [media, ...state.media] })),
  removeMedia: (mediaId) =>
    set((state) => ({
      media: state.media.filter((m) => m.id !== mediaId),
      selectedMedia: state.selectedMedia.filter((id) => id !== mediaId),
    })),
  toggleSelected: (mediaId) =>
    set((state) => ({
      selectedMedia: state.selectedMedia.includes(mediaId)
        ? state.selectedMedia.filter((id) => id !== mediaId)
        : [...state.selectedMedia, mediaId],
    })),
  clearSelected: () => set({ selectedMedia: [] }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

/**
 * UI Store
 */
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'system',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
