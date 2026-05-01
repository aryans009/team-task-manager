"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={session ? "/dashboard" : "/"} className="text-xl font-bold tracking-wide">
          Team Task Manager
        </Link>

        <div>
          {status === "loading" ? (
            <span className="text-gray-400 text-sm">Loading...</span>
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                Hi, {session.user.name} <span className="bg-gray-700 px-2 py-1 rounded text-xs ml-1">{session.user.role}</span>
              </span>
              <button 
                onClick={() => signOut({ callbackUrl: '/login' })} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition">
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}