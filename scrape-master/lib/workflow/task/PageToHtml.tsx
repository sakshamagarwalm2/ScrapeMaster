import { TaskParamType, TaskType } from "@/type/task";
import { WorkflowTask } from "@/type/workflow";
import { CodeIcon, Flag, GlobeIcon, LucideProps } from "lucide-react";


export const PageToHtmlTask={
    type: TaskType.PAGE_TO_HTML,
    label: "Page to HTML",
    icon: (props: LucideProps)=>(
        <CodeIcon className="stroke-rose-400" {...props}/>
    
    ),
    isEntryPoint: false,
    credits: 2,
    inputs:[{
        name:"Web Page",
        type:TaskParamType.BROWSER_INSTANCE,
        required:true,
    }]as const,
    outputs:[
        {
            name:"Html",
            type:TaskParamType.STRING,
        },
        {
            name:"Web Page",
            type:TaskParamType.BROWSER_INSTANCE,
        }
    ] as const,

}satisfies WorkflowTask;