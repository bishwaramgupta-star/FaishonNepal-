/* Public Supabase browser client for FaishonNepal. Never put a service-role/secret key here. */
const SUPABASE_URL = 'https://bgmnrxottisugfvhfixf.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_8dOP3QERDoymePP97fkcew_r4nJhZRj';
window.faishonSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function currentUser(){
  const {data:{user}} = await window.faishonSupabase.auth.getUser();
  return user;
}

async function signOut(){
  await window.faishonSupabase.auth.signOut();
  window.location.href='index.html';
}

window.currentUser = currentUser;
window.signOut = signOut;
