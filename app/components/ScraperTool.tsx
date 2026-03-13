"use client";

import { useState } from "react";
import { supabase } from "@/app/utils/supabase"; 
import Link from "next/link";

export default function ScraperTool() {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    if (!url || !prompt) {
      setError("💡 Please provide both a target URL and your extraction requirements.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Please log in to receive your 50 free credits and start scraping!");
      }

      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ url, prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Scraping failed. Please check the URL and try again.");
      }

      setResult(data.data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🌟 将 JSON 转换为 CSV 并触发下载的魔法函数
  const downloadCSV = () => {
    if (!result) return;
    
    // 确保数据是一个数组
    const dataArray = Array.isArray(result) ? result : [result];
    if (dataArray.length === 0) return;

    // 1. 提取所有表头
    const headers = Object.keys(dataArray[0]);

    // 2. 将数据转换为 CSV 格式的字符串
    const csvRows = dataArray.map(row => {
      return headers.map(header => {
        const val = row[header];
        const safeVal = val === null || val === undefined ? '' : String(val).replace(/"/g, '""');
        return `"${safeVal}"`;
      }).join(',');
    });

    // 3. 把表头和数据拼在一起 (保留 \uFEFF 以兼容国际字符)
    const csvContent = '\uFEFF' + [headers.join(','), ...csvRows].join('\n');

    // 4. 触发浏览器下载
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `aiscraperpro_export_${new Date().getTime()}.csv`; 
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Website URL</label>
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">What data do you want to extract?</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., Extract all product names, prices, and image URLs." rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black" />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex flex-col gap-2">
            <span>{error}</span>
            {error.includes("credits") && (
              <Link href="/pricing" className="inline-block px-4 py-2 bg-blue-600 text-white rounded font-bold text-center hover:bg-blue-700 w-fit">
                🚀 Upgrade to Pro
              </Link>
            )}
          </div>
        )}

        <button onClick={handleScrape} disabled={loading} className={`w-full py-4 rounded-lg text-white font-bold text-lg transition-all ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}`}>
          {loading ? "✨ AI is extracting data..." : "✨ AI Scrape Now"}
        </button>
      </div>

      {result && (
        <div className="mt-8 bg-gray-900 rounded-2xl p-6 shadow-2xl overflow-hidden animate-fade-in-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Extraction Result</h3>
            <div className="flex gap-3 items-center">
              <button 
                onClick={downloadCSV}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-500 transition-colors shadow-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export CSV
              </button>
              <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-md text-sm font-bold border border-green-500/30">
                -1 Credit
              </span>
            </div>
          </div>
          <pre className="text-green-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap bg-black/30 p-4 rounded-lg">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}