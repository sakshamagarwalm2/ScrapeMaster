import { AppNode, AppNodeMissingInputs } from "@/type/appNode";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/type/workflow";
import { Edge} from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

export enum FlowToExecutionPlanValidationError{
    "NO_ENTRY_POINT",
    "INVALID_INPUTS",
    
}

type FlowToExecutionplanType={
    executionPlan?: WorkflowExecutionPlan;
    error?:{
        type: FlowToExecutionPlanValidationError;
        invalidElements?: AppNodeMissingInputs[];
    }
}

export function FlowToExecutionplan(nodes: AppNode[], edges: Edge[]): FlowToExecutionplanType {
    const entryPoint = nodes.find(
        (node)=> TaskRegistry[node.data.type].isEntryPoint
    );

    if (!entryPoint){
        return{
            error:{
                type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
            }
        }
    }
    
    
    const inputsWithErrors: AppNodeMissingInputs[]=[];
    
    const planned = new Set<string>();
    const invalidinputs = getInvalidInputs(entryPoint, edges, planned);
    if(invalidinputs.length>0){
        inputsWithErrors.push({
            nodeId: entryPoint.id,
            inputs: invalidinputs,
        });
    }
    
    
    const executionPlan: WorkflowExecutionPlan = [{
        phase:1, nodes:[entryPoint],
    }];
    
    planned.add(entryPoint.id);
    
    for(let phase = 2; phase<=nodes.length && planned.size< nodes.length ; phase++){
        const nextPhase: WorkflowExecutionPlanPhase = {phase, nodes:[]};
        for(const currentNode of nodes){
            if(planned.has(currentNode.id)){
                continue;
            }
            const invalidinputs = getInvalidInputs(currentNode, edges, planned);
            if(invalidinputs.length > 0){
                const incomers = getIncomers(currentNode,nodes, edges);
                if(incomers.every((incomer)=> planned.has(incomer.id))){
                    
                    inputsWithErrors.push({
                        nodeId: currentNode.id,
                        inputs: invalidinputs,
                    });
                }
                else{
                    continue;
                }
            }
            
            nextPhase.nodes.push(currentNode);
        }
        for(const node of nextPhase.nodes){
            planned.add(node.id);
        }
        executionPlan.push(nextPhase);
    }
    
    if(inputsWithErrors.length>0){
        return{
            error:{
                type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
                invalidElements: inputsWithErrors,
            }
        }
    }
    console.log(executionPlan)
    return {executionPlan};
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>){
    const invalidinputs = [];
    const inputs = TaskRegistry[node.data.type].inputs;
    for(const input of inputs){
        const inputValue = node.data.inputs[input.name];
        const inputValueProvided = inputValue?.length >0;
        if(inputValueProvided){
            continue;
        }

        const incoingEdges = edges.filter((edge)=> edge.target === node.id);

        const inputLinkedToOutput = incoingEdges.find((edges)=> edges.targetHandle === input.name);

        const requiredInputProvidedByVisitedOutput = input.required && inputLinkedToOutput && planned.has(inputLinkedToOutput.source);
        if(requiredInputProvidedByVisitedOutput){
            continue;
        }else if(!input.required){
            if(!inputLinkedToOutput) continue;
            if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)){
                continue;
            }
        }

        invalidinputs.push(input.name);

    }

    return invalidinputs;
}

function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]){
        if (!node.id){
            return [];
        }
        const incomersIds = new Set();
        edges.forEach((edge) =>{
            if (edge.target === node.id){
                incomersIds.add(edge.source);
            }
        });
        return nodes.filter((n) => incomersIds.has(n.id));
}