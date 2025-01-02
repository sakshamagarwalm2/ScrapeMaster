"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import React from "react";
import useExecutionPlan from "../hooks/useExecutionPlan";
import { useMutation } from "@tanstack/react-query";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const {toObject}= useReactFlow();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Workflow executed successfully.", {
        id: "flow-execution",
      });
    },
    onError: () => {
      toast.error("Failed to execute workflow.", { id: "flow-execution" });
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
        mutation.mutate({
          workflowId: workflowId,
          flowdefinition: JSON.stringify(toObject()),

        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute_
    </Button>
  );
}
