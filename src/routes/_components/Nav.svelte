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
    <Menu isLoggedIn={isLoggedIn} on:toggleLogIn={forward} isOpen={isOpen}/>
</div>

<style lang='scss'>
    @import '../../../static/theme.scss';
    
    /* Smartphones (portrait and landscape) -------------------- */
    @media only screen 
    and (min-device-width : 320px) 
    and (max-device-width : 480px) {   
    }
    /* --------------------------------------------------------- */

    /* iPads (portrait and landscape) -------------------------- */
    @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px) {
    }
    /* --------------------------------------------------------- */

    /* Desktops and Laptops ------------------------------------ */
    @media only screen
    and (min-width : 1224px) {
        div {
            background-color: $accent-color-green;
            height: 75px;
            width: 100%;
            position: absolute;
        }

        p {
            color: $accent-color-cream;
            font-weight: bold;
            font-size: 40px;
            line-height: 40px;
            margin: 17.5px;
        }
    }
    /* --------------------------------------------------------- */

    /* iPhone 4 ----------- */
    @media
    only screen and (-webkit-min-device-pixel-ratio : 1.5),
    only screen and (min-device-pixel-ratio : 1.5) {
    }
    /* --------------------------------------------------------- */
</style>