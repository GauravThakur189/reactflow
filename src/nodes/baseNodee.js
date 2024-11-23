// import React, { useState } from 'react';
// import { Handle } from 'reactflow';

// /**
//  * A reusable BaseNode component that handles common functionality for all nodes.
//  * 
//  * Props:
//  * - id: Unique identifier for the node.
//  * - type: The type of node ("Input", "LLM", "Output").
//  * - data: Custom data passed to the node (e.g., names, types).
//  * - handles: An array of handle configurations (type, position, id, style).
//  * - content: A function or JSX that defines the unique content of the node.
//  */
// const BaseNode = ({ id, type, data = {}, handles = [], content }) => {
//   const [currName, setCurrName] = useState(data?.name || `${type.toLowerCase()}_${id}`);
//   const [nodeType, setNodeType] = useState(data?.nodeType || 'Text');

//   const handleNameChange = (e) => setCurrName(e.target.value);
//   const handleTypeChange = (e) => setNodeType(e.target.value);

//   return (
//     <div style={{ width: 200, height: 100, border: '1px solid black', padding: 10 }}>
//       {handles.map((handle, index) => (
//         <Handle
//           key={index}
//           type={handle.type}
//           position={handle.position}
//           id={handle.id}
//           style={handle.style}
//         />
//       ))}


//       <div>
//         <span>{type}</span>
//       </div>

//       <div>
//         <label>
//           Name:
//           <input
//             type="text"
//             placeholder='write here'
//             value={currName}
//             onChange={handleNameChange}
//           />
//         </label>

//         {type !== 'LLM' && (
//           <label>
//             Type:
//             <select value={nodeType} onChange={handleTypeChange}>
//               <option value="Text">Text</option>
//               <option value="File">{type === 'Output' ? 'Image' : 'File'}</option>
//             </select>
//           </label>
//         )}
//       </div>

//       {content && <div>{content()}</div>}
//     </div>
//   );
// };

// export default BaseNode;




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
        border: "1px solid black",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: "200px",
        minHeight: "100px",
      }}
    >
      {/* Render Handles */}
      {dynamicHandles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type || "target"}
          position={handle.position}
          id={handle.id}
          style={handle.style}
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
          border: "1px solid gray",
          borderRadius: "4px",
          padding: "5px",
          overflow: "hidden", // Prevent scrollbars
          boxSizing: "border-box", // Include padding in width and height calculation
          whiteSpace: "pre-wrap", // Preserve line breaks
          overflowWrap: "break-word", // Break long words if necessary
          display: "inline-block", // Ensures inline expansion
        }}
      />

      {/* Display Custom Content */}
      {content && content()}

      {/* Info Below Input */}
      <small style={{ marginTop: "10px", color: "gray" }}>
        Type {"{{variable}}"} to create dynamic handles
      </small>
    </div>
  );
};

export default BaseNode;
