"use client";

import { useEffect, useState } from "react";

export default function AuthWelcomeBadge() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const auth = localStorage.getItem("faceAuth");
      const name = localStorage.getItem("userName");
      if (auth) {
        setUserName(name || "User");
      }
    } catch {
      setUserName("");
    }
  }, []);

  if (!userName) {
    return null;
  }

  return (
    <div className="glass px-6 py-3 rounded-full inline-block mb-4 glow">
      <p className="text-green-400 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        Welcome back, {userName}!
      </p>
    </div>
  );
}
