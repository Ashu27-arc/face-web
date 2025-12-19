export default function ProjectsPage() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Built a scalable e-commerce platform handling 100K+ daily transactions with real-time inventory management and AI-powered recommendations",
      status: "Completed",
      year: "2024",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
      impact: "300% revenue increase"
    },
    {
      title: "Healthcare Management System",
      description: "Comprehensive hospital management system with patient records, appointment scheduling, and telemedicine capabilities",
      status: "Completed",
      year: "2024",
      tech: ["React", "Python", "MongoDB", "WebRTC"],
      impact: "Serving 50+ hospitals"
    },
    {
      title: "AI-Powered Face Recognition",
      description: "Enterprise security system with facial recognition, real-time authentication, and advanced biometric features",
      status: "In Progress",
      year: "2024",
      tech: ["TensorFlow", "Next.js", "AWS", "Computer Vision"],
      impact: "99.9% accuracy rate"
    },
    {
      title: "Financial Analytics Dashboard",
      description: "Real-time financial analytics platform with predictive modeling and automated reporting for investment firms",
      status: "Completed",
      year: "2023",
      tech: ["React", "Python", "Apache Kafka", "ML"],
      impact: "$10M+ managed assets"
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication, instant transfers, and investment features",
      status: "Completed",
      year: "2023",
      tech: ["React Native", "Node.js", "Blockchain"],
      impact: "500K+ active users"
    },
    {
      title: "Supply Chain Management",
      description: "End-to-end supply chain solution with IoT integration, real-time tracking, and predictive analytics",
      status: "In Progress",
      year: "2024",
      tech: ["IoT", "Cloud", "AI", "Blockchain"],
      impact: "40% efficiency gain"
    },
    {
      title: "Educational Learning Platform",
      description: "Interactive online learning platform with live classes, AI tutoring, and progress tracking",
      status: "Completed",
      year: "2023",
      tech: ["Next.js", "WebRTC", "AI", "Cloud"],
      impact: "100K+ students enrolled"
    },
    {
      title: "Restaurant Management System",
      description: "Complete restaurant POS system with inventory, staff management, and customer loyalty programs",
      status: "Completed",
      year: "2023",
      tech: ["React", "Node.js", "PostgreSQL"],
      impact: "200+ restaurants using"
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
          className="inline-block bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold shadow-lg"
        >
          Let's Talk
        </a>
      </div>
    </div>
  );
}
