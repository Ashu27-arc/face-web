"use client";
import FaceAuth from "@/components/FaceAuth";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Face Authentication</h1>
        <p className="text-xl text-slate-300">
          Secure access using facial recognition technology
        </p>
      </div>

      <div className="glass p-10 rounded-2xl">
        <FaceAuth />
        
        <div className="mt-8 pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-300 mb-4">Don't have an account?</p>
          <Link 
            href="/register"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}
