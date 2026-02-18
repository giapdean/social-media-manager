/**
 * Dashboard Stats Cards
 */
'use client';

import { useEffect, useState } from 'react';
import { analyticsApi } from '@/lib/api';
import { BarChart3, Calendar, Send, FileText } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && <p className="text-sm text-green-600 mt-1">{trend}</p>}
        </div>
        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  const [stats, setStats] = useState({
    total_posts: 0,
    scheduled_posts: 0,
    published_posts: 0,
    draft_posts: 0,
    total_channels: 0,
    total_followers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await analyticsApi.dashboard(30);
        setStats(data.overview);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-28 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Posts"
        value={stats.total_posts}
        icon={<FileText className="w-6 h-6" />}
      />
      <StatCard
        title="Scheduled"
        value={stats.scheduled_posts}
        icon={<Calendar className="w-6 h-6" />}
      />
      <StatCard
        title="Published"
        value={stats.published_posts}
        icon={<Send className="w-6 h-6" />}
      />
      <StatCard
        title="Total Followers"
        value={stats.total_followers.toLocaleString()}
        icon={<BarChart3 className="w-6 h-6" />}
      />
    </div>
  );
}
