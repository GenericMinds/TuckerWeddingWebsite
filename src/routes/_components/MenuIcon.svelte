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

<Overlay on:toggle={handleToggle} zIndex={100} bind:isOpen={isOpen}>    
    <img slot='parent' src='./134216-32.png' on:click={() => handleToggle()} alt='hamburger menu'/>
     
    <ul slot='content'>
        <li class='home' on:click={() => {handleSectionSelection('home')}}>Home</li>
        <li on:click={() => {handleSectionSelection('story')}}>Our Story</li>
        <li on:click={() => {handleSectionSelection('clan')}}>Our Clan</li>
        <li on:click={() => {handleSectionSelection('toasts')}}>Toasts</li>
        <li on:click={() => {handleSectionSelection('propose')}}>Propose a Toast</li>
        <li on:click={() => {handleSectionSelection('blended')}}>Blended Family</li>
    </ul>
</Overlay>

<style lang='scss'>
    @import 'https://fonts.googleapis.com/css?family=Princess+Sofia';
    @import '../../../static/theme.scss';

    ul {
        position: fixed;
        -webkit-backface-visibility: hidden;  
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
        -webkit-backface-visibility: hidden;  
        height: 15vh;
        padding-top: 3vh;
    }

    img {
        position: fixed;
        -webkit-backface-visibility: hidden;  
        right: 0;
        top: 0;
        height:32px;
        width: 32px;
        margin: 0;
    }

    img:hover, li:hover {
        cursor: pointer;
    }
</style>