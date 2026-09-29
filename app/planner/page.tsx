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

export default function CapacityPlanner() {
  const [totalSeats, setTotalSeats] = useState<number>(150);
  const [concurrency, setConcurrency] = useState<number>(65);
  const [devicesPerUser, setDevicesPerUser] = useState<number>(2.5);
  const [bandwidthPerUser, setBandwidthPerUser] = useState<number>(8);

  const activeUsers = Math.round(totalSeats * (concurrency / 100));
  const totalDevices = Math.round(activeUsers * devicesPerUser);
  const totalBandwidth = activeUsers * bandwidthPerUser;
  
  const activeAPs = Math.max(1, Math.ceil(totalDevices / 45));
  const spareAPs = Math.max(1, Math.ceil(activeAPs * 0.1));
  const totalAPs = activeAPs + spareAPs;

  const wiredConnections = Math.round(totalSeats * 0.15);
  const totalPortsNeeded = totalAPs + wiredConnections;
  const activeSwitches = Math.max(1, Math.ceil(totalPortsNeeded / 24));
  const spareSwitches = 1;
  const totalSwitches = activeSwitches + spareSwitches;

  const capex = (totalAPs * 35000) + (totalSwitches * 65000) + 120000;
  const formatINR = (num: number) => '₹' + Math.round(num).toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 flex flex-col justify-center font-sans">
      <div className="max-w-5xl w-full mx-auto mb-4 flex justify-between items-center">
        <Logo />
        <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-900">← Back to Dashboard</Link>
      </div>

      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Parameters */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Infrastructure Capacity Planner</h2>
          <p className="text-sm text-slate-500 mb-8">Translate workspace seats into exact IT hardware requirements.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Total Workspace Seats</label>
              <input 
                type="number" 
                value={totalSeats} 
                onChange={(e) => setTotalSeats(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-lg font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#059669]" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Peak Concurrency (%)</label>
                <input 
                  type="number" 
                  value={concurrency} 
                  onChange={(e) => setConcurrency(Number(e.target.value))} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#059669]" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Devices per User</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={devicesPerUser} 
                  onChange={(e) => setDevicesPerUser(Number(e.target.value))} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#059669]" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Bandwidth per User (Mbps)</label>
              <input 
                type="number" 
                value={bandwidthPerUser} 
                onChange={(e) => setBandwidthPerUser(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#059669]" 
              />
            </div>
          </div>
        </div>

        {/* Results Blueprint */}
        <div className="lg:col-span-5 bg-[#0F172A] rounded-2xl p-8 shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6] rounded-bl-full opacity-10 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold border-b border-slate-800 pb-4 mb-6">Infrastructure Blueprint</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Peak Active Users:</span> 
                <span className="font-bold text-white">{activeUsers}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Devices:</span> 
                <span className="font-bold text-white">{totalDevices}</span>
              </div>

              <div className="flex justify-between items-center bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                <span className="text-emerald-400 font-semibold text-xs uppercase tracking-wider">Required ISP Bandwidth</span>
                <span className="font-bold text-emerald-400 text-lg">{totalBandwidth > 1000 ? (totalBandwidth / 1000).toFixed(1) + ' Gbps' : totalBandwidth + ' Mbps'}</span>
              </div>

              <hr className="border-slate-800 my-2" />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs">Enterprise Wi-Fi 6 APs:</span>
                  <span className="text-white font-medium text-xs">{activeAPs} <span className="text-slate-500">(+{spareAPs} Spare)</span></span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs">24-Port PoE+ Switches:</span>
                  <span className="text-white font-medium text-xs">{activeSwitches} <span className="text-slate-500">(+1 Spare)</span></span>
                </div>
              </div>

              <div className="flex flex-col bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 mt-4">
                <span className="text-slate-400 text-xs font-semibold mb-1">Estimated IT Hardware CapEx</span>
                <span className="font-extrabold text-white text-2xl">{formatINR(capex)}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center uppercase tracking-widest font-semibold">
            Zero-Waste Capacity Logic
          </div>
        </div>

      </div>
    </div>
  );
}
