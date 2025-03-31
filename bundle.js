import puppeteer from 'puppeteer';

const SIGNUP_URL = 'https://dharanishshivkirankarthikeyan.github.io/datasharingApp/signup.html';

async function createNode() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto(SIGNUP_URL, { waitUntil: 'domcontentloaded' });
        console.log("Opened signup page");

        // Select "Sign up as a Node" radio button
        await page.click('input[name="role"][value="node"]');
        console.log("Selected 'Sign up as a Node'");

        // Click the "Sign Up" button
        await page.click('#signupButton');
        console.log("Clicked 'Sign Up' button");

        // Wait for confirmation toast
        await page.waitForSelector('#toast', { timeout: 5000 });

        const toastMessage = await page.$eval('#toast', el => el.innerText);
        if (toastMessage.includes("Node created successfully")) {
            console.log("Node created successfully!");
        } else {
            console.log("Failed to create node:", toastMessage);
        }

        // Wait for redirect confirmation
        await page.waitForNavigation({ waitUntil: 'load' });
        console.log("Redirected successfully");

    } catch (error) {
        console.error("Error creating node:", error);
    } finally {
        await browser.close();
    }
}

async function main() {
    const numNodes = 5;
    for (let i = 0; i < numNodes; i++) {
        console.log(`Creating node ${i + 1}...`);
        await createNode();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

main();
