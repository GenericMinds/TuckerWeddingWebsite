<script lang='typescript'> 
    import { ToastModel } from '../_models/ToastModel';
    import SectionHeader from './SectionHeader.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    export let isLoggedIn: boolean;
    export let facebookUserId: string;
    export let toast: ToastModel;
    export let isEdittingToast: boolean;
    
    async function proposeToast () {
        if (toast.toasterName == '' || toast.toastContent == ''){
            return;
        }

        toast.toasterFacebookId = facebookUserId;
        await fetch('/api/toastController', {
            method: 'POST', 
            body: JSON.stringify({toast}), 
            headers: {"Content-type": "application/json"}
        }).then(response => window.location.reload());
    };

    async function updateToast () {
        if (toast.toasterName == '' || toast.toastContent == '') {
            return;
        }

        await fetch('/api/toastController', {
            method: 'PUT',
            body: JSON.stringify({toast}),
            headers: {"Content-type": "application/json"}
        }).then(response => window.location.reload());
    }

    function logIn () {
        dispatch("toggleLogIn");
    }

</script>

<section class='propose'>
    <SectionHeader title={isEdittingToast ? 'Editting Toast...' : 'Propose a Toast'}/>
    <div>
        <input class='form-element' type='text' disabled={!isLoggedIn} placeholder='Name' bind:value={toast.toasterName}/>
            <select class='form-element' disabled={!isLoggedIn} bind:value={toast.toasterRelationship}>
                <option selected disabled hidden>Select Relationship</option>
                <option value='Father'>Father</option>
                <option value='Mother'>Mother</option>
                <option value='Brother'>Brother</option>
                <option value='Sister'>Sister</option>
                <option value='Son'>Son</option>
                <option value='Daughter'>Daughter</option>
                <option value='Relative'>Relative</option>
                <option value='Friend'>Friend</option>
            </select>
        <p>of the</p>
            <select class='form-element' disabled={!isLoggedIn} bind:value={toast.toasterAssociation}>
                <option selected disabled hidden>Select Bride or Groom</option>
                <option value='Groom'>Groom</option>
                <option value='Bride'>Bride</option>
            </select>
        <textarea class='form-element' disabled={!isLoggedIn} bind:value={toast.toastContent} rows={7} placeholder='Toast'></textarea>
        {#if !isLoggedIn}
            <button class='facebook-button' on:click={logIn}>Log in with Facebook to Propose</button>
        {/if}
        {#if isLoggedIn}
            {#if isEdittingToast}
                <button class='propose-button' on:click={updateToast}>Update!</button>
            {:else}
                <button class='propose-button' on:click={proposeToast}>Propose!</button>
            {/if}
        {/if}
    </div>
</section>

<style lang='scss'>
    @import '../../../static/theme.scss';
    ::placeholder {
        color: black;
    }

    :disabled {
        opacity: .5;
    }

    div {
        padding: 20px;
        border: 2px solid $accent-color-green;
    }

    .form-element {
        background-color: $background-color;
        border: 2px solid $accent-color-green !important;
        margin-bottom: 20px;
    }

    button {
        border-radius: 5px;
        border: none;
        color: $accent-color-cream;
        padding: 6px 32px;
    }

    .facebook-button {
        background-color: #3578e5;
    }

    .propose-button {
        background-color: $accent-color-green;
    }
</style>