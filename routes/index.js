const express = require("express")
const route = express.Router()


const puppeteer = require('puppeteer');


route.get("/",async (req,res) => {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.boxofficemojo.com/chart/ww_top_lifetime_gross/?area=XWW');
        var pageContent = []
        const elements = await page.$$(".a-text-left.mojo-field-type-title a");
        //console.log(elements)
        var pageContent = [];
        for(var i = 0;i < 10;i++){
            const element = elements[i];
            const eval =  await page.evaluate(el => [el.textContent,el.getAttribute("href")],element);
            console.log(eval)
            const titlePage = await browser.newPage();
            await titlePage.goto("https://www.boxofficemojo.com" + eval[1]);
            console.log(await titlePage.url())
            const image = await titlePage.$(".a-fixed-left-grid-col.a-col-left img")
            const imageSrc = await titlePage.evaluate(el => el.getAttribute("src"),image)
            console.log(imageSrc)
            pageContent.push({title:eval[0],src:imageSrc})
            await titlePage.close()
        }
        //await browser.close();
        res.render("./index",{pageContent:pageContent})
    }catch(err){
        console.log(err)
    }

})


module.exports = route