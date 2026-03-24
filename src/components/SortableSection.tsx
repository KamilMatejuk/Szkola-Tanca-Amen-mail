import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableSectionProps {
  id: string;
  content: string;
  onChange: (sections: Array<{ id: string; content: string }>) => void;
  sections: Array<{ id: string; content: string }>;
}

export default function SortableSection({ id, content, onChange, sections }: SortableSectionProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    cursor: 'grab',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.dataTransfer.getData('text/html');
    if (!html) return;
    const newSections = [...sections];
    const idx = newSections.findIndex(s => s.id === id);
    newSections.splice(idx, 0, { id: html, content: html });
    onChange(newSections);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-300 rounded p-2 mb-2"
      dangerouslySetInnerHTML={{ __html: content }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      {...attributes}
      {...listeners}
    />
  );
};
