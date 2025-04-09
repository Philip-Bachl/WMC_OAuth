import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import type { Database } from 'sqlite3';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null; role: string | null }>;
			session: Session | null;
			user: User | null;
			role: string | null;
			sqliteDb: Database;
		}
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { }