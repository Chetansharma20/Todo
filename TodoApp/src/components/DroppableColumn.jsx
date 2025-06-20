import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const DroppableColumn = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      status: id, 
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isOver ? '#e0f7fa' : '#fff',
        padding: 8,
        borderRadius: 8,
        minHeight: 500,
        transition: 'background 0.2s ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

export default DroppableColumn;
