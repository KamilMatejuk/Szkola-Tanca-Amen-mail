import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import SortableSection from './SortableSection';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({value, onChange}: EditorProps) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragStart = (e: DragEvent) => {
      const draggableElem = e.target instanceof HTMLElement ? e.target.closest('[draggable="true"]') : null;
      if (draggableElem) setIsDragging(true);
    };
    const handleDragEnd = () => setIsDragging(false);
    document.addEventListener('dragstart', handleDragStart as any);
    document.addEventListener('dragend', handleDragEnd as any);
    return () => {
      document.removeEventListener('dragstart', handleDragStart as any);
      document.removeEventListener('dragend', handleDragEnd as any);
    };
  }, []);

  const [sections, setSections] = useState<Array<{ id: string; content: string }>>([]);

  useEffect(() => {
    if (value) {
      const newSections = value.split('\n\n').filter(Boolean).map((content) => ({ id: content, content: content }));
      setSections(newSections);
    } else {
      setSections([]);
    }
  }, [value]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleExternalDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.dataTransfer.getData('text/html');
    if (!html) return;
    const newSections = [...sections, { id: html, content: html }];
    setSections(newSections);
    onChange(newSections.map(s => s.id).join('\n\n'));
  };

  const handleSectionsChange = (newSections: Array<{ id: string; content: string }>) => {
    setSections(newSections);
    onChange(newSections.map(s => s.id).join('\n\n'));
  };


  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const newSections = arrayMove(sections, oldIndex, newIndex);
    setSections(newSections);
    onChange(newSections.map(s => s.id).join('\n\n'));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(event) => handleDragEnd(event)}
    >
      <div className="w-[600px] p-4 bg-white border border-gray-300 rounded">
        <SortableContext items={sections.map(s => s.id)}>
          <div>
            {sections.map((section) => (
              <SortableSection
                key={section.id}
                id={section.id}
                content={section.content}
                sections={sections}
                onChange={handleSectionsChange}
              />
            ))}
            {(sections.length == 0 || isDragging) && (
              <div
                className="w-full py-3 flex items-center justify-center text-sm text-gray-600 border-dashed border-2 border-gray-400 rounded cursor-pointer"
                title="Drop a section here"
                onDrop={handleExternalDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                Wybierz sekcję
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
};
