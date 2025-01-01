import { TaskParamType, TaskType } from "@/type/task";
import { CodeIcon, Flag, GlobeIcon, LucideProps, TextIcon } from "lucide-react";


export const ExtractTextFromElementTask ={
    type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
    label: "Extract Text From Element",
    icon: (props: LucideProps)=>(
        <TextIcon className="stroke-rose-400" {...props}/>
    
    ),
    isEntryPoint: false,
    inputs:[
        {
        name:"Html",
        type:TaskParamType.STRING,
        required:true,
        variant:"textarea",
    },
        {
        name:"Selector",
        type:TaskParamType.STRING,
        required:true,
    }
],
    outputs:[
        {
            name:"Extracted Text",
            type:TaskParamType.STRING,
        },
    ]

}