import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { RequestEvent } from "../../routes/$types";
import { createServerClient } from "@supabase/ssr";

export const PUBLIC_SUPABASE_URL = "TODO";
export const PUBLIC_SUPABASE_ANON_KEY = "TODO";

export function createSupabaseClient(): SupabaseClient {
    return createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}

export function createSupabaseServerClient(requestEvent: RequestEvent) {
    return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll() {
                return requestEvent.cookies.getAll()
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => requestEvent.cookies.set(name, value, { ...options, path: '/' }));
            },
        },
    });
}