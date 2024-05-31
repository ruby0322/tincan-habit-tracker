import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_TESTING === 'true' ? process.env.NEXT_PUBLIC_TESTING_SUPABASE_URL! : process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_TESTING === 'true' ? process.env.NEXT_PUBLIC_TESTING_SUPABASE_ANON_KEY! : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

