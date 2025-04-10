<script>
    let { children } = $props();
</script>

<header>
    <nav>
        <a href="/">Back</a>
    </nav>
</header>

{@render children()}

<style>
    header {
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
