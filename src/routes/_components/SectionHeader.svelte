<script lang='typescript'>
    import MenuIcon from './MenuIcon.svelte';
    import * as queryString from 'query-string';

    declare const FB: any;

    function logout(){
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                FB.logout(function(response) {
                    console.log(response);
                });
            }
        });
    }

    function login() {
        FB.getLoginStatus(function(response) {
            if (response.status !== 'connected') {
                FB.login(function(response) {
                    console.log(response);
                });
            }
        });
    }

    export let isNav: boolean;
</script>

<div>
    {#if isNav === true}
        <p>#blameitonfate</p>
        <button on:click={login}>Login</button>
        <button on:click={logout}>Logout</button>
        <MenuIcon />
    {/if}
</div>

<style lang='scss'>
    @import '../../../static/theme.scss';
    div {
        background-color: $accent-color-green;
        height: $default-line-height;
        line-height: $default-line-height;
        padding: 0;
    }

        p {
        display: initial;
        color: $accent-color-cream;
        font-weight: bold;
        font-size: $small-font-size;
    }
</style>