<script>
	import SectionHeader from './SectionHeader.svelte';
    import Carousel from '@beyonk/svelte-carousel';
	import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'

</script>

<section class='clan'>
    <SectionHeader title={'Our Clan'}/>
        <!-- <Carousel perPage={1}>
            <span class="control" slot="left-control">
                <ChevronLeftIcon />
            </span>
            <div class="slide-content">
                <img alt='pic' src='https://lisaandtimpictures.s3.amazonaws.com/GrandchildrenWithBarb.jpg'>
            </div>
            <div class="slide-content">
                <img alt='pic' src='https://lisaandtimpictures.s3.amazonaws.com/Cheese.jpg'>		
            </div>
            <span class="control" slot="right-control">
                <ChevronRightIcon />
            </span>
        </Carousel> -->
</section>

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
        
        .slide-content {
            width: 30%;
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

