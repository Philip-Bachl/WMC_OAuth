import type { PageServerLoad } from "./$types";

import type { Product } from "$lib/db/product"

export const load: PageServerLoad = async ({ locals }) => {
    const loadDataPromise = new Promise<Product[]>((resolve, reject) => {
        locals.db.all<Product>("SELECT * FROM Product", (err: Error | null, rows: Product[]) => {
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
        isAdmin: locals.userAndRole.role == "admin"
    };
};