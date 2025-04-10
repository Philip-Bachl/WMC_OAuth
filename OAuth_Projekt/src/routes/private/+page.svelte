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

    async function sendFetch(method: string, body: string) {
        await fetch("/private/api", {
            method: method,
            body: body,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    }

    function markDirty(index: number) {
        const productElement = document.querySelectorAll(".product")[index];
        const dirtyId: HTMLSpanElement | null =
            productElement.querySelector(".id");
        const dirtyName: HTMLInputElement | null =
            productElement.querySelector(".name");
        const dirtyPrice: HTMLInputElement | null =
            productElement.querySelector(".price");
        const dirtyStock: HTMLInputElement | null =
            productElement.querySelector(".stock");

        const parsedDirtyId = dirtyId?.innerText ?? "";

        const dirtyProduct = {
            id: dirtyId?.innerText ?? "",
            name: dirtyName?.value ?? "",
            price: parseInt(dirtyPrice?.value ?? "-1", 10),
            stock: parseInt(dirtyStock?.value ?? "-1", 10),
        };

        noDupe: {
            for (let i = 0; i < dirtyProducts.length; i++) {
                if (dirtyProducts[i].id == dirtyProduct.id) {
                    dirtyProducts[i] = dirtyProduct;
                    break noDupe;
                }
            }

            dirtyProducts.push(dirtyProduct);
        }
    }

    let id: string = $state("");
    let name: string = $state("");
    let price: number = $state(0);
    let stock: number = $state(0);

    async function createProduct() {
        //TODO input validation
        const product: Product = {
            id: id,
            name: name,
            price: price,
            stock: stock,
        };
        await sendFetch("POST", JSON.stringify(product));
        location.reload();
    }

    async function updateDirtyProducts() {
        console.log("dirty products:", dirtyProducts);
        await sendFetch("PUT", JSON.stringify(dirtyProducts));
        location.reload();
    }

    async function deleteProduct(product: Product) {
        await sendFetch("DELETE", JSON.stringify({ id: product.id }));
        location.reload();
    }
</script>

<div class="container">
    <div id="products">
        {#each productsAndIndecies as productAndIndex}
            <div class="product">
                {#if role == "admin"}
                    <h1>
                        ID: <span class="id">{productAndIndex.product.id}</span>
                    </h1>
                    <p>
                        Name: <input
                            type="text"
                            name="name"
                            class="name"
                            value={productAndIndex.product.name}
                            oninput={() => markDirty(productAndIndex.index)}
                        />
                    </p>
                    <p>
                        Price: <input
                            type="number"
                            name="price"
                            class="price"
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
                            class="stock"
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
        <button type="button" onclick={() => updateDirtyProducts()}
            >Update</button
        >
        <hr />
        <div class="create">
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
                    Name: <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        bind:value={name}
                    />
                </p>
                <p>
                    Price: <input
                        type="number"
                        name="price"
                        id="price"
                        min="0"
                        step="0.01"
                        placeholder="Price"
                        bind:value={price}
                    />€
                </p>
                <p>
                    Stock: <input
                        type="number"
                        name="stock"
                        id="stock"
                        min="0"
                        placeholder="Stock"
                        bind:value={stock}
                    /> left
                </p>
                <button type="button" onclick={() => createProduct()}
                    >Create</button
                >
            </div>
        </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    hr {
        width: 100%;
    }

    button {
        width: fit-content;
    }

    .product,
    .create {
        border: 2px solid black;
        border-radius: 10px;
        width: fit-content;
        padding: 20px;
    }
</style>
