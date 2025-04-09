<!-- Main Page -->
<script lang="ts">
    import type { Product } from "$lib/db/product";

    const { data } = $props();
    const { products, role } = data;

    const productsAndIndecies = products.map((p: Product, i: number) => ({
        product: p,
        index: i,
    }));

    const dirtyProducts: Product[] = [];

    async function sendFetch(url: string, method: string, body: string) {
        await fetch(url, {
            method: method,
            body: body,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    }

    function markDirty(index: number) {
        if (!dirtyProducts.includes(products[index])) {
            dirtyProducts.push(products[index]);
        }
    }

    function updateDirtyProducts() {
        sendFetch("/", "PUT", JSON.stringify(dirtyProducts));
    }

    function deleteProduct(product: Product) {
        sendFetch("/", "DELETE", JSON.stringify({ id: product.id }));
    }

    let id: string = $state("");
    let name: string = $state("");
    let price: number = $state(0);
    let stock: number = $state(0);

    function createProduct() {
        //TODO input validation
        const product: Product = {
            id: id,
            name: name,
            price: price,
            stock: stock,
        };
        sendFetch("/", "POST", JSON.stringify(product));
    }
</script>

<div id="products">
    {#each productsAndIndecies as productAndIndex}
        <div class="product">
            {#if role == "admin"}
                <h1>ID: {productAndIndex.product.id}</h1>
                <p>
                    Name: <input
                        type="text"
                        name="name"
                        value={productAndIndex.product.name}
                        oninput={() => markDirty(productAndIndex.index)}
                    />
                </p>
                <p>
                    Price: <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        value={productAndIndex.product.price}
                        oninput={() => markDirty(productAndIndex.index)}
                    />€
                </p>
                <p>
                    Stock: <input
                        type="number"
                        name="stock"
                        min="0"
                        value={productAndIndex.product.stock}
                        oninput={() => markDirty(productAndIndex.index)}
                    /> left
                </p>
                <button
                    type="button"
                    onclick={() => deleteProduct(productAndIndex.product)}
                    >Delete</button
                >
            {:else}
                <h1>ID: {productAndIndex.product.id}</h1>
                <p>{productAndIndex.product.name}</p>
                <p>Price: {productAndIndex.product.price}€</p>
                <p>Stock: {productAndIndex.product.stock} left</p>
            {/if}
        </div>
    {/each}
</div>

{#if role == "admin"}
    <button type="button" onclick={() => updateDirtyProducts()}>Submit</button>

    <div id="createProduct">
        <h1>
            ID: <input
                type="text"
                name="id"
                id="id"
                placeholder="ID"
                bind:value={id}
            />
        </h1>
        <p>
            Name: <input type="text" name="name" id="name" placeholder="Name" />
        </p>
        <p>
            Price: <input
                type="number"
                name="price"
                id="price"
                min="0"
                step="0.01"
                placeholder="Price"
            />€
        </p>
        <p>
            Stock: <input
                type="number"
                name="stock"
                id="stock"
                min="0"
                placeholder="Stock"
            /> left
        </p>
        <button type="button" onclick={() => createProduct()}>Create</button>
    </div>
{/if}
