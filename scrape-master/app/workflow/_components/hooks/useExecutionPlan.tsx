import { FlowToExecutionplan, FlowToExecutionPlanValidationError } from "@/lib/workflow/executuionPlan";
import { AppNode } from "@/type/appNode";
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidation";
import { toast } from "sonner";


const useExecutionPlan=()=> {
 const {toObject} = useReactFlow();
 const {setInvalidInputs, clearErrors}= useFlowValidation();

 const handleError = useCallback((error: any) => {
    switch(error.type){
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
            toast.error("No entry pointfound");
            break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
            toast.error("Invalid input");
            setInvalidInputs(error.invalidElements);
            break;
        default:
            toast.error("An error occurred");
            break;
        
    }
  }, [setInvalidInputs]);

 const generateExecutionPlan = useCallback(()=>{
    const {nodes,edges}= toObject();
    const {executionPlan, error} = FlowToExecutionplan(nodes as AppNode[], edges);

    if(error){
        handleError(error);
        return null;
    }
    clearErrors();
    return executionPlan;
 

},[toObject, handleError,clearErrors]);
 return generateExecutionPlan;
}

export default useExecutionPlan