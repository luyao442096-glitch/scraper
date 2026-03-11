import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// 初始化大模型
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(req: Request) {
  try {
    // 1. 获取前端传来的用户 Token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return NextResponse.json({ error: '请先登录' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');

    // 🌟 商业逻辑修复核心：给后端配置带 Token 的专属 Supabase 客户端！
    // 这样后端去查数据库时，RLS 保安才会放行！
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: { Authorization: `Bearer ${token}` } // 把工作牌挂在脖子上
        }
      }
    );

    // 2. 验证用户身份
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: '登录状态已失效，请重新登录' }, { status: 401 });
    }

    // 3. 查余额 (现在保安认识你了，能准确查出 50 分了)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || profile.credits <= 0) {
      return NextResponse.json({ error: '积分不足，请升级 Pro 计划以获取更多额度！' }, { status: 403 });
    }

    // ================= 开始真实抓取 =================
    const { url, prompt } = await req.json();
    if (!url || !prompt) return NextResponse.json({ error: 'URL 和需求不能为空' }, { status: 400 });

    const jinaResponse = await fetch(`https://r.jina.ai/${url}`, {
      headers: { 'Accept': 'text/event-stream' }
    });
    
    if (!jinaResponse.ok) throw new Error('目标网页抓取失败，可能存在反爬机制。');
    const markdownContent = await jinaResponse.text();

    const completion = await openai.chat.completions.create({
      // 🚀 终极杀器：使用 DeepSeek 模型，无视地区限制，JSON 提取能力满分！
      model: "deepseek/deepseek-chat", 
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "你是一个顶级的网页数据抓取专家。你将收到网页的 Markdown 内容和用户的提取需求。请严格按照要求提取，并**务必仅输出合法的 JSON 格式数据**，包裹在 { \"data\": [...] } 中。" },
        { role: "user", content: `URL: ${url}\n需求: ${prompt}\n网页内容:\n${markdownContent}` }
      ]
    });

    const aiResult = JSON.parse(completion.choices[0].message.content || '{}');
    // ================= 抓取结束 =================

    // 4. 扣费 (抓取成功，将数据库的积分 -1)
    await supabase
      .from('profiles')
      .update({ credits: profile.credits - 1 })
      .eq('id', user.id);

    // 将完美的数据返回给前端
    return NextResponse.json({ 
      success: true, 
      data: aiResult.data || aiResult 
    });

  } catch (error: any) {
    console.error("系统错误:", error);
    return NextResponse.json({ error: error.message || '服务器内部错误' }, { status: 500 });
  }
}