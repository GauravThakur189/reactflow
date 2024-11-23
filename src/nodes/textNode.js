import React from 'react';
import BaseNode from './baseNodee';
import { Position } from 'reactflow';
export const TextNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="Text"
      data={data}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
      content={() => (
        <label>
          Text:
          <input
            type="text"
            value={data?.text || '{{input}}'}
            onChange={(e) => (data.text = e.target.value)} // Dynamically update data
          />
        </label>
      )}
    />
  );
};
