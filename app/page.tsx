import Link from "next/link";
import AuthWelcomeBadge from "@/components/AuthWelcomeBadge";
import GuestOnlyCTA from "@/components/GuestOnlyCTA";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center justify-center text-center relative">
        <div className="space-y-8 animate-float">
          <AuthWelcomeBadge />
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="gradient-text">Next-Gen</span>
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              IT Solutions
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Transform your business with custom software development, AI solutions, cloud infrastructure, and enterprise applications
          </p>
          <div className="flex gap-4 justify-center flex-wrap pt-4">
            <Link 
              href="/services" 
              className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-10 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/40 hover:scale-105 hover:shadow-blue-500/60 glow"
            >
              Explore Services
            </Link>
            <Link 
              href="/contact" 
              className="glass px-10 py-4 rounded-xl font-semibold text-lg hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 gradient-text">Why Choose Us</h2>
          <p className="text-slate-400 text-lg">Experience excellence in every aspect</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-10 rounded-3xl hover:scale-105 card-hover group">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🚀</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Fast & Reliable</h3>
            <p className="text-slate-300 leading-relaxed">Lightning-fast solutions built with modern technology stack for optimal performance</p>
          </div>
          <div className="glass p-10 rounded-3xl hover:scale-105 card-hover group">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🔒</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Secure by Design</h3>
            <p className="text-slate-300 leading-relaxed">Enterprise-grade security with AI-powered facial recognition and biometric authentication</p>
          </div>
          <div className="glass p-10 rounded-3xl hover:scale-105 card-hover group">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">💡</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Innovation First</h3>
            <p className="text-slate-300 leading-relaxed">Cutting-edge solutions leveraging AI, machine learning, and cloud technologies</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="glass px-6 py-10 sm:px-10 sm:py-12 md:p-16 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600/5 to-purple-600/5"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 text-center relative z-10">
            <div className="space-y-1 sm:space-y-2">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-1 sm:mb-3">500+</div>
              <div className="text-slate-300 text-base sm:text-lg font-medium">Projects Completed</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-1 sm:mb-3">98%</div>
              <div className="text-slate-300 text-base sm:text-lg font-medium">Client Satisfaction</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-1 sm:mb-3">24/7</div>
              <div className="text-slate-300 text-base sm:text-lg font-medium">Support Available</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-1 sm:mb-3">50+</div>
              <div className="text-slate-300 text-base sm:text-lg font-medium">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <GuestOnlyCTA />
    </div>
  );
}
