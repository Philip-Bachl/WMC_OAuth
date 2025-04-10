import type { Product } from '$lib/db/product';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals: { sqliteDb, role } }): Promise<Response> {
    const product: Product = await request.json();
    if (role != "admin") return json({ product }, { status: 401 }); // Unauthorized

    console.log(product);

    sqliteDb.exec(`INSERT INTO Product VALUES ('${product.id}', '${product.name}', ${product.price}, ${product.stock})`);

    return json({ product }, { status: 201, }); // CREATED
}

export async function PUT({ request, locals: { sqliteDb, role } }): Promise<Response> {
    const products: Product[] = await request.json();
    if (role != "admin") return json({ products }, { status: 401 }); // Unauthorized

    console.log(products);

    sqliteDb.serialize(() => {
        for (let i = 0; i < products.length; i++) {
            sqliteDb.exec(`UPDATE Product SET name = '${products[i].name}', price = ${products[i].price}, stock = ${products[i].stock} WHERE id = '${products[i].id}'`);
        }
    });

    return json({ length: products.length }, { status: 200, }); // OK
}

export async function DELETE({ request, locals: { sqliteDb, role } }): Promise<Response> {
    const { id } = await request.json();
    if (role != "admin") return json({ id }, { status: 401 }); // Unauthorized

    sqliteDb.exec(`DELETE FROM Product WHERE id = '${id}'`);

    return json({ id }, { status: 200, }); // OK
}