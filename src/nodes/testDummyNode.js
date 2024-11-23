import React from 'react';
import BaseNode from './baseNodee';
import { Position } from 'reactflow';
export const DummyNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="Dummy"
      data={data}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
      content={() => (
        <div>
          <label>
            Dummy Input:
            <input
              type="text"
              value={data?.dummyInput || 'default_dummy_value'}
              onChange={(e) => (data.dummyInput = e.target.value)}
            />
          </label>
          <label>
            Dummy Type:
            <select
              value={data?.dummyType || 'Option1'}
              onChange={(e) => (data.dummyType = e.target.value)}
            >
              <option value="Option1">Option 1</option>
              <option value="Option2">Option 2</option>
              <option value="Option3">Option 3</option>
            </select>
          </label>
        </div>
      )}
    />
  );
};
