"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("faceAuth");
    const name = localStorage.getItem("userName");
    setIsAuthenticated(!!auth);
    setUserName(name || "User");
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-2xl gradient-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center text-center">
        <div className="space-y-8">
          {isAuthenticated && (
            <div className="glass px-6 py-3 rounded-full inline-block mb-4">
              <p className="text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Welcome back, {userName}!
              </p>
            </div>
          )}
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="gradient-text">Next-Gen</span>
            <br />
            IT Solutions
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            Empowering businesses with cutting-edge technology, AI-powered security, and innovative digital solutions
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/services" 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-blue-500/30 hover:scale-105"
            >
              Explore Services
            </Link>
            <Link 
              href="/contact" 
              className="glass px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-2xl hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-3">Fast & Reliable</h3>
            <p className="text-slate-300">Lightning-fast solutions built with modern technology stack for optimal performance</p>
          </div>
          <div className="glass p-8 rounded-2xl hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-3">Secure by Design</h3>
            <p className="text-slate-300">Enterprise-grade security with AI-powered facial recognition and biometric authentication</p>
          </div>
          <div className="glass p-8 rounded-2xl hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-2xl font-bold mb-3">Innovation First</h3>
            <p className="text-slate-300">Cutting-edge solutions leveraging AI, machine learning, and cloud technologies</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="glass p-12 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">500+</div>
              <div className="text-slate-300">Projects Completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">98%</div>
              <div className="text-slate-300">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-slate-300">Support Available</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">50+</div>
              <div className="text-slate-300">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 text-center">
          <div className="glass p-12 rounded-2xl max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Experience Secure Authentication</h2>
            <p className="text-xl text-slate-300 mb-8">
              Try our advanced facial recognition technology
            </p>
            <Link 
              href="/auth" 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:scale-105"
            >
              Try Face Authentication
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
