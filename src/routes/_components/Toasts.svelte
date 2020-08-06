<script lang='typescript'>
    import ToastForm from './ToastForm.svelte';
    import ToastsList from './ToastsList.svelte';
    import { ToastModel } from '../_models/ToastModel';
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let isLoggedIn: boolean;
    export let facebookUserId: string;
    let isEdittingToast = false;

    let toast: ToastModel = {
        toastId: null,
        toasterName: '',
        toasterRelationship: '',
        toasterAssociation: '',
        toastContent: '',
        toasterFacebookId: ''
    };

    function forward() {
        dispatch('toggleLogIn');
    }

    function editToast(event) {
        toast = {...event.detail};
        isEdittingToast = true;
    }
</script>

<ToastsList facebookUserId={facebookUserId} isLoggedIn={isLoggedIn} on:editToast={editToast}/>
<ToastForm isEdittingToast={isEdittingToast} toast={toast} facebookUserId={facebookUserId} isLoggedIn={isLoggedIn} on:toggleLogIn={forward}/>

<style>
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
    }
    /* --------------------------------------------------------- */

    /* iPhone 4 ----------- */
    @media
    only screen and (-webkit-min-device-pixel-ratio : 1.5),
    only screen and (min-device-pixel-ratio : 1.5) {
    }
    /* --------------------------------------------------------- */
</style>