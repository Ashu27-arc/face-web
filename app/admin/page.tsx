"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  registeredAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="animate-pulse text-2xl gradient-text">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Admin Dashboard</h1>
        <p className="text-xl text-slate-300">
          Registered Users Management
        </p>
      </div>

      <div className="glass p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Registered Users</h2>
          <div className="bg-blue-500/20 px-4 py-2 rounded-lg border border-blue-500/30">
            <span className="text-blue-400 font-semibold">Total: {users.length}</span>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No users registered yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-300">Name</th>
                  <th className="text-left py-4 px-4 text-slate-300">Email</th>
                  <th className="text-left py-4 px-4 text-slate-300">Phone</th>
                  <th className="text-left py-4 px-4 text-slate-300">Company</th>
                  <th className="text-left py-4 px-4 text-slate-300">Registered</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{user.email}</td>
                    <td className="py-4 px-4 text-slate-300">{user.phone}</td>
                    <td className="py-4 px-4 text-slate-300">{user.company || "-"}</td>
                    <td className="py-4 px-4 text-slate-400 text-sm">
                      {new Date(user.registeredAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold gradient-text">{users.length}</div>
          <div className="text-slate-400">Total Users</div>
        </div>
        <div className="glass p-6 rounded-xl">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold gradient-text">
            {users.length > 0 ? new Date(users[users.length - 1].registeredAt).toLocaleDateString() : "-"}
          </div>
          <div className="text-slate-400">Last Registration</div>
        </div>
        <div className="glass p-6 rounded-xl">
          <div className="text-3xl mb-2">🔒</div>
          <div className="text-2xl font-bold gradient-text">100%</div>
          <div className="text-slate-400">Security Level</div>
        </div>
      </div>
    </div>
  );
}
