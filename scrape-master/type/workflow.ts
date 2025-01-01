import { LucideProps } from "lucide-react";
import { TaskParam, TaskType } from "./task";

export enum workflowStatus{
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    
}

export type WorkflowTask={
    lable: string;
    icon: React.FC<LucideProps>;
    type: TaskType;
    isEntryPoint?: boolean;
    inputs: TaskParam[];
    output: TaskParam[];
    credits:number;
}