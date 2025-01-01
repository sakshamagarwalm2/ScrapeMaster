"use client";

import { Button } from "@/components/ui/button";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, ReactFlow, useReactFlow } from "@xyflow/react";

export default function DeletableEdge(props: EdgeProps) {
    const [edgePath, labelX, labelY]= getSmoothStepPath(props);
    const {setEdges} = useReactFlow();

  return (
  <>
  <BaseEdge path={edgePath} markerEnd={props.markerEnd}
  style={props.style}
  />
  <EdgeLabelRenderer>
    <div style={{
        position: 'absolute',
        transform:`translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
        pointerEvents:"all",
    }}>
        <Button
        variant={"outline"}
        size={"icon"}
        className="w-5 h-5 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg"
        onClick={()=>{
            setEdges((edges)=>edges.filter((e) => e.id!== props.id));
        }}
        >X</Button>
    </div>
  </EdgeLabelRenderer>
  </>);
}