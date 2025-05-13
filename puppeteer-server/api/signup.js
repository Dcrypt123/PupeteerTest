

const puppeteer = require("puppeteer");
// Launch the browser and open a new blank page

async function main(){
    var browser = await puppeteer.launch({args: ['--no-sandbox'],timeout:0});
    for(let i = 0; i<5;i++){
        await signupNode(browser);
    }
    setTimeout(()=>{
        return;
    },2147483646)
}



async function signupNode(browser){
    page = await browser.newPage();
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2750));

    
    // Navigate the page to a URL.
    await page.goto('https://dharanishshivkirankarthikeyan.github.io/datasharingApp/signup.html');
    await minLoadingTime

    // Set screen size.

    var element = await page.waitForSelector('::-p-xpath(//*[@id="signupNodeButton"])');
   await  minLoadingTime
    await element.click();
    minLoadingTime
    await await element.dispose();

}

main();
