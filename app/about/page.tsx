export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">About TechVision</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Pioneering the future of technology with innovative solutions and cutting-edge expertise
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="glass p-10 rounded-2xl">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Our Mission</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            To provide secure, reliable, and user-friendly authentication solutions that protect digital identities while ensuring seamless user experiences. We believe in making advanced technology accessible to everyone.
          </p>
        </div>

        <div className="glass p-10 rounded-2xl">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Our Vision</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            To become the global leader in AI-powered security solutions, transforming how businesses and individuals interact with technology through innovation and excellence.
          </p>
        </div>
      </div>

      <div className="glass p-10 rounded-2xl mb-16">
        <div className="text-5xl mb-4">💻</div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">Our Technology</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          We leverage advanced AI and machine learning algorithms to deliver state-of-the-art facial recognition technology that is both accurate and privacy-focused.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20">
            <h3 className="text-xl font-bold mb-2 text-blue-400">AI & Machine Learning</h3>
            <p className="text-slate-400">Advanced neural networks for accurate recognition</p>
          </div>
          <div className="bg-purple-500/10 p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-xl font-bold mb-2 text-purple-400">Cloud Infrastructure</h3>
            <p className="text-slate-400">Scalable and reliable cloud-based solutions</p>
          </div>
          <div className="bg-pink-500/10 p-6 rounded-xl border border-pink-500/20">
            <h3 className="text-xl font-bold mb-2 text-pink-400">Privacy First</h3>
            <p className="text-slate-400">End-to-end encryption and data protection</p>
          </div>
        </div>
      </div>

      <div className="text-center glass p-12 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 gradient-text">Our Team</h2>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto">
          A diverse group of engineers, designers, and innovators passionate about creating technology that makes a difference. With decades of combined experience, we're committed to delivering excellence in every project.
        </p>
      </div>
    </div>
  );
}
