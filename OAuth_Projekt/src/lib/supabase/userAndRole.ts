import type { User } from "@supabase/supabase-js";

export interface UserAndRole {
    user: User,
    role: string,
}