"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/utils/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. 获取当前登录状态
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCredits(session.user.id);
      }
    };

    fetchSession();

    // 2. 实时监听登录/登出动作
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCredits(session.user.id);
      } else {
        setCredits(null);
      }
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  // 3. 去数据库查询该用户的剩余积分
  const fetchCredits = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();
    
    if (data) setCredits(data.credits);
  };

  // 退出登录逻辑
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // 刷新页面状态
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo 区 - 🚀 品牌已全面升级为 AIScraperPro */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐙</span>
          <span className="font-extrabold text-xl tracking-tight text-blue-600">
            AI<span className="text-gray-900">ScraperPro</span>
          </span>
        </Link>

        {/* 右侧导航 */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
          <div className="h-4 w-px bg-gray-300"></div> {/* 分割线 */}

          {/* 🌟 核心魔法：根据 user 是否存在，显示不同的界面 */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* 显示剩余积分 */}
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-1">
                ⚡ {credits !== null ? credits : '...'} Credits
              </span>
              {/* 显示用户邮箱前缀 */}
              <span className="text-gray-500 hidden sm:block">
                {user.email?.split('@')[0]}
              </span>
              <button onClick={handleLogout} className="text-gray-900 hover:text-red-600 font-bold transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-900 hover:text-blue-600 font-bold transition-colors">
                Log in
              </Link>
              <Link href="/login" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all shadow-sm font-bold">
                Get Started Free
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}