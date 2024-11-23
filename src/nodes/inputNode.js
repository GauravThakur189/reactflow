import React from 'react';
import BaseNode from './baseNodee';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="Input"
      data={data}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    />
  );
};
