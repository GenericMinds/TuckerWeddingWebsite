<script context="module" lang="typescript">
console.log('hi')
export async function preload(page,session) {
    console.log('hi x2');
    return {hello: 1}
}
</script>

<script lang='typescript'>
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';
    import {Modal} from 'svelte-chota';
    import { ToastModel } from '../_models/ToastModel';
    import SectionHeader from './SectionHeader.svelte';

	const dispatch: any = createEventDispatcher();
    export let isLoggedIn: boolean;
    export let facebookUserId: string;
    export let hello;
    let open: boolean = false;
    let toasts: ToastModel[] = [];

    onMount(async (): Promise<void> => {
        console.log(hello);
        await fetch('api/toastController.json')
        .then(toasts => toasts.json())
        .then(toastsData => {
            toasts = toastsData;
        });
    });

    function isAuthor(toasterFacebookId: string): boolean {
        return facebookUserId === toasterFacebookId;
    }

    function editToast(toast: ToastModel): void {
        dispatch('editToast', toast);
    }

    async function deleteToast (toastId: number): Promise<void>{
        await fetch('/api/toastController', 
            {
                method: 'DELETE',
                body: JSON.stringify({toastId}),
                headers: {"Content-type": "application/json"}
            })
        .then(response => window.location.reload());
    }
</script>

<section class='toasts'>
    <SectionHeader title={'Toasts'}/>
    <div class='toasts'>
        {#each toasts as toast}
            <p>{toast.toastContent}</p>
            <p> - {toast.toasterName}, {toast.toasterRelationship} of the {toast.toasterAssociation}</p>
            {#if isLoggedIn && isAuthor(toast.toasterFacebookId)}
                <p>
                    <button on:click={() => {editToast(toast)}}>Edit</button>
                    <button on:click={e => open=true}>Delete</button>
                    <Modal bind:open>
                        <div>
                            Are you sure you want to delete this toast?
                            <div>
                                <button on:click={e => deleteToast(toast.toastId)}>Delete</button>
                                <button on:click={e => open=false}>Cancel</button>
                            </div>
                        </div>
                    </Modal>
                </p>
            {/if}
        {/each}
    </div>
</section>

<style lang='scss'>    
    @import '../../../static/theme.scss';
    
    button {
        border-radius: 5px;
        border: none;
        background-color: $primary-color;
        color: #ddd499;
        padding: 6px 12px;
    }

    div {
        padding: 20px 20px 20px 20px;
        font-size: 20px;
        background-color: $quaternary-color;
        border: 2px solid $primary-color;
    }
</style>