<script lang='typescript'>
    import Overlay from 'svelte-overlay';
    import * as animateScroll from 'svelte-scrollto';
    let isOpen: boolean = false;

    function handleToggle(): void {
        isOpen = !isOpen;
    }

    function handleSectionSelection(section): void {
        isOpen = false;
        if (section == 'home') {
            animateScroll.scrollToTop();
            return;
        }
        animateScroll.scrollTo({element: '.' + section});
    }
</script>

<div>
    <img alt="daBurger" src="./Hamburger_icon.svg" />
</div>

<!-- <Overlay on:toggle={handleToggle} zIndex={100} bind:isOpen={isOpen}>    
    <svg slot='parent' on:click={handleToggle} x='0px' y='0px' viewBox='0 0 50 50' enable-background='new 0 0 50 50' xml:space='preserve' height='40px' width='40px'>
            <path fill='#ddd499' d='M8.667,15h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,15,8.667,15z'/>
            <path fill='#ddd499' d='M8.667,37h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,37,8.667,37z'/>
            <path fill='#ddd499' d='M8.667,26h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,26,8.667,26z'/>
     </svg>
    <ul slot='content'>
        <li class='home' on:click={() => {handleSectionSelection('home')}}>Home</li>
        <li on:click={() => {handleSectionSelection('story')}}>Our Story</li>
        <li on:click={() => {handleSectionSelection('clan')}}>Our Clan</li>
        <li on:click={() => {handleSectionSelection('toasts')}}>Toasts</li>
        <li on:click={() => {handleSectionSelection('propose')}}>Propose a Toast</li>
        <li on:click={() => {handleSectionSelection('blended')}}>Blended Family</li>
    </ul>
</Overlay> -->

<style lang='scss'>
    @import 'https://fonts.googleapis.com/css?family=Princess+Sofia';
    @import '../../../static/theme.scss';

    ul {
        position:fixed;
        top: 40px;
        right: 0;
        bottom: 0;
        left: 0;
        width: $full-size;
        height: $full-size;
        background: $accent-color-green;
        color: $accent-color-cream;
        text-align: center;
        font-size: 40px;
        overflow: hidden;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    li {
        height: 15vh;
        padding-top: 3vh;
    }

    img {
        position: fixed;
        right: 0;
        top: 0;
    }

    img:hover, li:hover {
        cursor: pointer;
    }
</style>