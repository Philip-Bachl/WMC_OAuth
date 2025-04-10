<form method="POST" action="?/login">
    <label>
        Email
        <input name="email" type="email" />
    </label>
    <label>
        Password
        <input name="password" type="password" />
    </label>
    <button>Login</button>
    <button formaction="?/signup">Sign up</button>
</form>

<style>
    input,
    label {
        margin-bottom: 20px;

        font-size: 1em;
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;

        position: relative;

        background-color: transparent;
        color: black;
        cursor: pointer;
    }
</style>
