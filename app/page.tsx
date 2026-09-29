'use client';

import { useState } from "react";

export default function EaasDashboard() {
  const [apiKey, setApiKey] = useState("sk_op_alice123");
  const [activeTab, setActiveTab] = useState("operators");
  
  // State for Operator view
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");

  // State for Finance view
  const [financeData, setFinanceData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketStatus("Submitting...");
    try {
      const res = await fetch("https://eaas-platform-backend.rohil312.workers.dev/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ title: ticketTitle, description: ticketDescription }),
      });
      const data = await res.json();
      if (res.ok) {
        setTicketStatus("Success! Ticket created.");
        setTicketTitle("");
        setTicketDescription("");
      } else {
        setTicketStatus(`Error: ${data.error || "Unauthorized"}`);
      }
    } catch (err) {
      setTicketStatus("Network error connecting to Cloudflare Worker.");
    }
  };

  const fetchFinanceMetrics = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://eaas-platform-backend.rohil312.workers.dev/api/finance", {
        headers: {
          "x-api-key": apiKey,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFinanceData(data);
      } else {
        setFinanceData({ error: data.error || "Unauthorized or invalid Finance key" });
      }
    } catch (err) {
      setFinanceData({ error: "Network error fetching finance data." });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">EaaS Operations Platform</h1>
            <p className="text-sm text-gray-400">Cloudflare Workers + D1 Backend Dashboard</p>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-xs text-gray-400">API Key:</label>
            <input 
              type="text" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm text-gray-200 w-44 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </header>

        <div className="flex space-x-4 mb-6">
          <button 
            onClick={() => setActiveTab("operators")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "operators" ? "bg-indigo-600 text-white" : "bg-gray-900 text-gray-400 hover:bg-gray-800"}`}
          >
            Operators Portal (sk_op_alice123)
          </button>
          <button 
            onClick={() => { setActiveTab("finance"); fetchFinanceMetrics(); }}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "finance" ? "bg-indigo-600 text-white" : "bg-gray-900 text-gray-400 hover:bg-gray-800"}`}
          >
            Finance & Metrics (sk_fin_bob123)
          </button>
        </div>

        {activeTab === "operators" && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Create Service Request</h2>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Request Title</label>
                <input 
                  type="text" 
                  value={ticketTitle} 
                  onChange={(e) => setTicketTitle(e.target.value)}
                  placeholder="e.g., Provision Edge Compute Node"
                  className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                <textarea 
                  value={ticketDescription} 
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder="Detailed deployment specifications..."
                  className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-sm text-gray-200 h-24 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded text-sm transition-colors"
              >
                Submit Request
              </button>
              {ticketStatus && <p className="text-xs mt-2 text-indigo-400 font-medium">{ticketStatus}</p>}
            </form>
          </div>
        )}

        {activeTab === "finance" && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Finance & Analytics Ledger</h2>
              <button 
                onClick={fetchFinanceMetrics}
                className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded text-gray-300"
              >
                Refresh Data
              </button>
            </div>
            {loading ? (
              <p className="text-sm text-gray-400 animate-pulse">Loading enterprise metrics...</p>
            ) : (
              <pre className="bg-gray-950 p-4 rounded border border-gray-800 text-xs text-indigo-300 overflow-x-auto">
                {JSON.stringify(financeData, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
