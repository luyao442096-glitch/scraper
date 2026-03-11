import ScraperTool from "./components/ScraperTool";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* 🚀 第 1 部分：高转化率的 Hero Section (英雄宣传区) */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* 背景装饰光晕，增加高级感 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-full bg-blue-500/5 blur-[120px] -z-10"></div>
        
        <div className="max-w-4xl mx-auto z-10 relative">
          <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 hover:bg-blue-100 transition-colors border border-blue-100">
            🎉 NexusScraper 1.0 is live! Get 50 Free Credits <span aria-hidden="true">&rarr;</span>
          </Link>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
            Extract Web Data with AI. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              No Code Required.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Turn any website into structured JSON or CSV in seconds. Just paste the link, tell AI what you need, and let the magic happen. Bypass captchas automatically.
          </p>
          
          {/* 信任背书 / 核心卖点 */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500 mb-12">
            <span className="flex items-center gap-2">✅ DeepSeek AI Powered</span>
            <span className="flex items-center gap-2">✅ Auto-bypass Anti-bots</span>
            <span className="flex items-center gap-2">✅ 1-Click CSV Export</span>
          </div>
        </div>
      </section>

      {/* 🚀 第 2 部分：你的核心武器（抓取器组件） */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 relative z-10 -mt-8">
        <div className="max-w-5xl mx-auto">
          {/* 为了让工具框更突出，我们在它外面套了一层发光的阴影 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <ScraperTool />
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 第 3 部分：使用步骤 (How it works) - 降低用户理解门槛 */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">How it works</h2>
            <p className="mt-4 text-lg text-gray-500">Get your data in three simple steps.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paste the URL</h3>
              <p className="text-gray-500">Drop the link of the website you want to scrape. We handle the proxies and anti-bot systems automatically.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Write your prompt</h3>
              <p className="text-gray-500">Tell our AI exactly what data points you need in plain English. No CSS selectors or Regex needed.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Download Data</h3>
              <p className="text-gray-500">Instantly view the extracted data in JSON format, or download it as a clean CSV file for Excel.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}