import { createClient } from '@supabase/supabase-js';

const URL = 'https://aeqszrouiaidvvwmmqwx.supabase.co';
const API_KEY = 'sb_publishable_NUBXhr6t1CTV8oN9rjn_OQ_QKCN6NF4';

export const supabase = createClient(URL, API_KEY);
