// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "10px",
        position: "fixed", // Keep it at the top of the page
        top: 0, // Align at the very top
        left: 0, // Align to the left
        right: 0, // Stretch to the right
        backgroundColor: "#f8f9fa", // Light background color
        borderBottom: "1px solid #ddd", // Subtle bottom border
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Center-align the items horizontally
        zIndex: 1000, // Ensure it stays on top
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
