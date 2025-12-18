// 1. Define Keys
const _SUPABASE_URL = 'https://ewpmkjqcjnhtxyfqgiba.supabase.co';
const _SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3cG1ranFjam5odHh5ZnFnaWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTUyOTMsImV4cCI6MjA3Nzg5MTI5M30.i1ivEtua8fCktdit_DASxQigFg2Kb8NLn0WLLQ3LFmI';

// 2. Initialize Client
// We assign it to 'window.supabaseClient' to avoid conflict with the 'supabase' library object
if (window.supabase && window.supabase.createClient) {
    window.supabaseClient = window.supabase.createClient(_SUPABASE_URL, _SUPABASE_KEY);
} else {
    console.error("Supabase library not loaded. Check script order.");
}