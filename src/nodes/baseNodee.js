import React, { useState, useEffect, useRef } from "react";
import { Handle } from "reactflow";

const BaseNode = ({ id, type, data, handles, content }) => {
  const [text, setText] = useState(data?.text || ""); 
  const [dynamicHandles, setDynamicHandles] = useState(handles || []); 
  const textareaRef = useRef(null); 
 

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g; 
    const matches = [...text.matchAll(regex)];
    const newHandles = matches.map((match, index) => ({
      id: `${id}-${match[1]}`,
      position: "left", 
      variable: match[1],
      style: { top: `${(index + 1) * 20}px` }, 
    }));
    setDynamicHandles([...handles, ...newHandles]); 
  }, [text, handles, id]);

  
  const adjustTextareaSize = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      
      textarea.style.height = "auto";
      textarea.style.width = "auto";

      
      const scrollWidth = Math.max(textarea.scrollWidth, 200); 
      const scrollHeight = Math.max(textarea.scrollHeight, 50); 
      textarea.style.width = `${scrollWidth}px`;
      textarea.style.height = `${scrollHeight}px`;
    }
  };

  
  useEffect(() => {
    adjustTextareaSize();
  }, [text]);

  
  const handleTextChange = (e) => {
    setText(e.target.value);
    if (data?.onChange) {
      data.onChange(e.target.value); 
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #4CAF50", 
        borderRadius: "8px",
        backgroundColor: "#f9f9f9", 
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: "200px",
        minHeight: "100px",
        transition: "border-color 0.3s ease", 
      }}
    >
     
      {dynamicHandles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type || "target"}
          position={handle.position}
          id={handle.id}
          style={{
            ...handle.style,
            backgroundColor: "#4CAF50", 
            borderRadius: "50%", 
            width: "10px", 
            height: "10px",
            border: "none",
          }}
        />
      ))}

    
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text..."
        style={{
          resize: "none", 
          border: "1px solid #4CAF50", 
          borderRadius: "4px",
          padding: "5px",
          overflow: "hidden", 
          boxSizing: "border-box", 
          whiteSpace: "pre-wrap", 
          overflowWrap: "break-word", 
          display: "inline-block", 
          transition: "border-color 0.3s ease", 
        }}
      />

     
      {content && content()}

     
      <small style={{ marginTop: "10px", color: "#4CAF50" }}>
        {" "}
        
        Type {"{{variable}}"} to create dynamic handles
      </small>
    </div>
  );
};

export default BaseNode;
