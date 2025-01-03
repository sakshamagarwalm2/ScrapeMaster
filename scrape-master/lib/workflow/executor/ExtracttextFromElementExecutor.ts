import { ExecutionEnvironment } from "@/type/executor";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("Selector not found")

      return false;
    }

    const html = environment.getInput("Html");

    if (!html){
        environment.log.error("HTML not found");
         return false};

    const $ = cheerio.load(html);
    const element = $(selector);
    console.log("here",element);
    if (!element) {
        environment.log.error("Element not found");
      return false;
    }
    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error("Failed to extract text from element");
      return false;
    }

    environment.setOutput("Extracted Text", extractedText);

    return true;
  } catch (error:any) {
    environment.log.error(error.message);
    return false;
  }
}
