/**
 * Landing Page
 */
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="p-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600">Social Media Manager</div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Manage All Your Social Media in One Place
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule posts, analyze performance, and engage with your audience across
            Facebook, TikTok, YouTube, Instagram, Zalo, Pinterest, and Threads.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/#features"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white font-medium text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Platform Icons */}
        <div className="mt-16 flex justify-center gap-8 text-gray-400">
          <span className="text-3xl">📘</span>
          <span className="text-3xl">🎵</span>
          <span className="text-3xl">▶️</span>
          <span className="text-3xl">📷</span>
          <span className="text-3xl">💬</span>
          <span className="text-3xl">📌</span>
          <span className="text-3xl">🧵</span>
        </div>

        {/* Features */}
        <div id="features" className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create & Schedule</h3>
            <p className="text-gray-600">
              Create posts once and publish to multiple platforms. Schedule posts in
              advance and let our system handle the rest.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Track your performance across all platforms with detailed analytics
              and beautiful reports.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
              Work together with your team. Set roles, approve content, and manage
              permissions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
