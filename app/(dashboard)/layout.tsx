/**
 * Dashboard Layout
 */
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Note: In Next.js App Router, we can't use hooks directly in Server Components
  // We'll use middleware or client-side checks for auth
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
