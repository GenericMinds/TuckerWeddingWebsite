<div><img src='LisaTimMainPhoto.jpg' alt='Lisa and Tim posing during a hike in the woods.'/></div>

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
        img {
            width: 100%;
            object-fit: cover;
            border: 2px solid $accent-color-cream;
            box-sizing: border-box;
            border-radius: 10px;
        }

        div {
            width: 100%;
            text-align: center;
            margin-top: 85px;
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