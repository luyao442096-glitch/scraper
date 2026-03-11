import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// 🚀 引入我们刚刚写好的智能导航栏
import Navbar from "./components/Navbar"; 

const inter = Inter({ subsets: ["latin"] });

// 这是全局的 SEO 元数据（默认显示）
export const metadata: Metadata = {
  title: "AI Scraper | No-Code Web Data Extraction",
  description: "Extract structured JSON data from any website using AI. No coding or regular expressions required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        
        {/* 🚀 用这一行代码，替换掉了之前一大坨静态的 <header> 代码！ */}
        {/* 它可以智能判断用户是否登录，并显示积分 */}
        <Navbar />

        {/* 页面主体内容：你写的 page.tsx 都会被动态塞进这个 main 标签里 */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 全局底部 (Footer) - SEO 的秘密武器 */}
        <footer className="bg-white border-t border-gray-200 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                🐙 NexusScraper
              </h3>
              <p className="text-gray-500">The easiest way to turn websites into structured data.</p>
            </div>
            
            {/* 这里的链接就是我们的 Programmatic SEO 落地页入口 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Popular Tools</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/tools/scrape-amazon-products" className="hover:text-blue-600">Scrape Amazon</Link></li>
                <li><Link href="/tools/scrape-shopify-stores" className="hover:text-blue-600">Scrape Shopify</Link></li>
                <li><Link href="/tools/scrape-real-estate" className="hover:text-blue-600">Scrape Zillow</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="#" className="hover:text-blue-600">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
                <li><Link href="#" className="hover:text-blue-600">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="#" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-blue-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100 text-center text-gray-400">
            © {new Date().getFullYear()} NexusScraper Inc. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}