import type { Product } from '$lib/db/product';
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase, sqliteDb, role } }) => {
    const loadDataPromise = new Promise<Product[]>((resolve, reject) => {
        sqliteDb.all<Product>("SELECT * FROM Product", (err: Error | null, rows: Product[]) => {
            if (err) {
                console.error("product fetching failed.");
                resolve([]);
                return;
            }
            resolve(rows);
        });
    });
    const rows = await loadDataPromise;

    return {
        products: rows,
        role
    };
};