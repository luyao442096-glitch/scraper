import { createClient } from '@supabase/supabase-js';

// 获取我们在 .env.local 里配置好的环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 制造出一把随时可以调用数据库和用户系统的钥匙
export const supabase = createClient(supabaseUrl, supabaseAnonKey);