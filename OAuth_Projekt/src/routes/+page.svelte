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
<ul>
    <li>
        <a href="/auth">Login</a>
    </li>
    <li>
        <button type="button" onclick={loginWithGoogle}
            >Login With Google</button
        >
    </li>
</ul>
