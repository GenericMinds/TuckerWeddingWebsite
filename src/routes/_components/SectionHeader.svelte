<script lang='typescript'>
    import HeadingDecorator from './HeadingDecorator.svelte';
    export let title: string;
</script>

<div>
    <h1>{title}</h1>
    <HeadingDecorator />
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
    and (min-width : 1025px) {
        div {
            background-color: $accent-color-green;
            height: 120px;
            line-height: 120px;
            width: 100%;
            margin-top: 20px;
            padding: 0;
	        border-top-left-radius: 10px;
	        border-top-right-radius: 10px;
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