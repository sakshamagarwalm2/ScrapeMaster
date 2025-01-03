"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon, UploadIcon } from "lucide-react";
import React from "react";
import useExecutionPlan from "../hooks/useExecutionPlan";
import { useMutation } from "@tanstack/react-query";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";
import { PublishWorkflow } from "@/actions/workflows/publishworkflow";

export default function PublishBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const {toObject}= useReactFlow();

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow published", {
        id: workflowId,
      });
    },
    onError: () => {
      toast.error("Failed to publish workflow.", { id: workflowId });
    },
  });

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if(!plan){
          return;
        }
        toast.loading("Publishing workflow...",{id: workflowId})
        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),

        });
      }}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish_
    </Button>
  );
}
