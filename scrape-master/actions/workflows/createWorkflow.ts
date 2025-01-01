"use server";

import { waitFor } from "@/lib/helper/waitFor";
import prisma from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { AppNode } from "@/type/appNode";
import { TaskType } from "@/type/task";
import { workflowStatus } from "@/type/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";

export async function CreateWorkflow(
    form : createWorkflowSchemaType
    
){
    const {success, data}=createWorkflowSchema.safeParse(form);
    if(!success){
        throw new Error("Invalid form data");
    }
    const{userId} = await auth();

    if(!userId){
        throw new Error("Unauthorized");
    }

    const inittialFlow:{nodes:AppNode[];edges:Edge[]}={
        nodes:[],
        edges:[],
    };

    inittialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

    const result = await prisma.workflow.create({
        data:{
            userId,
            status: workflowStatus.DRAFT,
            definition: JSON.stringify(inittialFlow),
            ...data,
        },
    });
    if(!result){
        throw new Error("Failed to create workflow");
    }
    redirect(`/workflow/editor/${result.id}`);
}