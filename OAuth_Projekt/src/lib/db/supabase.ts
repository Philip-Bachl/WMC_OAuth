import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { RequestEvent } from "../../routes/$types";
import { createServerClient } from "@supabase/ssr";
import type { Cookies } from "@sveltejs/kit";

export const PUBLIC_SUPABASE_URL = "TODO";
export const PUBLIC_SUPABASE_ANON_KEY = "TODO";

export function createSupabaseClient(): SupabaseClient {
    return createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}

export function createSupabaseServerClient(cookies: Cookies) {
    return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll() {
                return cookies.getAll()
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => cookies.set(name, value, { ...options, path: '/' }));
            },
        },
    });
}