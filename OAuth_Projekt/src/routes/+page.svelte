<script lang="ts">
    let { data } = $props();
    let { supabase } = $derived(data);

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        }
    };

    async function loginWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `http://localhost:5173/auth/callback`,
            },
        });
    }
</script>

<h1>Please Log in</h1>
<div class="container">
    <a href="/auth">Login</a>
    <input type="button" value="Login With Google" onclick={loginWithGoogle} />
</div>

<style>
    h1 {
        font-size: 1.5em;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        border: 2px solid black;
        border-radius: 10px;
        width: fit-content;
        padding: 20px;

        font-size: 1.5em;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container > * {
        font-size: inherit;
        font-family: inherit;
        text-decoration: none;

        position: relative;

        background-color: transparent;
        color: inherit;
        border: none;

        padding: 0;

        cursor: pointer;
    }
</style>
