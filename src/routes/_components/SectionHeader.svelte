<script lang='typescript'>
    import MenuIcon from './MenuIcon.svelte';

    export let isNav: boolean;
</script>

<div>
    {#if isNav === true}
        <p>#blameitonfate</p>
        <MenuIcon />
    {/if}
</div>

<style lang='scss'>
    @import '../../../static/theme.scss';
    div {
        background-color: $accent-color-green;
        height: $default-line-height;
        line-height: $default-line-height;
    }

        p {
        display: initial;
        color: $accent-color-cream;
        font-weight: bold;
        font-size: $small-font-size;
    }
</style>