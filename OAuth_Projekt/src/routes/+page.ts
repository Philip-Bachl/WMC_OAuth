
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
    const { supabase } = await parent(); // { session, supabase, user }

    return {
        supabase
    };
};