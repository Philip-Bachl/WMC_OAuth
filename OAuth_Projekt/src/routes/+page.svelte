<!-- Main Page -->
<script lang="ts">
    import type { PageServerData } from "./$types";

    const data: PageServerData = $props();
</script>

{#each data.products as product}
    <h1>{product.name}</h1>
    <p>{product.id}</p>
    <p>{product.price}€</p>
    <p>{product.stock} left</p>
{/each}