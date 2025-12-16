export default function ServicesPage() {
  const services = [
    {
      title: "Custom Software Development",
      description: "Tailored software solutions built from scratch to meet your unique business requirements",
      icon: "💻",
      features: ["Web Applications", "Mobile Apps", "Desktop Software"],
      color: "blue"
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence and machine learning algorithms",
      icon: "🤖",
      features: ["Facial Recognition", "Predictive Analytics", "Natural Language Processing"],
      color: "purple"
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable and secure cloud solutions for modern businesses",
      icon: "☁️",
      features: ["AWS/Azure/GCP", "DevOps & CI/CD", "Microservices Architecture"],
      color: "cyan"
    },
    {
      title: "Enterprise Solutions",
      description: "Comprehensive enterprise software for large-scale operations",
      icon: "🏢",
      features: ["ERP Systems", "CRM Solutions", "Business Intelligence"],
      color: "green"
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      icon: "📱",
      features: ["React Native", "Flutter", "Native iOS/Android"],
      color: "pink"
    },
    {
      title: "Web Development",
      description: "Modern, responsive websites and web applications",
      icon: "🌐",
      features: ["React/Next.js", "E-commerce", "Progressive Web Apps"],
      color: "orange"
    },
    {
      title: "Cybersecurity",
      description: "Protect your digital assets with enterprise-grade security solutions",
      icon: "🔐",
      features: ["Penetration Testing", "Security Audits", "Compliance Management"],
      color: "blue"
    },
    {
      title: "Data Analytics",
      description: "Transform data into actionable insights with advanced analytics",
      icon: "📊",
      features: ["Big Data Processing", "Real-time Analytics", "Data Visualization"],
      color: "purple"
    },
    {
      title: "IT Consulting",
      description: "Strategic technology consulting to drive digital transformation",
      icon: "💡",
      features: ["Technology Strategy", "Digital Transformation", "Architecture Design"],
      color: "green"
    }
  ];

  const colorMap: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
    cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30"
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Our Services</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Comprehensive IT solutions tailored to your business needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`bg-gradient-to-br ${colorMap[service.color]} border rounded-2xl p-8 hover:scale-105 hover:shadow-2xl backdrop-blur-sm`}
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
            <p className="text-slate-300 mb-6">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-400">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 glass p-12 rounded-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Need a Custom Solution?</h2>
        <p className="text-slate-300 text-lg mb-6">
          We specialize in creating tailored solutions for unique business requirements
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold shadow-lg shadow-blue-500/30"
        >
          Contact Our Team
        </a>
      </div>
    </div>
  );
}
