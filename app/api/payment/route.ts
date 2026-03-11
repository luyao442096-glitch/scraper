import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    // 1. 验证用户是谁
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return NextResponse.json({ error: '请先登录' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');

    // 配置带 Token 的管理员客户端
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: '登录失效' }, { status: 401 });

    // 2. 获取用户当前的积分余额
    const { data: profile } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single();
    
    const currentCredits = profile?.credits || 0;

    // 3. 核心商业动作：给客户充值 2000 积分！
    await supabase
      .from('profiles')
      .update({ credits: currentCredits + 2000 })
      .eq('id', user.id);

    return NextResponse.json({ success: true, message: '充值成功！' });

  } catch (error: any) {
    console.error("支付发货错误:", error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}