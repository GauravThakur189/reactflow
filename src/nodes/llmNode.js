import React from "react";
import BaseNode from './baseNodee';
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

