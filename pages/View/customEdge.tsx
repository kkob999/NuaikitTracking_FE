import {
  BaseEdge,
  EdgeProps,
} from "reactflow";

export type GetSpecialPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  data: {
    sp: boolean,
    edPos: number
  };
};


export const getSpecialPath = (
    { sourceX, sourceY, targetX, targetY,data }: GetSpecialPathParams
  ) => {
    const centerX = (sourceX + targetX) / 2;
    const centerY = (sourceY + targetY) / 2;
    let breakPoint = sourceX+((window.innerWidth * 30) / 1440); 
    if(sourceX+((window.innerWidth * 26) / 1440)>=centerX){
        breakPoint = sourceX+((window.innerWidth * 8) / 1440);
    }
    if(data.sp == true){
      return `M ${sourceX} ${sourceY} L ${data.edPos} ${sourceY} L ${data.edPos} ${targetY} L ${targetX} ${targetY}`;
      // return `M ${sourceX} ${sourceY} L ${breakPoint} ${sourceY} L ${breakPoint} ${targetY+30} L ${targetX-24} ${targetY+30} L ${targetX-24} ${targetY} L ${targetX} ${targetY}`;
      // console.log(data.edPos)
    }
    
    let x = (window.innerWidth * 96) / 1440

    if(window.innerWidth < 1299) x = (window.innerWidth * 120) / 1440
    
    if( typeof(data.edPos) == 'number') {
      // if (sourceX - x < 20 ) {
      //   // x = (window.innerWidth * 120) / 1440
      //   return `M ${sourceX} ${sourceY} L ${data.edPos-x} ${sourceY} L ${data.edPos-x} ${targetY} L ${targetX} ${targetY}`;
      // }else{
        return `M ${sourceX} ${sourceY} L ${data.edPos+x} ${sourceY} L ${data.edPos+x} ${targetY} L ${targetX} ${targetY}`;
      // }
      
    }

    return `M ${sourceX} ${sourceY} L ${breakPoint} ${sourceY} L ${breakPoint} ${targetY} L ${targetX} ${targetY}`;
};

export default function CustomEdge({
    source,
    target,
    sourceX,
    sourceY,
    targetX,
    targetY,
    markerEnd,
    data
  }: EdgeProps){
    let path = ''
    data = data
    const edgePathParams = {
        sourceX,
        sourceY,
        targetX,
        targetY,
        data
      };
      path = getSpecialPath(edgePathParams);
      // console.log(edgePathParams)
      return <BaseEdge path={path} markerEnd={markerEnd} style={{stroke: "#000000", strokeWidth: 1.5}}/>;
  }

// export function CustomEdge({
//   sourceX,
//   sourceY,
//   targetX,
//   targetY,
//   ...props
// }: EdgeProps) {
//   let [edgePath, offsetX, offsetY] = getBezierPath({
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//   });

//   console.log(edgePath);
//   console.log(offsetX);

//   return <BaseEdge path={edgePath} {...props} style={{ color: "#ffffff" }} />;
// }
