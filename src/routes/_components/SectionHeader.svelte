<script lang='typescript'>
    import HeadingDecorator from './HeadingDecorator.svelte';
    export let title: string;
</script>

<div class='outter'>
    <div class='container'>
    <h1>{title}</h1>
    <HeadingDecorator />
    </div>
</div>
<style lang='scss'>
    @import '../../../static/theme.scss';

    @media only screen 
    and (min-width : 0px) 
    and (max-width : 450px) {   
        .outter {
            background-color: $accent-color-green;
            height: 65px;
            line-height: 65px;
            width: 100%;
            margin-top: 20px;
            padding: 0;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }  
        h1 {
            font-size: 32px !important;
            line-height: 32px;
            color: $accent-color-cream;
            margin: 0 !important;
            padding-top: 12px !important;
        }

        .container {
            position: relative; 
            transform: translateY(-50%); 
            top:50%;
        }
    }

    @media only screen
    and (min-width : 451px) {
        div {
            background-color: $accent-color-green;
            height: 120px;
            line-height: 120px;
            width: 100%;
            margin-top: 20px;
            padding: 0;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        h1 {
            font-size: 70px !important;
            line-height: 70px;
            padding-top: 12px !important;
            color: $accent-color-cream;
            margin: 0 !important;
        }
    }
</style>