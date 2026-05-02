"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GuestOnlyCTA() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const auth = localStorage.getItem("faceAuth");
      setIsAuthenticated(!!auth);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 text-center">
      <div className="glass px-6 py-10 sm:px-10 sm:py-12 md:p-16 rounded-3xl max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative z-10 space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 gradient-text">
            Experience Secure Authentication
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Try our advanced facial recognition technology powered by AI
          </p>
          <Link
            href="/auth"
            className="inline-block w-full sm:w-auto bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg shadow-2xl hover:scale-105 glow"
          >
            Try Face Authentication →
          </Link>
        </div>
      </div>
    </section>
  );
}
