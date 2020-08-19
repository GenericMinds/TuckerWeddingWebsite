<script lang='typescript'>
	import { createEventDispatcher } from 'svelte';
    import * as queryString from 'query-string';
    import MenuIcon from './MenuIcon.svelte';
    import Menu from './Menu.svelte';
    
    const dispatch: any = createEventDispatcher();

    export let isLoggedIn: boolean;
    let isOpen: boolean = false;

    function forward(): void {
		dispatch('toggleLogIn');
    }
    
    function handleToggle(): void {
        isOpen = !isOpen;
    }
</script>

<div>
    <p>#blameitonfate</p>
    <MenuIcon on:handleToggle={handleToggle} />
    <Menu on:handleToggle={handleToggle} isLoggedIn={isLoggedIn} on:toggleLogIn={forward} isOpen={isOpen}/>
</div>

<style lang='scss'>
    @import '../../../static/theme.scss';
    
    * {
        z-index: 999;
    }
    
    div {
        background-color: $primary-color;
        height: 65px;
        position: absolute;
        top: 0;
    }

    p {
        color: $secondary-color;
        font-weight: bold;
        font-size: 30px;
        line-height: 30px;
        margin: 17.5px 0 0 30px;
    }

    @media screen and (min-width : 320px) and (max-width : 450px) {   
        div {
            width: 100%;
        }
    }

    @media screen and (min-width : 451px) {
        div {
            width: calc(100% - 18px) !important;
        }
    }
</style>