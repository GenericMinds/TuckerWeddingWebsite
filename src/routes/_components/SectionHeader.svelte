<script>
    import MenuIcon from './MenuIcon.svelte';

    export let isNav;
</script>

<div>
    {#if isNav === true}
        <p>#blameitonfate</p>
        <MenuIcon />
    {/if}
</div>

<style>
    div {
        background-color: #375637;
        height: 40px;
        line-height: 40px;
    }

        p {
        display: initial;
        color: #ddd499;
        font-weight: bold;
    }
</style>