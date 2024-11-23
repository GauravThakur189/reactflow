// import React from 'react';
// import BaseNode from './baseNodee';
// import { Position } from 'reactflow';
// export const LLMNode = ({ id, data }) => {
//   return (
//     <BaseNode
//       id={id}
//       type="LLM"
//       data={data}
//       handles={[
//         { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
//         { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
//         { type: 'source', position: Position.Right, id: `${id}-response` },
//       ]}
//       content={() => <span>Hello! This is an LLM.</span>}
//     />
//   );
// };






import React from "react";
import BaseNode from './baseNodee';// Import the updated BaseNode
import { Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="LLM"
      data={{
        ...data,
        text: data.text || "This is an LLM",
      }}
      handles={[
        { type: "target", position: Position.Left, id: `${id}-system`, style: { top: "20%" } },
        { type: "target", position: Position.Left, id: `${id}-prompt`, style: { top: "40%" } },
        { type: "source", position: Position.Right, id: `${id}-response` },
      ]}
      content={() => <span>{data?.description || "Hello! This is an LLM."}</span>}
    />
  );
};

