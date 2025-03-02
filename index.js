const puppeteer = require('puppeteer');
const CRED = require('./secret.js');
const fs = require('fs');
(async () => {
    const sleep = async (ms) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, ms)
        });
    }


    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, });
    const page = await browser.newPage();
    await page.goto('https://www.messenger.com/', { waitUntil: 'domcontentloaded' });

    await page.waitForSelector("#email");
    await sleep(500);
    // username
    await page.type("#email", CRED.username)

    await sleep(500);
    // password
    await page.type("#pass", CRED.password)



    await page.click("#loginbutton")
    await page.waitForSelector("#js_u > div > div > div._1nq2._7vup > span._5iwm._6-_b._150g._58ah > label > input");
    await sleep(1000);

    await page.type("#js_u > div > div > div._1nq2._7vup > span._5iwm._6-_b._150g._58ah > label > input", CRED.victimFullName)
    await sleep(1000);

    var contentSelector = "#js_u > div > div > div._1nq2._7vup > span._5iwm._6-_b._5iwn._150g._58ah > div > div > div:nth-child(2) > ul > li > a > div > div:nth-child(2) > div > div"
    await page.waitForSelector(contentSelector, { timeout: 0 });
    const resultFullName = await page.$eval(contentSelector, contentSelector => contentSelector.innerText);
    if (resultFullName.toLowerCase() !== CRED.victimFullName.toLowerCase()) {
        console.log(resultFullName)
        console.log("Result name does not equal victim name :(")
        browser.close();
        return;
    } else {
        console.log("Success")
    }

    page.click(contentSelector);

    await sleep(5000);

    var scriptText = [];


    fs.readFileSync('script.txt', 'utf-8').split(/\r?\n/).forEach(async function (line) {
        scriptText.push(line)

    });


    await sleep(5000)

    for (line of scriptText) {
        await sleep(50);
        await page.keyboard.type(line, { delay: 25 })
        await page.keyboard.press('Enter');
    }
    await browser.close();
})();