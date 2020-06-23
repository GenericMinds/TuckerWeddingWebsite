<script>
    import SectionHeader from './_components/SectionHeader.svelte';
    import Jumbotron from './_components/Jumbotron.svelte';
    import Story from './_components/Story.svelte';
    import Family from './_components/Family.svelte';
    import Toasts from './_components/Toasts.svelte';
    import ProposeToastForm from './_components/ProposeToastForm.svelte';
    let x = 0;
    function killme() {
        x = x+1;
    }
</script>

<SectionHeader isNav={true} />
<Jumbotron />
<Story />
<Family />
<Toasts />
<ProposeToastForm/>

<button on:click={killme}>dfsdf</button>
<p>x is  {x}</p>

<style lang="scss">
    @import 'https://fonts.googleapis.com/css?family=Princess+Sofia';
    $background-color: #fff9ea;
    :global(body) {
        background-color: $background-color;
        margin: 0;
        font-size: 0;
    }

    :global(h1) {
        font-family: 'Princess Sofia';
        font-weight: 100;
        text-align: center;
        font-size: 42px;
        color: #375637;
    }

    :global(div) {
        overflow:hidden;
    }
</style>