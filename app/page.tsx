"use client";

import { useState } from "react";

export default function EaasDashboard() {
  const [apiKey, setApiKey] = useState("sk_op_alice123");
  const [activeTab, setActiveTab] = useState("operators");
  
  // Inventory Management State
  const [inventory, setInventory] = useState([
    { id: "INV-001", item: "Enterprise Edge Node Rack", stock: 24, status: "In Stock", location: "DC-East-01" },
    { id: "INV-002", item: "RFID Asset Scanner Pro", stock: 8, status: "Low Stock", location: "Hub-West-04" },
    { id: "INV-003", item: "Modular Compute Blade X9", stock: 45, status: "In Stock", location: "DC-Central-02" },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemStock, setNewItemStock] = useState("");

  // RFID Reader State
  const [rfidLogs, setRfidLogs] = useState([
    { tag: "RFID-9921-AZ", asset: "Rack Component #4", scanned_at: "2026-09-29 14:12:05", status: "Verified" },
    { tag: "RFID-4410-BX", asset: "Secure Gateway Unit", scanned_at: "2026-09-29 13:45:22", status: "Verified" },
  ]);
  const [activeScanner, setActiveScanner] = useState(true);
  const [scanInput, setScanInput] = useState("");

  // Mailroom Handling State
  const [mailItems, setMailItems] = useState([
    { tracking: "ML-849201", recipient: "Alice Vance (Operations)", carrier: "FedEx Secure", status: "Checked In" },
    { tracking: "ML-332190", recipient: "Bob Sterling (Finance)", carrier: "DHL Express", status: "Dispatched" },
  ]);
  const [mailRecipient, setMailRecipient] = useState("");
  const [mailCarrier, setMailCarrier] = useState("");

  // Handler for Inventory
  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;
    setInventory([
      { id: `INV-00${inventory.length + 1}`, item: newItemName, stock: Number(newItemStock) || 10, status: "In Stock", location: "Main Warehouse" },
      ...inventory
    ]);
    setNewItemName("");
    setNewItemStock("");
  };

  // Handler for RFID simulation
  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput) return;
    setRfidLogs([
      { tag: scanInput, asset: "Custom Scanned Hardware", scanned_at: new Date().toISOString().replace('T', ' ').substring(0, 19), status: "Verified" },
      ...rfidLogs
    ]);
    setScanInput("");
  };

  // Handler for Mailroom
  const handleAddMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailRecipient) return;
    setMailItems([
      { tracking: `ML-${Math.floor(100000 + Math.random() * 900000)}`, recipient: mailRecipient, carrier: mailCarrier || "Internal Courier", status: "Checked In" },
      ...mailItems
    ]);
    setMailRecipient("");
    setMailCarrier("");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              EaaS Enterprise Operations & Logistics
            </h1>
            <p className="text-sm text-gray-400 mt-1">Cloudflare Workers + D1 Backend Connected Hub</p>
          </div>
          <div className="flex items-center space-x-3 bg-gray-900 border border-gray-800 p-2 rounded-lg">
            <span className="text-xs text-gray-400 font-medium">API Key:</span>
            <input 
              type="text" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-gray-950 border border-gray-700 rounded px-2 py-1 text-xs text-indigo-300 w-40 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "inventory" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-900 text-gray-400 hover:bg-gray-800"}`}
          >
            Inventory Management
          </button>
          <button 
            onClick={() => setActiveTab("rfid")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "rfid" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-900 text-gray-400 hover:bg-gray-800"}`}
          >
            RFID Reader Console
          </button>
          <button 
            onClick={() => setActiveTab("mailroom")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "mailroom" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-900 text-gray-400 hover:bg-gray-800"}`}
          >
            Mailroom Handling
          </button>
          <button 
            onClick={() => setActiveTab("finance")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "finance" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-900 text-gray-400 hover:bg-gray-800"}`}
          >
            Finance & Metrics
          </button>
        </div>

        {/* Tab 1: Inventory Management */}
        {activeTab === "inventory" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl lg:col-span-1">
              <h2 className="text-lg font-bold mb-4 text-white">Add Stock Item</h2>
              <form onSubmit={handleAddInventory} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Item Name / Hardware</label>
                  <input 
                    type="text" 
                    value={newItemName} 
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g., Edge Router v4"
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Initial Stock Count</label>
                  <input 
                    type="number" 
                    value={newItemStock} 
                    onChange={(e) => setNewItemStock(e.target.value)}
                    placeholder="15"
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                  Register Item
                </button>
              </form>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl lg:col-span-2">
              <h2 className="text-lg font-bold mb-4 text-white">Warehouse Inventory Ledger</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-800 text-gray-400 text-xs uppercase">
                    <tr>
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Item Description</th>
                      <th className="pb-3">Stock</th>
                      <th className="pb-3">Location</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {inventory.map((inv) => (
                      <tr key={inv.id} className="hover:bg-gray-800/40">
                        <td className="py-3 font-mono text-indigo-400 text-xs">{inv.id}</td>
                        <td className="py-3 font-medium text-gray-200">{inv.item}</td>
                        <td className="py-3 font-mono">{inv.stock}</td>
                        <td className="py-3 text-gray-400 text-xs">{inv.location}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${inv.status === 'In Stock' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: RFID Reader */}
        {activeTab === "rfid" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-white">RFID Gateway</h2>
                <span className={`w-2.5 h-2.5 rounded-full ${activeScanner ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
              </div>
              <p className="text-xs text-gray-400 mb-4">Simulate hardware RFID tag scanning or input beacon strings directly into the Cloudflare gateway node.</p>
              <form onSubmit={handleSimulateScan} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Scan Tag / UID</label>
                  <input 
                    type="text" 
                    value={scanInput} 
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder="e.g., RFID-7731-XY"
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-sm text-gray-200 font-mono focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                  Simulate Read Event
                </button>
              </form>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl lg:col-span-2">
              <h2 className="text-lg font-bold mb-4 text-white">Live RFID Sensor Stream</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-800 text-gray-400 text-xs uppercase">
                    <tr>
                      <th className="pb-3">Tag UID</th>
                      <th className="pb-3">Asset Matched</th>
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {rfidLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-gray-800/40">
                        <td className="py-3 font-mono text-indigo-300 text-xs">{log.tag}</td>
                        <td className="py-3 text-gray-200">{log.asset}</td>
                        <td className="py-3 text-gray-400 text-xs">{log.scanned_at}</td>
                        <td className="py-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mailroom Handling */}
        {activeTab === "mailroom" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl lg:col-span-1">
              <h2 className="text-lg font-bold mb-4 text-white">Log Incoming Package</h2>
              <form onSubmit={handleAddMail} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Recipient Name / Dept</label>
                  <input 
                    type="text" 
                    value={mailRecipient} 
                    onChange={(e) => setMailRecipient(e.target.value)}
                    placeholder="e.g., Sarah Connor (Security)"
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Carrier Service</label>
                  <input 
                    type="text" 
                    value={mailCarrier} 
                    onChange={(e) => setMailCarrier(e.target.value)}
                    placeholder="FedEx / UPS / DHL"
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                  Check-In Package
                </button>
              </form>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl lg:col-span-2">
              <h2 className="text-lg font-bold mb-4 text-white">Mailroom Tracking Ledger</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-800 text-gray-400 text-xs uppercase">
                    <tr>
                      <th className="pb-3">Tracking #</th>
                      <th className="pb-3">Recipient</th>
                      <th className="pb-3">Carrier</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {mailItems.map((m, idx) => (
                      <tr key={idx} className="hover:bg-gray-800/40">
                        <td className="py-3 font-mono text-indigo-400 text-xs">{m.tracking}</td>
                        <td className="py-3 font-medium text-gray-200">{m.recipient}</td>
                        <td className="py-3 text-gray-400 text-xs">{m.carrier}</td>
                        <td className="py-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Finance */}
        {activeTab === "finance" && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4 text-white">Financial & Operations Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-950 p-5 rounded-lg border border-gray-800">
                <p className="text-xs text-gray-400 uppercase">ARR Metrics</p>
                <p className="text-2xl font-extrabold text-emerald-400 mt-1">$1,245,000</p>
              </div>
              <div className="bg-gray-950 p-5 rounded-lg border border-gray-800">
                <p className="text-xs text-gray-400 uppercase">Inventory Asset Value</p>
                <p className="text-2xl font-extrabold text-indigo-400 mt-1">$342,800</p>
              </div>
              <div className="bg-gray-950 p-5 rounded-lg border border-gray-800">
                <p className="text-xs text-gray-400 uppercase">Logistics Burn Rate</p>
                <p className="text-2xl font-extrabold text-rose-400 mt-1">$18,400 / mo</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
