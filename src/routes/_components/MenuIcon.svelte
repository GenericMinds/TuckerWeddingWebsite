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
<img on:click={handleToggle} src='./134216-32.png' alt='hamburger menu'/>     

{#if isOpen}
    <div>
        <ul>
            <li class='home' on:click={() => {handleSectionSelection('home')}}>Home</li>
            <li on:click={() => {handleSectionSelection('story')}}>Our Story</li>
            <li on:click={() => {handleSectionSelection('clan')}}>Our Clan</li>
            <li on:click={() => {handleSectionSelection('toasts')}}>Toasts</li>
            <li on:click={() => {handleSectionSelection('propose')}}>Propose a Toast</li>
            <li on:click={() => {handleSectionSelection('blended')}}>Blended Family</li>
        </ul>
    </div>
{/if}

<style lang='scss'>
    @import 'https://fonts.googleapis.com/css?family=Princess+Sofia';
    @import '../../../static/theme.scss';

    div,ul {
        position: absolute !important;
        top: 40px;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: $accent-color-green;
        color: $accent-color-cream;
        text-align: center;
        font-size: 40px;
        overflow: hidden;
        padding: 0;
        margin: 0;
        list-style: none;
        z-index: 999;
    }

    li {
        height: 10vh;
        padding-top: 3vh;
    }

    img {
        position: fixed;
        right:0;
        top: 0;
        height: 32px;
        width:32px;
        z-index: 999;
        -webkit-backface-visibility: hidden;  
        margin: 0;
    }

    img:hover, li:hover {
        cursor: pointer;
    }

    div{ 
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>