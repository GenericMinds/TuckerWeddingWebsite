<script lang='typescript'>
    import { onMount } from "svelte";
    import { ToastModel } from '../_models/ToastModel';
    import SectionHeader from './SectionHeader.svelte';
    import { createEventDispatcher } from 'svelte';
    import {Modal, Button, Card} from 'svelte-chota';

	const dispatch = createEventDispatcher();

let open:boolean = false;
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

    async function deleteToast (toastId) {
        await fetch('/api/toastController', {
            method: 'DELETE',
            body: JSON.stringify({toastId}),
            headers: {"Content-type": "application/json"}
        }).then(response => window.location.reload());
    }

</script>

<section class='toasts'>
    <SectionHeader title={'Toasts'}/>
    <div>
        {#each toasts as toast}
            <p>{toast.toastContent}</p>
            <p> - {toast.toasterName}, {toast.toasterRelationship} of the {toast.toasterAssociation}
            {#if isLoggedIn && isAuthor(toast.toasterFacebookId)}
                <button on:click={() => {editToast(toast)}}>Edit</button>
                <Button on:click={e => open=true}>Delete</Button>
                <Modal bind:open>
                    <Card>
                        Are you sure you want to delete this toast?
                        <Button on:click={deleteToast(toast.toastId)}>Delete</Button>
                        <Button on:click={e => open=false}>Cancel</Button>
                    </Card>
                </Modal>
            {/if}
            </p> 
        {/each}
    </div>
</section>

<style lang='scss'>    
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

        div {
            background-color: $background-color;
            padding: 20px;
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