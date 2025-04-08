import { createDbClient } from '$lib/db/db';
import { createSupabaseClient } from '$lib/db/supabase';
import { redirect, type Handle } from '@sveltejs/kit';

const protectedRoutes = ["/api", "/admin"];

export const handle: Handle = async ({ event, resolve }) => {

    if (event.url.pathname == "/" || protectedRoutes.some(route => event.url.pathname.startsWith(route))) {
        const superbase = createSupabaseClient();
        const { data: { user } } = await superbase.auth.getUser();
        if (!user) {
            redirect(307, "/login");
        }
        const { data } = await superbase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
        event.locals.userAndRole = { user: user, role: data?.role ?? "" };

        event.locals.db = createDbClient();
    }

    const response = await resolve(event);
    return response;
};