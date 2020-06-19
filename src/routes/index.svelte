<script>
    import SectionHeader from './_components/SectionHeader.svelte';
    import Jumbotron from './_components/Jumbotron.svelte';
    import Story from './_components/Story.svelte';
    import Family from './_components/Family.svelte';
    import Toasts from './_components/Toasts.svelte';
    import ProposeToastForm from './_components/ProposeToastForm.svelte';

</script>

<SectionHeader isNav={true} />
<Jumbotron />
<SectionHeader isNav={false} />
<Story />
<Family />
<Toasts />
<ProposeToastForm />

<style lang="scss">
    $background-color: #fff9ea;
    :global(body) {
        background-color: $background-color;
        margin: 0;
    }
</style>