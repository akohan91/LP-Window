function gridPlagin(params) {
    let styleGrig = `
        <style>
            body{
                position: relative;
            }

            .grid__view{
                display: none;
                width: 100%;
                height: ${params.heghtGrid}vh;
                max-width: ${ params.widthGrid}px;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                margin: auto; 
               
                z-index: 998;
            }
            .grid__view .col{
                    width: ${ 1 / params.colCount * 100}%;
                    height: 100%;
                    padding: 0 ${ params.spaceColPX}px;
                    float: left;
                    
                    background: rgba(255, 0, 0, 0.10);
            }
            .grid__view .col .content{
                color: #fff;
                text-shadow: 1px 1px 1px #333;
                font-size: 14px;
                line-height: 1.3;
                text-align: center;
                height: 100%;
                background: rgba(0, 0, 255, 0.10);
            }
            #showGrid{
                position:fixed;
                left: 10px;
                top:10px;
                z-index: 999;
            }
        </style>
    `;

    let columns = '';

    for (let i = 1; i <= params.colCount; i++) {
        columns += `<div class="col"><div class="content">${i} <br/> ${(i / params.colCount * 100).toFixed(3)}</div></div>`;
    }

    let grid = `<button id=showGrid>|||</button><div class="grid__view">${columns}</div>`;

    document.querySelector('body').innerHTML += grid;
    document.querySelector('head').innerHTML += styleGrig;
    document.querySelector('#showGrid').addEventListener('click', function () {
        let displayGrid = document.querySelector('.grid__view').style.display;
        document.querySelector('.grid__view').style.display = displayGrid === "none" ? 'block' : "none";
    })
}

gridPlagin({
    widthGrid: 1280,
    colCount: 12,
    spaceColPX: 15,
    heghtGrid: 100
});