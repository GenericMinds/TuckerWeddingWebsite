<script>
    import Carousel from '@beyonk/svelte-carousel';
	import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'
</script>

<section class='family'>
    <h1>Our Family</h1>
    <img alt='Heading Decoration' src='./HeadingDecorator.png'/>
<Carousel>
  <div class="slide-content"><img alt='hi' src='./LisaTimMainPhoto.jpg'/></div>
  <div class="slide-content">Slide 2</div>
  <div class="slide-content">Slide 3</div>
  <div class="slide-content">Slide 4</div>
</Carousel>

</section>

<style lang='scss'>
    @import '../../../static/theme.scss';
    img {
        width: $full-size/2;
        margin-top: -20px;
    }

    div {
        background-color: $accent-color-green;
        height: 80vh;
        width: $full-size;
    }
</style>
