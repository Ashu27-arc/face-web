export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">About Us</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Leading IT software development company delivering innovative solutions since 2020
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="glass p-10 rounded-2xl">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Our Mission</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            To empower businesses worldwide with innovative software solutions that drive growth, efficiency, and digital transformation. We deliver cutting-edge technology that solves real-world problems and creates lasting value.
          </p>
        </div>

        <div className="glass p-10 rounded-2xl">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Our Vision</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            To be the most trusted technology partner for businesses seeking digital excellence. We envision a future where innovative software solutions enable every organization to reach its full potential.
          </p>
        </div>
      </div>

      <div className="glass p-10 rounded-2xl mb-16">
        <div className="text-5xl mb-4">💻</div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">Our Expertise</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          We specialize in modern technology stacks and methodologies to deliver robust, scalable, and maintainable software solutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20">
            <h3 className="text-xl font-bold mb-2 text-blue-400">Full-Stack Development</h3>
            <p className="text-slate-400">React, Next.js, Node.js, Python, .NET</p>
          </div>
          <div className="bg-purple-500/10 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-xl font-bold mb-2 text-purple-400">Cloud & DevOps</h3>
            <p className="text-slate-400">AWS, Azure, Docker, Kubernetes, CI/CD</p>
          </div>
          <div className="bg-pink-500/10 p-6 rounded-xl border border-pink-500/20">
            <h3 className="text-xl font-bold mb-2 text-pink-400">AI & Data Science</h3>
            <p className="text-slate-400">TensorFlow, PyTorch, Machine Learning</p>
          </div>
        </div>
      </div>

      <div className="text-center glass p-12 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 gradient-text">Our Team</h2>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-8">
          50+ talented professionals including software engineers, architects, designers, and project managers with expertise across multiple domains and technologies.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">15+</div>
            <div className="text-slate-400">Senior Developers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">10+</div>
            <div className="text-slate-400">AI Specialists</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">8+</div>
            <div className="text-slate-400">Cloud Architects</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">12+</div>
            <div className="text-slate-400">UI/UX Designers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
