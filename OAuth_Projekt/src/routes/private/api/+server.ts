import type { Product } from '$lib/db/product';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals: { sqliteDb } }): Promise<Response> {
    //TODO Input validation
    const product: Product = await request.json();

    console.log(product);

    sqliteDb.exec(`INSERT INTO Product VALUES ('${product.id}', '${product.name}', ${product.price}, ${product.stock})`);

    return json({ product }, { status: 201, }); // CREATED
}

export async function PUT({ request, locals: { sqliteDb } }): Promise<Response> {
    //TODO Input validation
    const products: Product[] = await request.json();

    console.log(products);

    sqliteDb.serialize(() => {
        for (let i = 0; i < products.length; i++) {
            sqliteDb.exec(`UPDATE Product SET name = '${products[i].name}', price = ${products[i].price}, stock = ${products[i].stock} WHERE id = '${products[i].id}'`);
        }
    });

    return json({ length: products.length }, { status: 200, }); // OK
}

export async function DELETE({ request, locals: { sqliteDb } }): Promise<Response> {
    //TODO Input validation
    const { id } = await request.json();

    sqliteDb.exec(`DELETE FROM Product WHERE id = '${id}'`);

    return json({ id }, { status: 200, }); // OK
}