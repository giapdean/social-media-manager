/**
 * Dashboard Page
 */
import { Suspense } from 'react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentPosts } from '@/components/dashboard/RecentPosts';
import { ChannelsList } from '@/components/dashboard/ChannelsList';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your social media activity</p>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <DashboardStats />
      </Suspense>

      <div className="grid lg:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading posts...</div>}>
          <RecentPosts />
        </Suspense>

        <Suspense fallback={<div>Loading channels...</div>}>
          <ChannelsList />
        </Suspense>
      </div>
    </div>
  );
}
