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