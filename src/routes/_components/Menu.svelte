<script lang='typescript'>
    import { createEventDispatcher } from 'svelte';
    import Overlay from 'svelte-overlay';
    import * as animateScroll from 'svelte-scrollto';

    const dispatch: any = createEventDispatcher();
    export let isLoggedIn: boolean;
    export let isOpen: boolean;
    
    function logOut(): void {
        dispatch("toggleLogIn");
        handleSectionSelection('home');
    }

    function handleSectionSelection(section: string): void {
        dispatch('handleToggle');
        if (section == 'home') {
            animateScroll.scrollToTop();
            return;
        }
        animateScroll.scrollTo({ element: '.' + section, offset: -85 });
    }
</script>

{#if isOpen}
    <div class='menu'>
        <ul>
            <li on:click={() => { handleSectionSelection('home') }}>
                <div class='arrow'>
                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>
                </div>
                <div class='section'>Home</div>
            </li>
            <li on:click={() => { handleSectionSelection('story') }}>
                <div class='arrow'>
                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>
                </div>
                <div class='section'>Our Story</div>
            </li>
            <li on:click={() => { handleSectionSelection('clan') }}>                
                <div class='arrow'>
                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>
                </div>
                <div class='section'>Our Clan</div>
            </li>
            <li on:click={() => { handleSectionSelection('toasts') }}>
                <div class='arrow'>
                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>
                </div>
                <div class='section'>Toasts</div>
            </li>
            <li on:click={() => { handleSectionSelection('propose') }}>
                <div class='arrow'>
                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>
                </div>
                <div class='section'>Propose a Toast</div>
            </li>
            <li on:click={() => { handleSectionSelection('blended') }}>
                <div class='arrow'>
                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>
                </div>
                <div class='section'>Blended Family</div>
            </li>
            {#if isLoggedIn}
                <li on:click={logOut}>
                    <div class='arrow'>
                        <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>
                    </div>
                    <div class='section'>Log out</div>
                </li>
            {/if}
        </ul>
    </div>
{/if}

<style lang='scss'>
    @import '../../../static/theme.scss';
    @import 'https://fonts.googleapis.com/css?family=Princess+Sofia';
    
    .menu {
        position: absolute;
        top: 65px;
        right: 0;
        height: 100vh;
        background-color: $secondary-color;
        color: $primary-color;
        z-index: 999;
    }

    ul {
        text-align: center;
        font-size: 35px;
        overflow: hidden;
        padding: 20px 0 0 0;
        margin: 0;
        list-style: none;
        height: 100%;
    }

    li:hover {
        background-color: $hover-color;
        div {
            text-decoration: underline;
            cursor: pointer;
        }
    }

    li {
        height: 10%;
    }
    
    div {
        display: block;
        height: 100%;
        text-align:center;
        font-size: 32px;
        line-height: 32px;
    }

    .arrow {
        float: left;
    }

    img {
        width: 100%; 
    }

    .section {
        float: right;
    }
    
    @media screen and (min-width : 320px) and (max-width : 450px) {  
        .menu {
            width: 100%;
        }

        .arrow {
            width:0%;
        }

        .section {
            width: 100%;
        }
    }
    
    @media screen and (min-width : 451px) {
        .menu {
            width: 25%;
        }

        .arrow {
            width:6.25%;
        }

        .section {
            width: 93.75%;
        }
    }
</style>