<script lang='typescript'>
    import HeadingDecorator from './HeadingDecorator.svelte';
    export let title: string;
</script>

<div class='SectionHeaderOutterWrapper'>
    <h1>{title}</h1>
    <HeadingDecorator />
</div>

<style lang='scss'>
    @import '../../../static/theme.scss';
    div {
        background-color: $accent-color-green;
        width: 100%;
        margin-top: 20px;
        padding: 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }  
    
    h1 {
        color: $accent-color-cream;
        margin: 0 !important;
        padding-top: 12px !important;
    }

    @media only screen 
    and (min-width : 0px) 
    and (max-width : 450px) {   
        h1 {
            font-size: 32px !important;
            line-height: 32px;
            padding-top: 12px !important;
        }
    }

    @media only screen
    and (min-width : 451px) {
        h1 {
            font-size: 70px !important;
            line-height: 70px;
        }
    }
</style>