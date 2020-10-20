const puppeteer = require('puppeteer');
const express   = require('express')
const app       = express()
const port      = 3000

var pagina_demodb   = 'http://localhost/demodb_chrome/';
var ruts = ['88345400','28518775','65124087']


async function inicio (){
    let browser = await puppeteer.launch({headless:false});
    await honorarios(browser);
}
async function honorarios (browser){
    const new_page = await browser.newPage();
    await new_page.goto(pagina_demodb);
    var valor = ruts.shift().toString();
    // await new_page.evaluate( async () => {
    // await new_page.type('input[name=RUT_TERC]','8818096-8', {delay: 1000});
    await new_page.waitForSelector('input[name="nombre"]')
    await new_page.type('input[name="nombre"]', valor,{delay: 50})
    await new_page.waitForSelector('input[name="descripcion"]')
    await new_page.type('input[name="descripcion"]', "Valor Fijo",{delay: 50})
    await new_page.click('#aceptar');

    // for await (let num of honorarios()) {
    if(!ruts.length){
        browser.close()
        return;
    }
    await honorarios(new_page);
    // browser.close();
}


app.get('/', (req, res) => {
    inicio();
    // honorarios();
    res.send('Empieza la Instancia!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})