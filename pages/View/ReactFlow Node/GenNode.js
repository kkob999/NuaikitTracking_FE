import React, { memo } from "react";
import { Handle, Position,  } from "reactflow";
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
      />
      {/* <div onClick={ClickedNode} className="node gen-node">  */}
      <div className="node gen-node">
        <div className="node-heading">
            <div className="gen-txt">{data.sub_no}</div>
            <input type="radio"></input>
        </div>
        
        {/* <div>{isClicked()}</div> */}
      </div>
      {/* <input className="nodrag" type="color" onChange={data.onChange} defaultValue={data.color} /> */}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{opacity: 0}}
        isConnectable={isConnectable}
      />
    </>
  );
});
