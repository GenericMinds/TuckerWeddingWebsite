<script>
    import SectionHeader from './SectionHeader.svelte';
</script>

<section class='blended'>
    <SectionHeader title={'Blended Family Recipe'}/>
    <div>
        <p>Put a good and honest man</p>
        <p>into a mixing pan.</p>
        <p>Combine one loving woman</p>
        <p>and blend well with the man.</p>
        <br/>
        <p>Add the children of the man,</p>
        <p>and the woman's children too.</p>
        <p>Mix them all together</p>
        <p>as you would a pot of stew.</p>
        <br/>
        <p>Slowly stir in patience.</p>
        <p>It will really help a lot.</p>
        <p>If you're not sure how much,</p>
        <p>throw in all you've got.</p>
        <br/>
        <p>Then, six cups of sweetener</p>
        <p>and fourteen cups of love.</p>
        <p>Sprinkle in some blessings</p>
        <p>from the heavens high above.</p>
        <br/>
        <p>When the mixture is complete,</p>
        <p>with great joy you will see...</p>
        <p>creation of our awesome,</p>
        <p>loving blended family.</p>
    </div>
</section>

<style lang='scss'>
    @import '../../../static/theme.scss';   
    div {
        background-color: $tertiary-color;
        padding: 20px;
        margin-bottom: 20px;
        background-color: $quaternary-color;
        border: 2px solid $primary-color;
    }
    
    p {
        font-size: 20px;
        line-height: 20px;
        margin: 0;
    }
</style>