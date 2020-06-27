<script>
	import Carousel from '@beyonk/svelte-carousel';
	import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'
	let carousels = [
		{
			perPage: 1
		},
		{
			perPage: 1,
			controls: false
		}
	]
	function changed (event) {
		console.log(event.detail.currentSlide)
	}
</script>

<section class='clan'>
    <h1>Our Clan</h1>
    <img alt='Heading Decoration' class='headingDecorator' src='./HeadingDecorator.png'/>
</section>
<div class="demo">
    {#each carousels as carousel}
    <Carousel on:change={changed} {...carousel}>
        <span class="control" slot="left-control">
            <ChevronLeftIcon />
        </span>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/GrandchildrenWithBarb.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Cheese.jpg)">		
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/MovingDay.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/FireAndIce.jpg)">	
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/WithLiam.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Lake.jpg)">	
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/WithNora.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Masks.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/CarenaAndDog.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Masks2.jpg)">
            </header>
        </div>				
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/RhiannahAndAdam.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/SportsBar.jpg)">
            </header>
        </div>		
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/SummerAndClan.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/StPatricksDay.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/ToryAndCarenaAndBri.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/ToryAndClan.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/AustinAndClan.jpg)">
            </header>
        </div>        
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Grandchildren.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/ShannonAndClan.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/WithRhiannah.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/LisaAndAdam.jpg)">
            </header>
        </div>
        <div class="slide-content">
            <header style="background-image: url(https://lisaandtimpictures.s3.amazonaws.com/NanaAndPoppop.jpg)">
            </header>
        </div>
        <span class="control" slot="right-control">
            <ChevronRightIcon />
        </span>
    </Carousel>
    <br/>
    <br/>
    {/each}
</div>
<style lang='scss'>
    @import '../../../static/theme.scss';
    .headingDecorator {
        width: $full-size/2;
        margin-top: -20px;    
    }

	.demo {
		margin: 0 auto;
		height: 300px;
		width: 60vw;
	}
	
	.control :global(svg) {
		width: 100%;
		height: 100%;
		color: #fff;
		border: 2px solid #fff;
		border-radius: 32px;
	}
	
	.slide-content {
		border: 1px solid #eee;
		display: flex;
		flex-direction: column;
		height: 300px;
        background-color: beige;
	}
	
	.slide-content header {
		flex: 1;
		background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-color: $accent-color-green;
        border: 3px solid $accent-color-cream-2;
	}
</style>

