"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FaceRegister from "@/components/FaceRegister";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(formData));
    setStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Create Account</h1>
        <p className="text-xl text-slate-300">
          Register with facial recognition for secure access
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? 'bg-blue-600' : 'bg-slate-700'
            }`}>
              1
            </div>
            <span className="font-medium">Personal Info</span>
          </div>
          <div className="w-16 h-1 bg-slate-700"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? 'bg-blue-600' : 'bg-slate-700'
            }`}>
              2
            </div>
            <span className="font-medium">Face Registration</span>
          </div>
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div className="glass p-10 rounded-2xl max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 gradient-text">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Company (Optional)
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                placeholder="Your Company"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/auth")}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold"
              >
                Already have account?
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                Continue to Face Registration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Face Registration */}
      {step === 2 && (
        <div className="glass p-10 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Register Your Face</h2>
            <p className="text-slate-300">
              Welcome, {formData.name}! Let's set up your facial recognition
            </p>
          </div>
          <FaceRegister userData={formData} />
          <button
            onClick={() => setStep(1)}
            className="mt-6 w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold"
          >
            Back to Personal Info
          </button>
        </div>
      )}
    </div>
  );
}
