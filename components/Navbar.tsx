"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check auth status
    const checkAuth = () => {
      const auth = localStorage.getItem("faceAuth");
      setIsAuthenticated(!!auth);
    };
    
    checkAuth();

    // Listen for storage changes (for cross-tab sync)
    window.addEventListener("storage", checkAuth);
    
    // Listen for custom auth event (for same-tab updates)
    window.addEventListener("authStateChanged", checkAuth);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authStateChanged", checkAuth);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("faceAuth");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    
    // Trigger custom event for auth state change
    window.dispatchEvent(new Event("authStateChanged"));
    
    router.push("/auth");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
          TechVision IT
        </Link>
        
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-slate-200 hover:text-blue-400 font-medium">Home</Link>
          <Link href="/about" className="text-slate-200 hover:text-blue-400 font-medium">About</Link>
          <Link href="/services" className="text-slate-200 hover:text-blue-400 font-medium">Services</Link>
          <Link href="/projects" className="text-slate-200 hover:text-blue-400 font-medium">Projects</Link>
          <Link href="/contact" className="text-slate-200 hover:text-blue-400 font-medium">Contact</Link>
          {isAuthenticated && (
            <Link href="/admin" className="text-slate-200 hover:text-blue-400 font-medium">Admin</Link>
          )}
        </div>
        
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-green-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Authenticated
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-5 py-2 rounded-lg font-medium border border-red-500/30"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium shadow-lg shadow-blue-500/30"
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-lg font-medium shadow-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
