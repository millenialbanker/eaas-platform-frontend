"use client";

import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="32" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="2" width="20" height="8" rx="2" fill="#3B82F6" />
        <rect x="2" y="13" width="46" height="8" rx="3" fill="#059669" />
        <rect x="6" y="24" width="8" height="14" rx="2" fill="#0F172A" />
        <rect x="36" y="24" width="8" height="14" rx="2" fill="#0F172A" />
      </svg>
      <span className="font-extrabold text-xl tracking-tight text-slate-900">Modulease</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#3B82F6] selection:text-white flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-200">
          <Logo />
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-[#059669] border border-emerald-200 rounded-full">
            Secure EaaS Portal
          </span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Zero-Waste Infrastructure & <span className="text-[#059669]">Equipment Solutions</span>
            </h1>
            <p className="text-lg md:text-xl font-medium mt-4 leading-relaxed">
              <span className="text-[#0F172A]">Scale Your Workspace</span>
              <span className="text-[#3B82F6]">.</span>{" "}
              <span className="text-[#059669]">Protect your Capital</span>
              <span className="text-[#3B82F6]">.</span>
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Equipping managed workspace operators with enterprise-grade capacity planning and tax-optimized Equipment-as-a-Service solutions.
            </p>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            
            {/* Calculator Card */}
            <Link href="/calculator" className="group bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-[#3B82F6] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#3B82F6]/5 rounded-bl-full group-hover:bg-[#3B82F6]/10 transition-all"></div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#3B82F6] flex items-center justify-center font-bold mb-6 border border-blue-100">
                  ₹
                </div>
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">
                  Project Finance Estimator
                </h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Calculate CapEx vs. OpEx structures, monthly lease terms, gross tax shields, and net incremental tax benefits in INR.
                </p>
              </div>
              <div className="mt-8 flex items-center text-sm font-bold text-[#3B82F6]">
                Launch Estimator <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Planner Card */}
            <Link href="/planner" className="group bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-[#059669] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full group-hover:bg-emerald-100 transition-all"></div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-bold mb-6 border border-emerald-200">
                  ⚡
                </div>
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-[#059669] transition-colors">
                  Capacity Planner
                </h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Translate workspace seat counts into precise enterprise Wi-Fi 6 access points, PoE+ switches, bandwidth, and hardware CapEx.
                </p>
              </div>
              <div className="mt-8 flex items-center text-sm font-bold text-[#059669]">
                Launch Planner <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* Footer CTA Section */}
      <footer className="max-w-6xl w-full mx-auto px-6 py-10 border-t border-slate-200 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="font-bold text-slate-900 text-base">Ready to scale your managed workspace?</p>
          <p className="text-xs text-slate-500 mt-1">Get in touch directly with our team to discuss custom infrastructure rollouts.</p>
        </div>
        <div>
          <a 
            href="mailto:founder@modulease.site?subject=Inquiry%20regarding%20Modulease%20EaaS%20Portal" 
            className="bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 border border-slate-900"
          >
            <svg className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Get in Touch / Know More
          </a>
        </div>
      </footer>
    </main>
  );
}
