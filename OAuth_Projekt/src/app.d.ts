import type { Database } from "sqlite3";
import { User } from '@supabase/supabase-js'
import type { UserAndRole } from "$lib/db/userAndRole";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userAndRole: UserAndRole;
			db: Database;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
