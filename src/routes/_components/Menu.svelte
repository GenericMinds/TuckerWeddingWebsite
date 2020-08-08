<script lang='typescript'>
    import Overlay from 'svelte-overlay';
    import * as animateScroll from 'svelte-scrollto';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let isLoggedIn: boolean;
    export let isOpen: boolean;

    function logOut() {
        dispatch("toggleLogIn");
        handleSectionSelection('home');
    }

    function handleSectionSelection(section): void {
        isOpen = false;
        if (section == 'home') {
            animateScroll.scrollToTop();
            return;
        }
        animateScroll.scrollTo({element: '.' + section, offset: -62.5});
    }
</script>

{#if isOpen}
    <div class='menu'>
        <ul>
            <li class='home' on:click={() => {handleSectionSelection('home')}}>
                <div class='arrow'>
                    <img src='./icons8-collapse-arrow-50.png' alt='arrow'/>
                </div>
                <div class='section'>Home</div>
            </li>
            <li on:click={() => {handleSectionSelection('story')}}>
                <div class='arrow'>
                    <img src='./icons8-collapse-arrow-50.png' alt='arrow'/>
                </div>
                <div class='section'>Our Story</div>
            </li>
            <li on:click={() => {handleSectionSelection('clan')}}>                
                <div class='arrow'>
                    <img src='./icons8-collapse-arrow-50.png' alt='arrow'/>
                </div>
                <div class='section'>Our Clan</div>
            </li>
            <li on:click={() => {handleSectionSelection('toasts')}}>
                <div class='arrow'>
                    <img src='./icons8-collapse-arrow-50.png' alt='arrow'/>
                </div>
                <div class='section'>Toasts</div>
            </li>
            <li on:click={() => {handleSectionSelection('propose')}}>
                <div class='arrow'>
                    <img src='./icons8-collapse-arrow-50.png' alt='arrow'/>
                </div>
                <div class='section'>Propose a Toast</div>
            </li>
            <li on:click={() => {handleSectionSelection('blended')}}>
                <div class='arrow'>
                    <img src='./icons8-collapse-arrow-50.png' alt='arrow'/>
                </div>
                <div class='section'>Blended Family</div>
            </li>
        {#if isLoggedIn}
            <li on:click={logOut}>
                <div class='arrow'>
                    <img src='./icons8-collapse-arrow-50.png' alt='arrow'/>
                </div>
                <div class='section'>Log out</div>
            </li>
        {/if}
        </ul>
    </div>
{/if}

<style lang='scss'>
    @import 'https://fonts.googleapis.com/css?family=Princess+Sofia';
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
        .menu {
            position: absolute;
            top: 65px;
            right: 0;
            width: 25%;
            height: 100vh;
            background-color: $accent-color-green;
            color: $accent-color-cream;
            z-index: 999;
        }

        ul {
            text-align: center;
            font-size: 35px;
            overflow: hidden;
            padding: 0;
            margin: 0;
            list-style: none;
            height: 100%;
        }

        li:hover {
            background-color: #2E4A2E;
            div {
                text-decoration: underline;
                cursor: pointer;
            }
        }

        li div {
            display: block;
            height: 100%;
            text-align:center;
            height: 150px;
            line-height: 150px;
        }

        .arrow {
            float: left;
            width:6.25%;
        }

        img {
            padding-top: 50px;
            width: 100%; 
        }

        .section {
            width: 93.75%;
            float: right;
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