import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wbqylhxcetnowucuhaqf.supabase.co'
const supabaseAnonKey = 'sb_publishable_KRs7VJIYgHHOylzuOnaLrw_MstSsysO'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

