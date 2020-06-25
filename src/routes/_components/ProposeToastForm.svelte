<section>
    <div class='form'>
        <div class='header'>
            <p class='heading'>Propose a Toast...</p>
        </div>
        <input type='text' placeholder='Name'/>
        <div class='container'>
        <div class='selectstuff'>
            <select>
                <option>Father</option>
                <option>Mother</option>
                <option>Brother</option>
                <option>Sister</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Relative</option>
                <option>Friend</option>
            </select>
        </div>
        <div class='selectstuff'>of the</div>
        <div class='selectstuff'>
            <select>
                <option>Groom</option>
                <option>Bride</option>
            </select>
        </div>
        </div>
        <textarea rows='7' placeholder='Message'></textarea>
    </div>
</section>

<style lang='scss'>
    @import '../../../static/theme.scss';
    section {
        height: 60vh;
        width: $full-size;
        margin-bottom: 40px;
    }

    div {
        padding: 0;
    }

    .form {
        background-color: $accent-color-cream-2;
        height: $full-size;
        margin: 20px;
        border-radius: 20px;
    }

    .header {
        border-radius: 20px 20px 0 0;
        height: 20%;
        background-color: $accent-color-green;
        position: relative;
    }

    .heading {
        font-size: 32px;
        margin: 0;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        padding-left: 10px;
        color: $accent-color-cream;
    }

    input, textarea {
        width: 80%;
        padding-left: 10px;
        padding-right: 10px;
        line-height: $default-line-height;
        font-size: $small-font-size;
    }

    input {
        margin-top: 25px;
    }

    textarea {
        margin-bottom: 25px;
    }
    
    .selectstuff {
        display: table-cell;
        line-height: 40px;
        font-size: $small-font-size;
    }

    .container {
        display: table;
        width: $full-size;
        table-layout: fixed;
    }
</style>