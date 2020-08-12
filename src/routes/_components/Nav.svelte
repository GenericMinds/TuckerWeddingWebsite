<script lang='typescript'>
    import MenuIcon from './MenuIcon.svelte';
    import Menu from './Menu.svelte';
    import * as queryString from 'query-string';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let isLoggedIn: boolean;
    let isOpen: boolean = false;

    function forward() {
		dispatch('toggleLogIn');
    }
    
    function handleToggle() {
        isOpen = !isOpen;
    }
</script>

<div>
    <p>#blameitonfate</p>
    <MenuIcon on:handleToggle={handleToggle} isOpen={isOpen}/>
    <Menu on:handleToggle={handleToggle} isLoggedIn={isLoggedIn} on:toggleLogIn={forward} isOpen={isOpen}/>
</div>

<style lang='scss'>
    @import '../../../static/theme.scss';
    
    * {
        z-index: 999;
    }
    
    div {
        background-color: $accent-color-green;
        height: 65px;
        position: absolute;
        top: 0;
    }

    p {
        color: $accent-color-cream;
        font-weight: bold;
        font-size: 30px;
        line-height: 30px;
        margin: 17.5px 0 0 30px;
    }

    @media only screen 
    and (min-width : 320px) 
    and (max-width : 450px) {   
        div {
            width: 100%;
        }
    }

    @media only screen
    and (min-width : 451px) {
        div {
            width: calc(100% - 18px) !important;
        }
    }
</style>