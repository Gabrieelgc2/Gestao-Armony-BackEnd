import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('As variáveis SUPABASE_URL e SUPABASE_ANON_KEY devem estar configuradas no .env do NestJS');
}

export const supabase = createClient(supabaseUrl, supabaseKey);