"user client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNode } from "@/type/appNode";
import { TaskType } from "@/type/task";
import { useReactFlow } from "@xyflow/react";
import { add } from "date-fns";
import { CoinsIcon, Copy, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import React from "react";

function NodeHeader({ taskType, nodeId }: { taskType: TaskType, nodeId: string}) {
  const task = TaskRegistry[taskType];
  const {deleteElements, getNode,addNodes} = useReactFlow();
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>
          {!task.isEntryPoint && (
            <>
            <Button variant={"ghost"} size={"icon"} className="text-red-500" onClick={
              ()=>{
                deleteElements({
                  nodes: [{id: nodeId}]
                });
              }
            }>
              <TrashIcon size={12} />
            </Button>
            <Button variant={"ghost"} size={"icon"}
            onClick={()=>{
              const node = getNode(nodeId) as AppNode;
              const newX = node.position.x;
              const newY = node.position.y;

              const newnode = CreateFlowNode(node.data.type,{
                x: newX,
                y: newY + node.measured?.height!+20,
              });
              addNodes([newnode]);
              
            }}
            >
              <CopyIcon size={12} />
            </Button>
            </>
          )}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
