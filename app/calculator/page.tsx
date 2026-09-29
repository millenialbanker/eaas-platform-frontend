"use client";

import { useState } from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <svg width="36" height="28" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="2" width="20" height="8" rx="2" fill="#3B82F6" />
        <rect x="2" y="13" width="46" height="8" rx="3" fill="#059669" />
        <rect x="6" y="24" width="8" height="14" rx="2" fill="#0F172A" />
        <rect x="36" y="24" width="8" height="14" rx="2" fill="#0F172A" />
      </svg>
      <span className="font-extrabold text-lg tracking-tight text-slate-900">Modulease</span>
    </Link>
  );
}

export default function Calculator() {
  const [totalCapex, setTotalCapex] = useState<number>(2500000);
  const [term, setTerm] = useState<number>(60);
  const [taxRate, setTaxRate] = useState<number>(25);

  const moduleaseFunded = totalCapex * 0.30;
  const upfrontTotal = (totalCapex * 0.70) + ((moduleaseFunded * (term === 60 ? 0.031 : 0.0367)) * 3);
  const monthlyPayment = moduleaseFunded * (term === 60 ? 0.031 : 0.0367);
  
  const grossTaxShield = (monthlyPayment * term) * (taxRate / 100);
  const foregoneDepreciation = moduleaseFunded * (taxRate / 100);
  const netTaxBenefit = grossTaxShield - foregoneDepreciation;

  const formatINR = (num: number) => '₹' + Math.round(num).toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 flex flex-col justify-center font-sans">
      <div className="max-w-5xl w-full mx-auto mb-4 flex justify-between items-center">
        <Logo />
        <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-900">← Back to Dashboard</Link>
      </div>

      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Project Finance Estimator</h2>
          <p className="text-sm text-slate-500 mb-8">Model CapEx reduction and tax shields for workspace build-outs.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Total Project CapEx (₹)</label>
              <input 
                type="number" 
                value={totalCapex} 
                onChange={(e) => setTotalCapex(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-lg font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Lease Term</label>
                <div className="flex gap-2">
                  <button onClick={() => setTerm(36)} className={`w-full py-3 rounded-xl font-bold text-sm ${term === 36 ? 'bg-[#3B82F6] text-white' : 'bg-slate-50 border border-slate-200 text-slate-700'}`}>36 Mos</button>
                  <button onClick={() => setTerm(60)} className={`w-full py-3 rounded-xl font-bold text-sm ${term === 60 ? 'bg-[#3B82F6] text-white' : 'bg-slate-50 border border-slate-200 text-slate-700'}`}>60 Mos</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Corporate Tax Rate (%)</label>
                <input 
                  type="number" 
                  value={taxRate} 
                  onChange={(e) => setTaxRate(Number(e.target.value))} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-5 bg-[#0F172A] rounded-2xl p-8 shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#059669] rounded-bl-full opacity-10 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold border-b border-slate-800 pb-4 mb-6">Financial Summary</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Monthly Lease Payment:</span> 
                <span className="font-bold text-[#3B82F6] text-base">{formatINR(monthlyPayment)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Upfront Capital Required:</span> 
                <span className="font-extrabold text-white text-lg">{formatINR(upfrontTotal)}</span>
              </div>

              <hr className="border-slate-800 my-2" />

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Gross Tax Shield:</span> 
                  <span>{formatINR(grossTaxShield)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Less Foregone Depreciation:</span> 
                  <span className="text-rose-400">-{formatINR(foregoneDepreciation)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-800 mt-2">
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Net Incremental Tax Benefit:</span> 
                  <span className="font-extrabold text-emerald-400 text-lg">{formatINR(netTaxBenefit)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center uppercase tracking-widest font-semibold">
            Modulease EaaS Engine
          </div>
        </div>

      </div>
    </div>
  );
}
