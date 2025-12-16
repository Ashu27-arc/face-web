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
        <footer className="glass mt-20 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
            <p>&copy; 2024 TechVision. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
