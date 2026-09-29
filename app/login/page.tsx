"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Get Access state
  const [showGetAccess, setShowGetAccess] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "modulease" && password === "vip2026") {
      document.cookie = "modulease_auth=authenticated; path=/; max-age=86400";
      router.push("/calculator");
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleGetAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <svg width="48" height="38" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3">
            <rect x="15" y="2" width="20" height="8" rx="2" fill="#3B82F6" />
            <rect x="2" y="13" width="46" height="8" rx="3" fill="#059669" />
            <rect x="6" y="24" width="8" height="14" rx="2" fill="#0F172A" />
            <rect x="36" y="24" width="8" height="14" rx="2" fill="#0F172A" />
          </svg>
          <h1 className="text-2xl font-extrabold text-slate-900">Modulease Portal</h1>
          <p className="text-xs font-semibold mt-1">
            <span className="text-[#0F172A]">Scale Your Workspace</span>
            <span className="text-[#3B82F6]">.</span>{" "}
            <span className="text-[#059669]">Protect your Capital</span>
            <span className="text-[#3B82F6]">.</span>
          </p>
        </div>

        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-xs rounded-lg font-medium border border-rose-100">{error}</div>}

        {!showGetAccess ? (
          /* Standard Login Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="modulease" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:ring-2 focus:ring-[#3B82F6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:ring-2 focus:ring-[#3B82F6] focus:outline-none"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md"
            >
              Access Portal Engines
            </button>

            <div className="text-center pt-4 border-t border-slate-100 mt-4">
              <button 
                type="button" 
                onClick={() => setShowGetAccess(true)}
                className="text-xs font-bold text-[#3B82F6] hover:underline"
              >
                Don't have credentials? Request Access →
              </button>
            </div>
          </form>
        ) : (
          /* Get Access Form */
          <div>
            {!submitted ? (
              <form onSubmit={handleGetAccess} className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-xs text-blue-800 mb-2 leading-relaxed">
                  Enter your professional email address to instantly receive your secure access credentials to your inbox.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Work Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="operator@workspace.com" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:ring-2 focus:ring-[#3B82F6] focus:outline-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#059669] hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? "Sending..." : "Get Instant Access"}
                </button>

                <div className="text-center pt-4 border-t border-slate-100 mt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowGetAccess(false)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900"
                  >
                    ← Back to Login
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-[#059669] rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h3 className="font-bold text-slate-900 text-base">Credentials Sent!</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We have dispatched the portal credentials to <span className="font-semibold text-slate-800">{email}</span>. Check your inbox to log in.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setShowGetAccess(false); }}
                  className="mt-4 text-xs font-bold text-[#3B82F6] hover:underline block mx-auto"
                >
                  Return to Login
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
