<script lang='typescript'>
    import HeadingDecorator from './HeadingDecorator.svelte';
    export let title: string;
</script>

<div>
    <h1>{title}</h1>
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
            line-height: 75px;
            padding: 0;
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