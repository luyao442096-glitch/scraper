import ScraperTool from "@/app/components/ScraperTool";
import { Metadata } from "next";

// 🌟 核心 SEO 魔法：动态生成网页的 <title> 和 <meta description>
// 这会让谷歌精准收录你的每一个长尾词页面！
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Free AI ${title} Tool | AIScraperPro`,
    description: `Looking for a way to ${title.toLowerCase()}? Our AI-powered scraper extracts structured JSON/CSV data in seconds without complex coding.`,
  };
}

// 这是一个服务端组件，专门负责 SEO 和页面渲染
export default function ToolPage({ params }: { params: { slug: string } }) {
  const title = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* SEO 增强区 */}
      <div className="bg-blue-600 pt-20 pb-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Free AI {title} Tool</h1>
        <p className="text-blue-100 max-w-2xl mx-auto px-4 text-lg">
          Looking for a way to {title.toLowerCase()} without complex coding? 
          Our AI-powered scraper understands your needs and delivers structured JSON/CSV data in seconds.
        </p>
      </div>

      {/* 真正干活的客户端零件 */}
      <div className="mt-[-60px] relative z-10 px-4"> {/* 让工具向上偏移，更有设计感 */}
        <div className="max-w-4xl mx-auto">
          <ScraperTool />
        </div>
      </div>
      
      {/* 底部 SEO 文本：为了让 Google 爬虫觉得内容充实 */}
      <section className="max-w-4xl mx-auto py-20 px-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why use our AI {title} tool?</h2>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-lg text-gray-600">
          <p className="mb-4">
            Traditional scrapers require constant maintenance and complex proxies to bypass anti-bot systems. With our AI technology, we handle the underlying structure changes automatically. 
          </p>
          <p>
            Whether you are extracting prices, titles, or reviews from <strong>{title.replace('Scrape ', '')}</strong>, our tool adapts to any website layout. Just input the target URL, specify what you need, and download the data instantly as a clean CSV file.
          </p>
        </div>
      </section>
    </main>
  );
}