import React, { useState } from "react";

export const DraggableNode = ({ type, label }) => {
  const [isHovered, setIsHovered] = useState(false); 

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")} 
      onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
      style={{
        cursor: "grab",
        minWidth: "100px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        backgroundColor: isHovered ? "#45a049" : "#4CAF50", 
        color: "#fff",
        fontSize: "14px",
        fontWeight: "bold",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, background-color 0.3s",
        textAlign: "center",
        flexDirection: "column",
        userSelect: "none",
      }}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
