<script lang='typescript'>
    import { onMount } from 'svelte';
    import SectionHeader from './_components/SectionHeader.svelte';
    import Jumbotron from './_components/Jumbotron.svelte';
    import Story from './_components/Story.svelte';
    import Blended from './_components/Blended.svelte';
    import Clan from './_components/Clan.svelte';
    import Toasts from './_components/Toasts.svelte';
    import Nav from './_components/Nav.svelte';

    declare const FB: any;
    let isLoggedIn: boolean = false;
    let facebookUserId: string;

    onMount( () => {
            FB.init({
                appId      : '778058433003434',
                cookie     : true,
                xfbml      : true,
                version    : 'v7.0'
            });
            
            FB.getLoginStatus(function(response) {
                isLoggedIn = (response.status === 'connected');
                facebookUserId = response.authResponse.userID;
            })
    });
    
    function toggleLogIn() {
        if (isFacebookConnected()) {
            FB.logout(function(response) {
                facebookUserId = '';
                isLoggedIn = false;
            }); 
        } else {
            FB.login(function(response) {
                facebookUserId = response.authResponse.userID;
                isLoggedIn = true;
            })
        }
    }

    function isFacebookConnected(): boolean {
        let isConnected: boolean = false;
        FB.getLoginStatus(function(response) {
            isConnected = (response.status === 'connected');
        });
        return isConnected;
    }
</script>
<Nav isLoggedIn={isLoggedIn} on:toggleLogIn={toggleLogIn}/>
<div class='wrapper'>
    <div><img src='PageLeftDecorator.png' alt='decoration' class='left pageDecorator'></div>
<div class='content'>
    <Jumbotron />
    <Story />
    <Clan />
    <Toasts isLoggedIn={isLoggedIn} facebookUserId={facebookUserId} on:toggleLogIn={toggleLogIn}/>
    <Blended />
</div>
<div><img src='PageRightDecorator.png' alt='decoration' class='right pageDecorator'></div>
</div><style global lang='scss'>
    @import '../../static/global.scss';

    @media only screen 
    and (min-device-width : 320px) 
    and (max-device-width : 1100px) {   
        .pageDecorator {
            position: fixed;
            pointer-events: none;
        }

        .wrapper {
            width: 100%;
            display: grid;
            grid-template-columns: 0% 100% 0%;
        }
        div {
            overflow:hidden;
        }
    }

    @media only screen
    and (min-width : 1101px) {
        .pageDecorator {
            position: fixed;
            pointer-events: none;
        }

        .left {
            top: 65px;
            left:0px;
        }

        .right {
            bottom: 0px;
            right: 18px;
        }

        .wrapper {
            width: calc(100% - 18px);
            display: grid;
            grid-template-columns: 25% 50% 25%;
        }
    }
</style>