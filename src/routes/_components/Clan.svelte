<script lang='typescript'>
    import { onMount } from 'svelte';
	import Carousel from '@beyonk/svelte-carousel';
    import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons';
    import SectionHeader from './SectionHeader.svelte';
    import { S3ImageDataModel } from '../_models/S3ImageDataModel';

    let photos: S3ImageDataModel[];

    onMount(async (): Promise<void> => {
        const res = await fetch('api/awsController');
        photos = await res.json();
    });
</script>

<section class='clan'>
    <SectionHeader title={'Our Clan'}/>
    <div class='outterWrapper'>
        <div class='innerWrapper'>
            {#if photos}        
                <Carousel perPage={1} dots={false}>
                    <span class="control left" slot="left-control">
                        <ChevronLeftIcon />
                    </span>
                        {#each photos as photo}
                            <div class="slide-content">
                                <img src={photo && photo.url} alt={photo && photo.alt}>
                            </div>
                        {/each}
                    <span class="control right" slot="right-control">
                        <ChevronRightIcon />
                    </span>
                </Carousel> 
                <br/>
                <br/>
            {/if}
        </div>
    </div>
</section>

<style lang='scss'>
    @import '../../../static/theme.scss';
    
    .outterWrapper {
        background-color: $primary-color !important;
        padding-bottom: 20px;
        box-sizing: content-box;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px; 
    }

    .innerWrapper {
        margin: 0 auto;
        height: 300px;
        width: 300px;
        overflow:hidden;
        background-color: $primary-color !important;
        border-radius: 10px;
    } 

    .control :global(svg) {
        color: $secondary-color;
    }

    .left {
        float: left;
    }
    
    .right {
        float: right;
    }

    .slide-content {
        display: flex;
        flex-direction: column;
        height: 300px;
    }
        
    img {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
        background-color: $primary-color !important;
    }

    @media only screen 
    and (min-width : 320px) 
    and (max-width : 450px) {   
        
        .innerWrapper {
            height: 300px;
            width: 300px;
        }
        
        .control :global(svg) {
            width: 50%;
            height: 50%;
        }

        .slide-content {
            height: 300px;
        }
    }
    
    @media only screen 
    and (min-width : 451px)
    and (max-width : 1224px) {        
        .innerWrapper {
            height: 400px;
            width: 400px;
        }
        
        .control :global(svg) {
            width: 50%;
            height: 50%;
        }
        
        .slide-content {
            height: 400px;
        }
    }
    
    @media only screen 
    and (min-width : 1225px) {    
        .innerWrapper {
            height: 600px;
            width: 600px;
        }
        
        .control :global(svg) {
            width: 100%;
            height: 100%;
            border: 2px solid $secondary-color;
            border-radius: 32px;
        }
        
        .slide-content {
            height: 600px;
        }
    }
</style>