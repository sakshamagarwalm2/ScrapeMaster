import { WorkflowTask } from "@/type/workflow";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor.ts";
import { ExecutionEnvironment } from "@/type/executor";
import { TaskType } from "@/type/task";
import { ExtractTextFromElementExecutor } from "./ExtracttextFromElementExecutor";

type ExecutorFn<T extends WorkflowTask>=(
    environment: ExecutionEnvironment<T>
)=> Promise<boolean>;

type RegistryType = {
    [K in TaskType]:ExecutorFn<WorkflowTask & {type: K}>;
}

export const ExecutorRegistry:RegistryType={
    LAUNCH_BROWSER : LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
}