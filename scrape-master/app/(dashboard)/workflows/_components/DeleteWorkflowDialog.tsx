"use client";
import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogTrigger,
 } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

 import React, { useState } from 'react'
import { toast } from "sonner";
 
interface Props{
    open: boolean;
    setOpen: (isOpen: boolean) => void;
    workflowName: string;
    workflowId: string;
 
}

 function DeleteWorkflowDialog({open, setOpen, workflowName, workflowId}:Props) {
    const [confirmText, setConfirmText] = useState("");

    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success("Workflow deleted successfully.",{id: workflowId});
            setConfirmText("");
        },
        onError: () => {
            toast.error("Failed to delete workflow.",{id: workflowId});
            setOpen(false);
        },
        
    })
   return <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this workflow?
                <div className="flex flex-col py-4 gap-2"></div>
                <p>If sure, enter <b>{workflowName}</b> to conform:</p>
                <Input value={confirmText} onChange={(e)=>setConfirmText(e.target.value)}/>
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={()=> setConfirmText("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={confirmText !== workflowName || deleteMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={(e)=>{
                e.stopPropagation();
                toast.loading("Delete Workflow...",{id: workflowId});
                deleteMutation.mutate(workflowId);
            }}>Delete</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
 }
 
 export default DeleteWorkflowDialog