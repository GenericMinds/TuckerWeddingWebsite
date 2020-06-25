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
<Story />
<Family />
<Toasts />
<ProposeToastForm/>

<style global lang='scss'>
    @import '../../static/global.scss';
</style>