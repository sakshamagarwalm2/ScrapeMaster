
import { revalidatePath } from "next/cache";
import "server-only";
import prisma from "../prisma";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/type/workflow";
import {ExecutionPhase} from "@prisma/client";
import { AppNode } from "@/type/appNode";
import { TaskRegistry } from "./task/registry";
import { waitFor } from "../helper/waitFor";

export async function ExecuteWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: { id: executionId },
    include: { workflow: true, phases: true },
  });
  if (!execution) {
    throw new Error("Workflow execution not found");
  }

  const environment = { phases: {} };

  await initializeWorkflowExecution(executionId, execution.workflowId);

  await initializePhaseStatuses(execution);

  let creditsConsumed =0;
  let executionFailed = false;
  for (const phase of execution.phases) {
    


    const phaseExecution = await executeWorkflowPhase(phase);
    if(!phaseExecution.success){
      executionFailed = true;
      break;
    }

  }


  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed
  );





  revalidatePath("/workflows/runs");
}

async function initializeWorkflowExecution(
  executionId: string,
  workflowId: string
) {
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data:{
        startedAt: new Date(),
        status: WorkflowExecutionStatus.RUNNING,
    }
  });

  await prisma.workflow.update({
    where:{
        id: workflowId,
    },
    data:{
        lastRunAt: new Date(),
        lastRunStatus: WorkflowExecutionStatus.RUNNING,
        lastRunId: executionId,
    },
  })
}

async function initializePhaseStatuses(execution: any) {
  await prisma.executionPhase.updateMany({
    where:{
      id:{
        in: execution.phases.map((p: any) => p.id),
      },
    },
    data:{
      status: ExecutionPhaseStatus.PENDING,
    }
  })
}

async function finalizeWorkflowExecution(
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
 creditsConsumed: number){

  const finalStatus = executionFailed? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED;

  await prisma.workflowExecution.update({
    where:{id:executionId},
    data:{
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed,
    },
  });

  await prisma.workflow.update({
    where:{id: workflowId, lastRunId: executionId},
    data:{
      lastRunStatus: finalStatus,
    },
  })
  .catch((err)=>{

  })
  }

  async function executeWorkflowPhase(phase: ExecutionPhase){
    const startedAt = new Date();
    const node = JSON.parse(phase.node) as AppNode;

    await prisma.executionPhase.update({
      where:{id: phase.id},
      data:{
        status: ExecutionPhaseStatus.RUNNING,
        startedAt,
      },
    });

    const creditsRequired = TaskRegistry[node.data.type].credits;


    const success = executePhase(phase,node);


    await finalizePhase(phase.id, success);
    return{success};
  }

  async function finalizePhase(phaseId: string, success: boolean){
    const finalizePhase = success? ExecutionPhaseStatus.COMPLETED: ExecutionPhaseStatus.FAILED;
  
    await prisma.executionPhase.update({
      where:{id: phaseId},
      data:{
        status: finalizePhase,
        completedAt: new Date(),
      },
    });
  }
  
  function executePhase(phase: ExecutionPhase, node: AppNode):Promise<boolean>{
    const runFn = ExecutorRegistry[node.data.type];
    if(!runFn){
      return false;
    }
    return await runFn();
  }
