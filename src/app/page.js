import Link from "next/link";
import { CheckCircle, Shield, Layout, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-12 md:mt-24">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Manage your team's tasks <br className="hidden md:block" />
          <span className="text-blue-600">with absolute clarity.</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          A powerful, role-based Visual board designed for speed. Assign tasks, track progress, and hit your deadlines without the clutter.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/dashboard" 
            className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
          >
            Go to Dashboard <ArrowRight size={20} />
          </Link>
          <Link 
            href="/login" 
            className="flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
          >
            Log In / Sign Up
          </Link>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Role-Based Access</h3>
            <p className="text-gray-600 leading-relaxed">
              Strict Admin and Member roles. Admins create projects and assign tasks, while Members focus on execution and status updates.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6">
              <Layout size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Visual Boards</h3>
            <p className="text-gray-600 leading-relaxed">
              Instantly see what needs to be done. Move tasks effortlessly from Pending to In Progress, and finally to Completed.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
              <CheckCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Database-backed persistence means your entire team is always looking at the exact same, up-to-date project reality.
            </p>
          </div>

        </div>
      </section>

      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <p>© {2026} Team Task Manager. Built for efficiency.</p>
      </footer>
    </div>
  );
}