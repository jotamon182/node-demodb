const puppeteer = require('puppeteer');
const express   = require('express')
const app       = express()
const port      = 3000

// var pagina_demodb   = 'http://localhost/demodb_chrome/';
var pagina_demodb   = 'http://demodb.jmunoz.xyz/index.php';
var ruts = ['88345400','28518775','65124087']

async function honorarios (new_page,browser){
    await new_page.goto(pagina_demodb);
    var valor = ruts.shift().toString();
    // await new_page.evaluate( async () => {
    // await new_page.type('input[name=RUT_TERC]','8818096-8', {delay: 1000});
    await new_page.waitForSelector('input[name="nombre"]')
    await new_page.type('input[name="nombre"]', valor,{delay: 50})
    await new_page.waitForSelector('input[name="descripcion"]')
    await new_page.type('input[name="descripcion"]', "Valor Fijo",{delay: 50})
    await new_page.click('#aceptar');
    await new_page.waitForTimeout(1000)
    // for await (let num of honorarios()) {
    if(!ruts.length){
        return ;
    }
    await honorarios(new_page,browser);
}

app.get('/', async (req, res) => {
    let browser    = await puppeteer.launch({headless:false});
    const new_page = await browser.newPage();
    await honorarios(new_page,browser).then( async () => {
        await new_page.close();
        await browser.close().catch( () => console.log("ACA ERROR"));
    }).then( () => {
        res.sendStatus(200)
    }).catch( () => {
        res.sendStatus(500)
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})