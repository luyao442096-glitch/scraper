"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "@/app/utils/supabase";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 检查登录状态
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();
  }, []);

  // 付款成功后的自动发货逻辑
  const handlePaymentSuccess = async (orderID: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // 呼叫我们刚刚写好的自动发货引擎
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ orderID })
    });

    if (res.ok) {
      alert("🎉 支付成功！2000 个抓取积分已充值到您的账户！");
      router.push("/"); // 充值完立刻送他回主页去抓取
      router.refresh(); 
    } else {
      alert("充值状态异常，请联系客服。");
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 头部文案 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-500">
            No hidden fees. No complex API credits. Just choose the plan that fits your growth.
          </p>
        </div>

        {/* 定价卡片区域 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Free Tier (免费版) */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Hobby</h3>
            <p className="text-gray-500 mb-6">Perfect for testing the waters and small projects.</p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-gray-900">$0</span>
              <span className="text-gray-500 font-medium">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-gray-600">✅ <span className="font-medium">50</span> AI Scrapes per month</li>
              <li className="flex items-center gap-3 text-gray-600">✅ Standard extraction speed</li>
              <li className="flex items-center gap-3 text-gray-600">✅ JSON/CSV Export</li>
              <li className="flex items-center gap-3 text-gray-400">❌ API Access (Pro only)</li>
            </ul>
            <Link href="/" className="w-full block text-center bg-gray-100 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
              Start for Free
            </Link>
          </div>

          {/* Pro Tier (付费版) - 我们的摇钱树 */}
          <div className="bg-blue-900 rounded-2xl border border-blue-800 shadow-2xl p-8 flex flex-col relative transform md:-translate-y-4">
            {/* 推荐标签 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Most Popular
              </span>
            </div>
            
            <h3 className="text-2xl font-semibold text-white mb-2">Pro Scraper</h3>
            <p className="text-blue-200 mb-6">For marketers and developers who need serious data.</p>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-white">$15</span>
              <span className="text-blue-200 font-medium">/one-time</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-blue-50">🔥 <span className="font-bold">2,000</span> AI Scrape Credits</li>
              <li className="flex items-center gap-3 text-blue-50">🔥 Priority fast extraction</li>
              <li className="flex items-center gap-3 text-blue-50">🔥 Bypass complex CAPTCHAs</li>
              <li className="flex items-center gap-3 text-blue-50">🔥 Export Data to CSV</li>
            </ul>

            {/* 🚀 核心商业逻辑：接入 PayPal 按钮 */}
            <div className="mt-auto">
              {!user ? (
                <button onClick={() => router.push('/login')} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-400 transition-colors shadow-lg">
                  Log in to Buy
                </button>
              ) : (
                <div className="relative z-0 bg-white p-2 rounded-xl">
                  <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
                    <PayPalButtons 
                      style={{ layout: "horizontal", shape: "rect", color: "gold", height: 45 }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [{
                            description: "NexusScraper 2000 Credits",
                            amount: { value: "15.00", currency_code: "USD" }
                          }]
                        });
                      }}
                      onApprove={async (data, actions) => {
                        if (actions.order) {
                          const order = await actions.order.capture(); // 正式扣款
                          // 🌟 修复 TS 报错：加了一个 ! 告诉 TS 这个 ID 绝对存在
                          await handlePaymentSuccess(order.id!); 
                        }
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
              <p className="text-center text-blue-300 text-xs mt-3 flex items-center justify-center gap-1">
                🔒 Secured by PayPal
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}