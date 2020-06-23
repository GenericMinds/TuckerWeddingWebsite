<section class="propose">
    <div class="form">
        <div class="header">
        <p class="heading">Propose a Toast...</p>
        </div>
        <input type="text" placeholder="Name"/>
        <div class="container">
        <div class="selectstuff">
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
        <div class="selectstuff">of the</div>
        <div class="selectstuff">
            <select>
                <option>Groom</option>
                <option>Bride</option>
            </select>
        </div>
        </div>
        <textarea rows="7" placeholder="Message"></textarea>
    </div>
</section>

<style>
section {
    height: 60vh;
    width: 100vw;
}

.form {
    background-color: #ded599;
    height: 100%;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
}

.header {
    border-radius: 20px 20px 0 0;
    height: 20%;
    background-color: #375637;
    position: relative;
}

.heading {
    height: 32px;
    font-size: 32px;
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    padding-left: 10px;
    color: #e2e0cf;
}

input {
    width: 80%;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 25px;
    line-height: 40px;
    font-size: 28px;
}

textarea {
    width: 80%;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 25px;
    line-height: 40px;
    font-size: 28px;
}

.selectstuff {
    display: table-cell;
    line-height: 28px;
    font-size: 28px;
}


.container {
    display: table;
    height: 40px;
    width: 100%;
    table-layout: fixed;
}

</style>