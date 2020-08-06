<script lang='typescript'>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let isOpen: boolean = false;

    function handleToggle(): void {
        dispatch('handleToggle');
    }
</script>

<img on:click={handleToggle} src='./134216-32.png' alt='hamburger menu'/>     

<style lang='scss'>
    @import 'https://fonts.googleapis.com/css?family=Princess+Sofia';
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
        img {
            position: fixed;
            right: 30px;
            top: 15px;
            height: 45px;
            width: 45px;
            margin: 0;
        }

        img:hover, li:hover {
            cursor: pointer;
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