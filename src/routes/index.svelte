<script lang='typescript'>
    import { onMount } from 'svelte';
    import SectionHeader from './_components/SectionHeader.svelte';
    import Jumbotron from './_components/Jumbotron.svelte';
    import Story from './_components/Story.svelte';
    import Blended from './_components/Blended.svelte';
    import Clan from './_components/Clan.svelte';
    import Toasts from './_components/Toasts.svelte';
    import Nav from './_components/Nav.svelte';
    import { initializeFacebook, getFacebookConnection, toggleFacebookLogIn } from './api/facebookController';
    import { FacebookUserConnectionModel } from './_models/FacebookUserConnectionModel';

    let facebookUser: FacebookUserConnectionModel = {isLoggedIn: false, facebookUserId: ''};

    onMount(async () => {
            await initializeFacebook().then(() => {
                getFacebookConnection().then((facebookConnectionUser: FacebookUserConnectionModel) => {
                    facebookUser = facebookConnectionUser;
            });
        });
    });
    
    async function toggleLogIn() {
        toggleFacebookLogIn().then((userAfterToggleLogin: FacebookUserConnectionModel) => {
            facebookUser = userAfterToggleLogin;
        });
    }
</script>

<Nav isLoggedIn={facebookUser.isLoggedIn} on:toggleLogIn={toggleLogIn}/>
<div class='wrapper'>
    <div>
        <img src='PageLeftDecorator.png' alt='decoration' class='left pageDecorator'>
    </div>
    <div class='content'>
        <Jumbotron />
        <Story />
        <Clan />
        <Toasts isLoggedIn={facebookUser.isLoggedIn} facebookUserId={facebookUser.facebookUserId} on:toggleLogIn={toggleLogIn}/>
        <Blended />
    </div>
    <div>
        <img src='PageRightDecorator.png' alt='decoration' class='right pageDecorator'>
    </div>
</div>

<style global lang='scss'>
    @import '../../static/global.scss';

    @media screen and (min-width : 320px) and (max-width : 1100px) {   
        .pageDecorator {
            position: fixed;
            pointer-events: none;
            width: 0%;
            height: 0%;
        }

        .wrapper {
            width: 100%;
            display: grid;
            grid-template-columns: 0% 100% 0%;
            margin-top: 65px;
            padding: 20px;
        }
    }

    @media screen and (min-width : 1101px) {
        .pageDecorator {
            position: fixed;
            pointer-events: none;
            height: 35%;
        }

        .left {
            top: 85px;
            left:20px;
        }

        .right {
            bottom: 20px;
            right: 38px;
        }

        .wrapper {
            width: 100%;
            display: grid;
            grid-template-columns: 25% 50% 25%;
            margin-top: 65px;
            padding: 20px 0 20px 0;
        }
    }
</style>