export default function ProjectsPage() {
  const projects = [
    {
      title: "Enterprise Security System",
      description: "Implemented comprehensive facial recognition system for a Fortune 500 company, processing over 10,000 daily authentications with 99.9% accuracy",
      status: "Completed",
      year: "2024",
      tech: ["AI/ML", "Cloud", "Real-time Processing"],
      impact: "50% reduction in security incidents"
    },
    {
      title: "Smart Building Access",
      description: "Biometric access control system for modern office buildings with touchless entry and real-time monitoring",
      status: "In Progress",
      year: "2024",
      tech: ["IoT", "Biometrics", "Mobile App"],
      impact: "Serving 5,000+ employees"
    },
    {
      title: "Mobile Authentication App",
      description: "Cross-platform mobile application with advanced face authentication and multi-factor security",
      status: "Completed",
      year: "2023",
      tech: ["React Native", "TensorFlow", "AWS"],
      impact: "1M+ downloads"
    },
    {
      title: "Banking Security Platform",
      description: "Secure authentication platform for digital banking with fraud detection and compliance features",
      status: "Completed",
      year: "2023",
      tech: ["Blockchain", "AI", "Encryption"],
      impact: "Zero security breaches"
    },
    {
      title: "Healthcare Identity System",
      description: "HIPAA-compliant identity verification system for healthcare providers and patients",
      status: "Completed",
      year: "2023",
      tech: ["Privacy-first AI", "Secure Cloud", "APIs"],
      impact: "100K+ patients verified"
    },
    {
      title: "Retail Analytics Dashboard",
      description: "AI-powered analytics platform for retail customer insights and behavior tracking",
      status: "In Progress",
      year: "2024",
      tech: ["Computer Vision", "Analytics", "Dashboard"],
      impact: "30% increase in conversions"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Our Projects</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Delivering excellence across industries with innovative solutions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="glass p-8 rounded-2xl hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                project.status === "Completed" 
                  ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              }`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg text-sm border border-purple-500/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-700">
              <span className="text-slate-400 text-sm">Year: {project.year}</span>
              <span className="text-blue-400 font-medium text-sm">{project.impact}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 glass p-12 rounded-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Start Your Project</h2>
        <p className="text-slate-300 text-lg mb-6">
          Ready to transform your business with cutting-edge technology?
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold shadow-lg"
        >
          Let's Talk
        </a>
      </div>
    </div>
  );
}
