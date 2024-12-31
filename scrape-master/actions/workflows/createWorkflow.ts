"use server";

import prisma from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { workflowStatus } from "@/type/workflow";
import { auth } from "@clerk/nextjs/server";
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

    const result = await prisma.workflow.create({
        data:{
            userId,
            status: workflowStatus.DRAFT,
            definition: "Todo",
            ...data,
        },
    });
    if(!result){
        throw new Error("Failed to create workflow");
    }
    redirect(`/workflows/editor/${result.id}`);
}