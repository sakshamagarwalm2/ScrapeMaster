"use client";

import { UpdateWorkflow } from '@/actions/workflows/updateWorkflow';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { CheckIcon } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

function SaveBtn({workflowId}:{workflowId:string}) {
    const {toObject} = useReactFlow();
    const saveMutation = useMutation({
        mutationFn: UpdateWorkflow,
        onSuccess: () =>{
            toast.success("Workflow saved",{id: "save-workflow"})
        },
        onError: () => {
            toast.error("Failed to save workflow",{id: "save-workflow"})
        }
    })
  return (
    <Button
    variant={"outline"}
    className='fle
     items-center gap-2'
     onClick={()=>{
        const workdlowDefinition = JSON.stringify(toObject());
        saveMutation.mutate({
            id: workflowId,
            definition: workdlowDefinition
        })
          }}>
        <CheckIcon size={16} className='stroke-green-400'/>
        Save_
     </Button>

  )
}

export default SaveBtn