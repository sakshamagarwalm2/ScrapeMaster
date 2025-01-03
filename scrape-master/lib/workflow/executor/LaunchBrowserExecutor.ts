
import { ExecutionEnvironment } from "@/type/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean>{
    try {
        const websiteUrl = environment.getInput("Website Url");
        const browser = await puppeteer.launch({
            headless: true,
            
        });
        environment.setBrowser(browser);
        const page = await browser.newPage();
        await page.goto(websiteUrl);
        environment.setPage(page);
        return true;
    } catch (error:any) {
        environment.log.error(error.message);
        return false;
    }
}