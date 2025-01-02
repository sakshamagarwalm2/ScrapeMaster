"use server";

import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionplan } from "@/lib/workflow/executuionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/type/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function RunWorkflow(form:{
    workflowId: string;
    flowdefinition?: string;
}){
    const {userId} = await auth();
    if(!userId){
        throw new Error('Unauthorized');
    }
    const {workflowId, flowdefinition} = form;
    if(!workflowId){
        throw new Error('Workflow ID is required');
    }

    const workflow = await prisma.workflow.findUnique({
        where: {id: workflowId, userId},
    });

    if(!workflow){
        throw new Error('Workflow not found');
    }

    let executionPlan: WorkflowExecutionPlan;
    if(!flowdefinition){
        throw new Error('Workflow definition is required');
    }

    const flow = JSON.parse(flowdefinition);
    const result = FlowToExecutionplan(flow.nodes, flow.edges);
    if(result.error){
        throw new Error("flow definition not valid");
    }
    if(!result.executionPlan){
        throw new Error("Execution plan not generated");
    }

    executionPlan = result.executionPlan;

    const execution = await prisma.workflowExecution.create({
        data:{
            workflowId,
            userId,
            status: WorkflowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WorkflowExecutionTrigger.MANUAL,
            phases:{
                create: executionPlan.flatMap((phase)=>{
                    return phase.nodes.flatMap((node)=>{
                        return{
                            userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label,
                        }
                    })
                })
            }
        },
        select:{
            id: true,
            phases: true,
        },
    });

    if (!execution){
        throw new Error('Failed to create workflow execution');
    }

    



    ExecuteWorkflow(execution.id);

    redirect(`/workflow/runs/${workflowId}/${execution.id}`);

}