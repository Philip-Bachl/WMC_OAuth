import type { Product } from '$lib/db/product';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies, locals}): Promise<Response> {
    //TODO Input validation
    const product: Product = await request.json();

    locals.db.exec(`INSERT INTO Product VALUES (${product.id}, ${product.name}, ${product.price}, ${product.stock})`);

    return json({ product }, {status: 201, }); // CREATED
}

export async function PUT({ request, cookies, locals}): Promise<Response> {
    //TODO Input validation
    const products: Product[] = await request.json();

    locals.db.serialize(() => {
        for (let i = 0; i < products.length; i++) {
            locals.db.exec(`UPDATE Products SET name = ${products[i].name}, price = ${products[i].price}, stock = ${products[i].stock}`);
        }
    });

    return json({ length: products.length }, {status: 200, }); // OK
}

export async function DELETE({ request, cookies, locals}): Promise<Response> {
    //TODO Input validation
    const { id } = await request.json();

    locals.db.exec(`DELETE FROM Product WHERE id = ${id}`);

    return json({ id }, {status: 200, }); // OK
}