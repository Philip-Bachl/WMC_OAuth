import { createDbClient } from '$lib/db/db';
import { createSupabaseClient, createSupabaseServerClient } from '$lib/db/supabase';
import { redirect, type Handle } from '@sveltejs/kit';

const publicRoutes = ["/login", "/register"];

export const handle: Handle = async ({ event, resolve }) => {

    if (!publicRoutes.some(route => event.url.pathname.startsWith(route))) {
        let superbase;

        if (event.url.pathname.startsWith("/api")) {
            superbase = createSupabaseServerClient(event.cookies);
        } else {
            superbase = createSupabaseClient();
        }

        const { data: { user } } = await superbase.auth.getUser();
        if (!user) {
            redirect(307, "/login");
        }
        const { data } = await superbase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
        event.locals.userAndRole = { user: user, role: data?.role ?? "" }; //TODO maybe change default value

        event.locals.db = createDbClient();
    }

    const response = await resolve(event);
    return response;
};