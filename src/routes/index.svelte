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
                appId      : '652761382263352',
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
<Jumbotron />
<Story />
<Clan />
<Toasts isLoggedIn={isLoggedIn} facebookUserId={facebookUserId} on:toggleLogIn={toggleLogIn}/>
<Blended />

<style global lang='scss'>
    @import '../../static/global.scss';
</style>