<script>
    import SectionHeader from './_components/SectionHeader.svelte';
    import Jumbotron from './_components/Jumbotron.svelte';
    import Story from './_components/Story.svelte';
    import Blended from './_components/Blended.svelte';
    import Clan from './_components/Clan.svelte';
    import Toasts from './_components/Toasts.svelte';
    import ProposeToastForm from './_components/ProposeToastForm.svelte';
</script>

<SectionHeader isNav={true} />
<Jumbotron />
<Story />
<Clan />
<Toasts />
<ProposeToastForm/>
<Blended />

<style global lang='scss'>
    @import '../../static/global.scss';
</style>