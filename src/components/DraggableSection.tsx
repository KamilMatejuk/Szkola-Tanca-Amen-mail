import React from 'react';

export interface DraggableSectionProps {
  label: string;
  dragContent: string;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({ label, dragContent }) => (
  <div
    className="bg-gray-200 rounded p-2 mb-2 cursor-grab"
    draggable="true"
    onDragStart={(e) => {
      e.dataTransfer.setData('text/html', dragContent);
    }}
  >
    {label}
  </div>
);

export default DraggableSection;
