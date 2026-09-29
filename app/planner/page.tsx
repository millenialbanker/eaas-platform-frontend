"use client";
import { useState } from "react";

export default function CapacityPlanner() {
  const [totalSeats, setTotalSeats] = useState<number>(150);
  const [concurrency, setConcurrency] = useState<number>(65);
  const [devicesPerUser, setDevicesPerUser] = useState<number>(2.5);
  const [bandwidthPerUser, setBandwidthPerUser] = useState<number>(8);

  const COST_PER_AP = 35000;
  const COST_PER_SWITCH = 65000;
  const COST_ROUTER_UPS = 120000;
  const DEVICES_PER_AP = 45;

  const activeUsers = Math.round(totalSeats * (concurrency / 100));
  const totalDevices = Math.round(activeUsers * devicesPerUser);
  const totalBandwidth = activeUsers * bandwidthPerUser;
  
  const activeAPs = Math.max(1, Math.ceil(totalDevices / DEVICES_PER_AP));
  const spareAPs = Math.max(1, Math.ceil(activeAPs * 0.1));
  const totalAPs = activeAPs + spareAPs;

  const wiredConnections = Math.round(totalSeats * 0.15);
  const totalPortsNeeded = activeAPs + spareAPs + wiredConnections;
  const activeSwitches = Math.max(1, Math.ceil(totalPortsNeeded / 24));
  const spareSwitches = 1;
  const totalSwitches = activeSwitches + spareSwitches;

  const capex = (totalAPs * COST_PER_AP) + (totalSwitches * COST_PER_SWITCH) + COST_ROUTER_UPS;

  const formatCurrency = (num: number) => '₹' + num.toLocaleString('en-IN');
  const formatBandwidth = (mbps: number) => mbps > 1000 ? (mbps / 1000).toFixed(1) + ' Gbps' : mbps + ' Mbps';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 flex items-center justify-center font-sans antialiased">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Infrastructure Capacity Planner</h2>
            <p className="text-sm text-slate-500 mt-1">Translate workspace seats into exact IT hardware and bandwidth requirements.</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Total Workspace Capacity (Seats)</label>
              <input 
                type="number" 
                value={totalSeats} 
                onChange={(e) => setTotalSeats(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-lg font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004A99] focus:border-[#004A99]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Peak Concurrency (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={concurrency} 
                    onChange={(e) => setConcurrency(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004A99] focus:border-[#004A99]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Devices per User</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={devicesPerUser} 
                  onChange={(e) => setDevicesPerUser(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004A99] focus:border-[#004A99]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Target Bandwidth per User (Mbps)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={bandwidthPerUser} 
                  onChange={(e) => setBandwidthPerUser(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004A99] focus:border-[#004A99]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">Mbps</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#004A99] rounded-bl-full opacity-20 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4 mb-6">Infrastructure Blueprint</h2>
            
            <div className="space-y-5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Peak Active Users:</span>
                <span className="font-bold text-white">{activeUsers}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Concurrent Devices:</span>
                <span className="font-bold text-white">{totalDevices}</span>
              </div>

              <div className="flex justify-between items-center bg-[#004A99]/10 p-3 rounded-lg border border-[#004A99]/20">
                <span className="text-[#E6F0FA] font-semibold text-xs uppercase tracking-wider">Required ISP Bandwidth</span>
                <span className="font-bold text-[#E6F0FA] text-lg">{formatBandwidth(totalBandwidth)}</span>
              </div>

              <hr className="border-slate-700" />

              <div className="space-y-3">
                <h3 className="text-slate-300 text-xs uppercase tracking-wider font-semibold">Hardware Requirements</h3>
                
                <div className="flex justify-between items-center px-1">
                  <span className="text-slate-400 text-xs">Enterprise Access Points:</span>
                  <span className="text-white font-medium">{activeAPs} <span className="text-slate-500 text-[10px] ml-1">(+{spareAPs} Spare)</span></span>
                </div>
                
                <div className="flex justify-between items-center px-1">
                  <span className="text-slate-400 text-xs">24-Port PoE Switches:</span>
                  <span className="text-white font-medium">{activeSwitches} <span className="text-slate-500 text-[10px] ml-1">(+{spareSwitches} Spare)</span></span>
                </div>

                <div className="flex justify-between items-center px-1">
                  <span className="text-slate-400 text-xs">Dual-WAN Router & UPS:</span>
                  <span className="text-emerald-400 text-xs font-medium">Included</span>
                </div>
              </div>
              
              <div className="flex flex-col bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 mt-4">
                <span className="text-slate-400 text-xs font-semibold mb-1">Estimated IT Hardware CapEx</span>
                <span className="font-extrabold text-white text-2xl">{formatCurrency(capex)}</span>
                <span className="text-emerald-400 text-xs mt-2 font-medium">→ Ready for Modulease Financing</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
