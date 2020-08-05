<script lang='typescript'>
    import { onMount } from "svelte";
    import { ToastModel } from '../_models/ToastModel';
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    
    let toasts: ToastModel[] = [];
    
    export let isLoggedIn: boolean;
    export let facebookUserId: string;

    function isAuthor(toasterFacebookId: string) {
        return facebookUserId === toasterFacebookId;
    }

    function editToast(toast) {
        dispatch('editToast', toast);
    }

    onMount(async () => {
        await fetch('api/toastController', { method: 'GET' })
        .then(toasts => toasts.json())
        .then(toastsData => {
            toasts = toastsData;
        });
    })
</script>

<section class='toasts'>
    <h1>Toasts</h1>
    <img alt='Heading Decoration' src='./HeadingDecorator.png'/>
    <div>
        {#each toasts as toast}
            <p>{toast.toastContent}</p>
            <p> - {toast.toasterName}, {toast.toasterRelationship} of the {toast.toasterAssociation}
            {#if isLoggedIn && isAuthor(toast.toasterFacebookId)}
                <button on:click={() => {editToast(toast)}}>Edit</button>
            {/if}
            </p>
            
        {/each}
    </div>
</section>

<style>
    button {
        border-radius: 5px;
        border: none;
        background-color: #375637;
        color: #ddd499;
        padding: 6px 12px;
        text-align: center;
        text-decoration: none;
        margin-bottom: 20px;
    }
    
</style>