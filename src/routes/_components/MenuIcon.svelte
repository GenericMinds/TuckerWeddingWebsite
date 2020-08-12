<script lang='typescript'>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let isOpen: boolean = false;

    function handleToggle(): void {
        dispatch('handleToggle');
    }
</script>

<img on:click={handleToggle} src='./MenuIcon.png' alt='Menu Icon'/>     

<style>    
    img {
        position: fixed;
        right: 30px;
        top: 17.5px;
        height: 30px;
        width: 30px;
        margin: 0;
    }

    img:hover {
        cursor: pointer;
    }
</style>