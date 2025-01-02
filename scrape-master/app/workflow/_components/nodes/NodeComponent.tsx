import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/type/appNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { NodeInput, NodeInputs } from "./NodeInputs";
import { NodeOutput } from "./NodeOutputs";
import { NodeOutputs } from "./NodeOutputs";

const DEV_MODE =process.env.NEXT_PUBLIC_DEV_MODE === "true";

const NodeComponent = memo((props: NodeProps)=>{
    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type];

    return <NodeCard nodeId={props.id} isSelected={!!props.selected} >
        <NodeHeader  taskType={nodeData.type} nodeId={props.id} />
        <NodeInputs>
            {task.inputs.map(input=>(
                <NodeInput key={input.name} input={input} nodeId={props.id} />
            ))}
        </NodeInputs>
        <NodeOutputs>
            {task.outputs.map(output=>(
                <NodeOutput key={output.name} output={output} />
            ))}
        </NodeOutputs>
    </NodeCard>
});

export default NodeComponent;

NodeComponent.displayName = "NodeComponent";

