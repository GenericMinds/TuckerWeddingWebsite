<script>
    import SectionHeader from './SectionHeader.svelte';
	import Carousel from '@beyonk/svelte-carousel';
    import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons';

	let carousels = [
		{
            perPage: 1,
            dots: false
		}
    ]
    
    let photos = [
        'https://lisaandtimpictures.s3.amazonaws.com/GrandchildrenWithBarb.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/Cheese.jpg',	
        'https://lisaandtimpictures.s3.amazonaws.com/MovingDay.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/FireAndIce.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/WithLiam.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/Lake.jpg',	
        'https://lisaandtimpictures.s3.amazonaws.com/WithNora.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/Masks.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/CarenaAndDog.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/Masks2.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/RhiannahAndAdam.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/SportsBar.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/SummerAndClan.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/StPatricksDay.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/ToryAndCarenaAndBri.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/ToryAndClan.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/AustinAndClan.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/Grandchildren.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/ShannonAndClan.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/WithRhiannah.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/LisaAndAdam.jpg',
        'https://lisaandtimpictures.s3.amazonaws.com/NanaAndPoppop.jpg'
    ];
</script>

<section class='clan'>
    <SectionHeader title={'Our Clan'}/>
    <div class='wrapper2'>
    <div class="demo">
        {#each carousels as carousel}
        <Carousel {...carousel}>
            <span class="control left" slot="left-control">
                <ChevronLeftIcon />
            </span>
            {#each photos as photo}
            <div class="slide-content">
                <img src={photo} alt='pic'>
            </div>
            {/each}
            <span class="control right" slot="right-control">
                <ChevronRightIcon />
            </span>
        </Carousel>
        <br/>
        <br/>
        {/each}
    </div>
    </div>
</section>

<style lang='scss'>
    @import '../../../static/theme.scss';

    @media only screen 
    and (min-width : 320px) 
    and (max-width : 450px) {   
            .wrapper2 {
            height: 300px;
            width: 100%;
            background-color:red;
            background-color: $accent-color-green;
            padding-bottom: 20px;
            box-sizing: content-box;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px; 
        }
        
        .demo {
            margin: 0 auto;
            height: 300px;
            width: 300px;
            overflow:hidden;
            background-color: $background-color;
            border-radius: 10px;
        }
        
        .control :global(svg) {
            width: 50%;
            height: 50%;
            color: $accent-color-green;
        }

        .left {
            float: left;
        }
        
        .right {
            float: right;
        }
        .slide-content {
            border: 1px solid #eee;
            display: flex;
            flex-direction: column;
            height: 300px;
        }
        
        img {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    
    @media only screen 
    and (min-width : 451px) {
        .wrapper2 {
            height: 600px;
            width: 100%;
            background-color:red;
            background-color: $accent-color-green;
            padding-bottom: 20px;
            box-sizing: content-box;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px; 
        }
        
        .demo {
            margin: 0 auto;
            height: 600px;
            width: 600px;
            overflow:hidden;
            background-color: $background-color;
            border-radius: 10px;
        }
        
        .control :global(svg) {
            width: 100%;
            height: 100%;
            color: $accent-color-green;
            border: 2px solid $accent-color-green;
            border-radius: 32px;
        }
        
        .slide-content {
            border: 1px solid #eee;
            display: flex;
            flex-direction: column;
            height: 600px;
        }
        
        img {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
