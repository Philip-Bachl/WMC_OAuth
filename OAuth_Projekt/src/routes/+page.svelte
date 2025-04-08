<!-- Main Page -->
<script lang="ts">
    import type { PageServerData } from "./$types";

    const { data }: { data: PageServerData } = $props();
</script>

{#each data.products as product}
    <h1>{product.name}</h1>
    <p>ID: {product.id}</p>
    <p>Price: {product.price}€</p>
    <p>Stock: {product.stock} left</p>
{/each}