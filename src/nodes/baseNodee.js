import React, { useState, useEffect, useRef } from "react";
import { Handle } from "reactflow";

const BaseNode = ({ id, type, data, handles, content }) => {
  const [text, setText] = useState(data?.text || ""); // State for text input
  const [dynamicHandles, setDynamicHandles] = useState(handles || []); // State for dynamic handles
  const textareaRef = useRef(null); // Ref for textarea to calculate size

  // Detect variables and create handles dynamically
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g; // Match {{ variable }}
    const matches = [...text.matchAll(regex)];
    const newHandles = matches.map((match, index) => ({
      id: `${id}-${match[1]}`,
      position: "left", // Position handles on the left
      variable: match[1],
      style: { top: `${(index + 1) * 20}px` }, // Adjust position dynamically
    }));
    setDynamicHandles([...handles, ...newHandles]); // Combine static and dynamic handles
  }, [text, handles, id]);

  // Adjust the size of the textarea dynamically
  const adjustTextareaSize = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Temporarily reset width and height to auto to recalculate
      textarea.style.height = "auto";
      textarea.style.width = "auto";

      // Dynamically set the width and height based on scroll sizes
      const scrollWidth = Math.max(textarea.scrollWidth, 200); // Minimum width of 200px
      const scrollHeight = Math.max(textarea.scrollHeight, 50); // Minimum height of 50px
      textarea.style.width = `${scrollWidth}px`;
      textarea.style.height = `${scrollHeight}px`;
    }
  };

  // Call adjustTextareaSize whenever text changes
  useEffect(() => {
    adjustTextareaSize();
  }, [text]);

  // Update text and optionally propagate changes to parent
  const handleTextChange = (e) => {
    setText(e.target.value);
    if (data?.onChange) {
      data.onChange(e.target.value); // Notify parent if onChange is provided
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #4CAF50", // Use theme color for border
        borderRadius: "8px",
        backgroundColor: "#f9f9f9", // Light background for contrast
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: "200px",
        minHeight: "100px",
        transition: "border-color 0.3s ease", // Smooth transition for hover effects
      }}
    >
      {/* Render Handles */}
      {dynamicHandles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type || "target"}
          position={handle.position}
          id={handle.id}
          style={{
            ...handle.style,
            backgroundColor: "#4CAF50", // Theme color for handles
            borderRadius: "50%", // Circular handles for aesthetics
            width: "10px", // Adjust handle size
            height: "10px",
            border: "none",
          }}
        />
      ))}

      {/* Render Content (Text Input Field) */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text..."
        style={{
          resize: "none", // Prevent manual resizing
          border: "1px solid #4CAF50", // Theme color for border
          borderRadius: "4px",
          padding: "5px",
          overflow: "hidden", // Prevent scrollbars
          boxSizing: "border-box", // Include padding in width and height calculation
          whiteSpace: "pre-wrap", // Preserve line breaks
          overflowWrap: "break-word", // Break long words if necessary
          display: "inline-block", // Ensures inline expansion
          transition: "border-color 0.3s ease", // Smooth transition for border color
        }}
      />

      {/* Display Custom Content */}
      {content && content()}

      {/* Info Below Input */}
      <small style={{ marginTop: "10px", color: "#4CAF50" }}>
        {" "}
        {/* Use theme color for text */}
        Type {"{{variable}}"} to create dynamic handles
      </small>
    </div>
  );
};

export default BaseNode;
