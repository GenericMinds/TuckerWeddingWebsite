<script lang='typescript'>
    import { onMount } from "svelte";
    import { ToastModel } from '../_models/ToastModel';
    
    let toasts: ToastModel[] = [];
    
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
            <p> - {toast.toasterName}, {toast.toasterRelationship} of the {toast.toasterAssociation}</p>
        {/each}
    </div>
</section>
