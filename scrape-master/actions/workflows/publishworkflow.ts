"use server";

import prisma from "@/lib/prisma";
import { FlowToExecutionplan } from "@/lib/workflow/executuionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helper";
import { workflowStatus } from "@/type/workflow";
import { auth } from "@clerk/nextjs/server";
import { Workflow } from "lucide-react";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({
    id,
    flowDefinition,
}:{
    id: string,
    flowDefinition: string,
}){
    const {userId} = await auth();
    if (!userId){
        throw new Error('Unauthorized');
    }

    const workflow = await prisma.workflow.findUnique({
        where: {id, userId},
    });
    if(!workflow){
        throw new Error('Workflow not found');
    }

    if(workflow.status!==workflowStatus.DRAFT){
        throw new Error('Only draft workflows can be published');
    }

    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionplan(flow.nodes, flow.edges);
    if(result.error){
        throw new Error("flow definition not valid");
    }
    if(!result.executionPlan){
        throw new Error("Execution plan not generated");
    }

    const creditsCost = CalculateWorkflowCost(flow.nodes);
    await prisma.workflow.update({
        where:{id, userId},
        data:{
            definition: flowDefinition,
            executionPlan: JSON.stringify(result.executionPlan),
            creditsCost,
            status: workflowStatus.PUBLISHED,

        }
    });

    revalidatePath(`/workflow/editor/${id}`);
}