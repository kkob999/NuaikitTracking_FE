import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import "./reactFlow.css"

export default memo(({ data, isConnectable, id, selected }) => {

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
        id="left"
      />
      <Handle
        type="source"
        position={Position.Top}
        style={{ opacity: 0 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
        id="top"
      />
      {/* <div onClick={ClickedNode} className="node gen-node">  */}
      <div className="node gen-node">
        <div className="node-heading">
            <div className="gen-txt">{data.sub_no}</div>
            <input type="radio"></input>
        </div>
        <div className="gen-txt node-name">{data.sub_name}</div>
        {/* <div>{isClicked()}</div> */}
      </div>
      {/* <input className="nodrag" type="color" onChange={data.onChange} defaultValue={data.color} /> */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
        id="bottom"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{opacity: 0}}
        isConnectable={isConnectable}
      />
    </>
  );
});
