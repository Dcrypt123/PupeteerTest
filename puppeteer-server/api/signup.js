import puppeteer from "puppeteer-core";

export default async function handler(req, res) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
        executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome-stable"
    });

    const page = await browser.newPage();

    try {
        await page.goto("https://dharanishshivkirankarthikeyan.github.io/datasharingApp/signup.html", { waitUntil: "domcontentloaded" });

        await page.click('input[name="role"][value="node"]');
        await page.click("#signupButton");

        await page.waitForSelector("#toast", { timeout: 5000 });
        const message = await page.$eval("#toast", el => el.innerText);

        res.json({ success: message.includes("Node created successfully"), message });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await browser.close();
    }
}
