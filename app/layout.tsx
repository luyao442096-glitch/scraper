import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// 🚀 引入智能导航栏
import Navbar from "./components/Navbar"; 

const inter = Inter({ subsets: ["latin"] });

// 全局 SEO 元数据
export const metadata: Metadata = {
  title: "AIScraperPro | No-Code Web Data Extraction",
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
        
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                🐙 AIScraperPro
              </h3>
              <p className="text-gray-500">The easiest way to turn websites into structured data.</p>
            </div>
            
            {/* 🚀 激活的 Programmatic SEO 落地页入口 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Popular Tools</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/tools/scrape-amazon" className="hover:text-blue-600">Scrape Amazon</Link></li>
                <li><Link href="/tools/scrape-shopify" className="hover:text-blue-600">Scrape Shopify</Link></li>
                <li><Link href="/tools/scrape-zillow" className="hover:text-blue-600">Scrape Zillow</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
                <li><a href="mailto:luyao442096@gmail.com" className="hover:text-blue-600">Contact Us</a></li>
                <li className="pt-2">
                  <span className="text-xs text-gray-400 block break-all">
                    Email: luyao442096@gmail.com
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100 text-center text-gray-400">
            © {new Date().getFullYear()} AIScraperPro Inc. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}