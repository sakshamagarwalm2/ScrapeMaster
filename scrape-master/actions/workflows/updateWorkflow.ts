"use server";

import prisma from "@/lib/prisma";
import { workflowStatus } from "@/type/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UpdateWorkflow({
    id,
    definition,
}:{
    id: string,
    definition: string,
}
){
    const {userId} = await auth();
    if(!userId){
        throw new Error('Unauthorized');
    }

    const workflow = await prisma.workflow.findUnique({
        where: {id, userId},
    });

    if(!workflow){
        throw new Error('Workflow not found');
    }
    if(workflow.status !== workflowStatus.DRAFT){
        throw new Error('Only draft workflows can be updated');
    }

    await prisma.workflow.update({
        where:{id, userId},
        data:{definition},
    });

    revalidatePath("/workflows")
}