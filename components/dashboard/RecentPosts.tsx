/**
 * Recent Posts List
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePostsStore } from '@/lib/store';
import { postsApi } from '@/lib/api';
import { formatDate, getPlatformInfo } from '@/lib/utils';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export function RecentPosts() {
  const { posts, setPosts } = usePostsStore();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await postsApi.list({ limit: 5 });
        setPosts(data.data);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, [setPosts]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Recent Posts</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No posts yet</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getStatusIcon(post.status)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {post.scheduled_at
                        ? formatDate(post.scheduled_at)
                        : formatDate(post.created_at)}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{post.channel_ids.length} channels</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
