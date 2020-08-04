<script lang='typescript'> 
    import { ToastModel } from '../_models/ToastModel';
    import { onMount } from 'svelte';

    declare const FB: any;
    let isLoggedIn: boolean = false;

    onMount( () => {
        FB.init({
            appId      : '3134094980017395',
            cookie     : true,
            xfbml      : true,
            version    : 'v7.0'
        }); 
        
        FB.getLoginStatus(function(response) {
            isLoggedIn = (response.status === 'connected');
        })
    }); 
    
    function logout() {
        if (isFacebookConnected()) {
            FB.logout(function(response) {
                isLoggedIn = false;
            }); 
        }
    }
    function login() {
        if (!isFacebookConnected()) {
            FB.login(function(response) {
                isLoggedIn = true;
            });
        }
    }

    function isFacebookConnected(): boolean {
        let isConnected: boolean = false;
        FB.getLoginStatus(function(response) {
            isConnected = (response.status === 'connected');
        });
        return isConnected;
    }
    
    let toast: ToastModel = {
        toasterName: '',
        toasterRelationship: '',
        toasterAssociation: '',
        toastContent: ''
    };
    
    async function proposeToast () {
        if (toast.toasterName == '' || toast.toastContent == ''){
            return;
        }

        await fetch('/api/toastController', {
            method: 'POST', 
            body: JSON.stringify({toast}), 
            headers: {"Content-type": "application/json"}
        }).then(response => window.location.reload());
        
    };

</script>

<section class='propose'>
    <div class='form'>
        <div class='header'>
            <p class='heading'>Propose a Toast...</p>
        </div>
        <input type='text' disabled={!isLoggedIn} placeholder='Name' bind:value={toast.toasterName}/>
        <div class='container'>
        <div class='selectstuff'>
            <select disabled={!isLoggedIn} bind:value={toast.toasterRelationship}>
                <option value='Father' selected>Father</option>
                <option value='Mother'>Mother</option>
                <option value='Brother'>Brother</option>
                <option value='Sister'>Sister</option>
                <option value='Son'>Son</option>
                <option value='Daughter'>Daughter</option>
                <option value='Relative'>Relative</option>
                <option value='Friend'>Friend</option>
            </select>
        </div>
        <div class='selectstuff'>of the</div>
        <div class='selectstuff'>
            <select disabled={!isLoggedIn} bind:value={toast.toasterAssociation}>
                <option value='Groom' selected>Groom</option>
                <option value='Bride'>Bride</option>
            </select>
        </div>
        </div>
        <textarea disabled={!isLoggedIn} bind:value={toast.toastContent} rows='7' placeholder='Message'></textarea>
        <br/>
        {#if !isLoggedIn}
            <button class='facebook-button' on:click={login}>Login with Facebook to Propose</button>
        {/if}
        {#if isLoggedIn}
            <button class='propose-button' on:click={proposeToast}>Propose!</button>
        {/if}
    </div>
</section>

<style lang='scss'>
    @import '../../../static/theme.scss';
    section {
        width: $full-size;
        margin-bottom: 40px;
    }

    div {
        padding: 0;
    }

    .form {
        background-color: $accent-color-cream-2;
        height: $full-size;
        margin: 20px;
        border-radius: 20px;
    }

    .header {
        border-radius: 20px 20px 0 0;
        height: 75px;
        background-color: $accent-color-green;
        position: relative;
    }

    .heading {
        font-size: 32px;
        margin: 0;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        padding-left: 10px;
        color: $accent-color-cream;
    }

    input, textarea {
        width: 80%;
        padding-left: 10px;
        padding-right: 10px;
        line-height: $default-line-height;
        font-size: $small-font-size;
    }

    input {
        margin-top: 25px;
    }

    textarea {
        margin-bottom: 25px;
    }
    
    .selectstuff {
        display: table-cell;
        line-height: 40px;
        font-size: $small-font-size;
    }

    .container {
        display: table;
        width: $full-size;
        table-layout: fixed;
    }

    select {
        width: 65px;
    }

    button {
        border-radius: 5px;
        border: none;
        color: $accent-color-cream;
        padding: 6px 32px;
        text-align: center;
        text-decoration: none;
        margin-bottom: 20px;
    }

    .facebook-button {
        background-color: #3578e5;
    }

    .propose-button {
        background-color: $accent-color-green;
    }
</style>