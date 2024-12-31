import { TaskParamType, TaskType } from "@/type/task";
import { GlobeIcon, LucideProps } from "lucide-react";


export const LaunchBrowserTask={
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch browser",
    icon: (props: LucideProps)=>(
        <GlobeIcon className="stroke-pink-400" {...props}/>
    
    ),
    isEntryPoint: true,
    inputs:[{
        name:"WebsiteURL",
        type:TaskParamType.STRING,
        helperText:"eg: http://www.google.com",
        required:true,
        hideHandle: true,
    }]

}