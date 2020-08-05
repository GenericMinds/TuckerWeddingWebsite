<script lang='typescript'>
    import MenuIcon from './MenuIcon.svelte';
    import * as queryString from 'query-string';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let isLoggedIn: boolean;
    export let isNav: boolean;

    function forward() {
		dispatch('toggleLogIn');
	}
</script>

<div>
    {#if isNav === true}
        <p>#blameitonfate</p>
        <MenuIcon isLoggedIn={isLoggedIn} on:toggleLogIn={forward}/>
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