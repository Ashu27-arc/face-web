import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "TechVision - Modern IT Solutions",
  description: "Cutting-edge technology solutions for the modern world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-20 min-h-screen">{children}</main>
        <footer className="glass mt-20 py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="mb-4">
              <span className="text-3xl font-bold gradient-text">TechVision</span>
            </div>
            <p className="text-slate-400 mb-2">&copy; 2024 TechVision. All rights reserved.</p>
            <p className="text-slate-500 text-sm">Powered by Next-Gen Technology</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
