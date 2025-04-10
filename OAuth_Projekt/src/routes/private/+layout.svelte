<script lang="ts">
    import { goto } from "$app/navigation";

    let { data, children } = $props();
    let { supabase } = $derived(data);

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        }
        goto("/");
    };
</script>

<header>
    <button onclick={logout}>Logout</button>
</header>
<main>
    {@render children()}
</main>

<style>
    header {
        display: flex;
        flex-direction: row-reverse;

        box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.2);
        padding: 20px;
        margin-bottom: 20px;

        font-size: 1.5em;
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;

        position: relative;

        background-color: transparent;
        color: black;
        border: none;

        padding: 20px;

        cursor: pointer;
    }
</style>
