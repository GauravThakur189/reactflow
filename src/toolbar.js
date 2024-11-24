// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "10px",
        position: "fixed", 
        top: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: "#f8f9fa", 
        borderBottom: "1px solid #ddd", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center", 
        zIndex: 1000, 
      }}
    >
      <div style={{ display: "flex", flexWrap: "nowrap", gap: "15px" }}>
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="text" label="New Node" />
        <DraggableNode type="dummy" label="DummyNode" />
        <DraggableNode type="llm" label="DummyLLM" />
      </div>
    </div>
  );
};
