import ScraperTool from "@/app/components/ScraperTool";

// 这是一个服务端组件，专门负责 SEO
export default function ToolPage({ params }: { params: { slug: string } }) {
  const title = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-gray-50">
      {/* SEO 增强区 */}
      <div className="bg-blue-600 py-12 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">Free AI {title} Tool</h1>
        <p className="text-blue-100 max-w-2xl mx-auto px-4">
          Looking for a way to {title.toLowerCase()} without complex coding? 
          Our AI-powered scraper understands your needs and delivers structured JSON data in seconds.
        </p>
      </div>

      {/* 真正干活的客户端零件 */}
      <div className="mt-[-40px]"> {/* 让工具向上偏移，更有设计感 */}
        <ScraperTool />
      </div>
      
      {/* 底部 SEO 文本：为了让 Google 爬虫觉得内容充实 */}
      <section className="max-w-4xl mx-auto py-16 px-4 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold mb-4">Why use our AI {title} tool?</h2>
        <p>
          Traditional scrapers require constant maintenance. With our AI technology, 
          we handle the underlying structure changes automatically. Whether you are 
          extracting prices, titles, or descriptions, our tool adapts to any website layout.
        </p>
      </section>
    </main>
  );
}