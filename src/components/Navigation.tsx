"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Blog<span className="text-[#6366f1]">smith</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-600 hover:text-gray-900 transition text-sm font-medium">
              기능
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition text-sm font-medium">
              가격
            </Link>
            <Link
              href="/generate"
              className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
            >
              무료로 시작하기
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link href="/#features" className="block text-gray-600 hover:text-gray-900 text-sm font-medium" onClick={() => setMobileOpen(false)}>
            기능
          </Link>
          <Link href="/pricing" className="block text-gray-600 hover:text-gray-900 text-sm font-medium" onClick={() => setMobileOpen(false)}>
            가격
          </Link>
          <Link
            href="/generate"
            className="block text-center bg-[#6366f1] hover:bg-[#4f46e5] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
            onClick={() => setMobileOpen(false)}
          >
            무료로 시작하기
          </Link>
        </div>
      )}
    </nav>
  );
}
