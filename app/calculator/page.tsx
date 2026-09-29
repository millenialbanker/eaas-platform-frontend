"use client";

import { useState } from "react";
import Link from "next/link";

export default function ModuleaseCalculatorPage() {
  const [totalCapex, setTotalCapex] = useState<number>(100000);
  const [term, setTerm] = useState<number>(60); // 36 or 60 months
  const [taxRate, setTaxRate] = useState<number>(25); // 25% corporate tax assumption

  // Calculations
  const moduleaseFunded = totalCapex * 0.30; // 30% for furniture & IT hardware
  const clientUpfrontCapex = totalCapex * 0.70;
  const monthlyRate = term === 60 ? 0.031 : 0.0367; // 3.1% for 60m, 3.67% for 36m
  const monthlyPayment = moduleaseFunded * monthlyRate;
  const deposit = monthlyPayment * 3; // 3-month security deposit
  const upfrontTotal = clientUpfrontCapex + deposit;
  
  const totalLeasePayments = monthlyPayment * term;
  const estimatedTaxSavings = totalLeasePayments * (taxRate / 100);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Modulease Project Financing Calculator</h1>
            <p className="text-sm text-gray-400">Standalone Operator Estimator</p>
          </div>
          <Link href="/" className="text-xs bg-gray-900 hover:bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg text-indigo-300 font-medium">
            ← Back to Main Dashboard
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">Financing Parameters</h2>
            
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">1. Total Cost of Project Finance (Capex in $)</label>
              <input 
                type="number" 
                value={totalCapex} 
                onChange={(e) => setTotalCapex(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-lg font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">2. Term (Lock-in Period in Months)</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setTerm(36)}
                  className={`py-3 rounded-lg font-semibold text-sm border transition-all ${term === 36 ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-950 border-gray-800 text-gray-400'}`}
                >
                  36 Months (3.67%)
                </button>
                <button 
                  type="button"
                  onClick={() => setTerm(60)}
                  className={`py-3 rounded-lg font-semibold text-sm border transition-all ${term === 60 ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-950 border-gray-800 text-gray-400'}`}
                >
                  60 Months (3.1%)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Estimated Corporate Tax Rate (%)</label>
              <input 
                type="number" 
                value={taxRate} 
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 mb-6">Financial Breakdown</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400">Modulease Funded (30% Furniture & IT):</span>
                  <span className="font-mono font-bold text-emerald-400">${moduleaseFunded.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>

                <div className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400">Monthly Payment ({term} mos @ {(monthlyRate * 100).toFixed(2)}%):</span>
                  <span className="font-mono font-bold text-indigo-400">${monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2})} /mo</span>
                </div>

                <div className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400">3-Month Security Deposit:</span>
                  <span className="font-mono font-bold text-amber-400">${deposit.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>

                <div className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400">Total Upfront Cash Required (70% Capex + Deposit):</span>
                  <span className="font-mono font-bold text-white">${upfrontTotal.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>

                <div className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-emerald-900/50">
                  <span className="text-emerald-300 font-medium">Estimated Tax Savings:</span>
                  <span className="font-mono font-bold text-emerald-400">${estimatedTaxSavings.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500 text-center">
              Modulease Dedicated Calculator View • Accessible at /calculator
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
