import React from 'react';
import BaseNode from './baseNodee';
import { Position } from 'reactflow';


export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="Output"
      data={data}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-value` },
      ]}
    />
  );
};
