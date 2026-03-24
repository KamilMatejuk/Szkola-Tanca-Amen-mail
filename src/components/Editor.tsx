import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { DndContext, closestCenter, useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import SortableSection from './SortableSection';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { MailContent } from '../utils/storage';
import { v7 as uuidv7 } from 'uuid';

interface EditorProps {
  content: MailContent[];
  setContent: Dispatch<SetStateAction<MailContent[]>>;
}

export default function Editor({ content, setContent }: EditorProps) {
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDropAt = (index: number, e: React.DragEvent<HTMLDivElement>) => {
    console.log('Handle drop at', index)
    e.preventDefault();
    const html = e.dataTransfer.getData('text/html');
    if (!html) return;
    const newSection = { type: html, content: html, id: uuidv7() } as MailContent;
    const newSections = [...content.slice(0, index), newSection, ...content.slice(index)];
    setContent(newSections);
  };

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = content.findIndex((c) => c.id === active.id);
    const newIndex = content.findIndex((c) => c.id === over.id);
    console.log('drag end', oldIndex, newIndex)
    if (oldIndex < 0 || newIndex < 0) return;
    const newSections = arrayMove(content, oldIndex, newIndex);
    setContent(newSections);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(event) => handleDragEnd(event)}
    >
      <div className="w-[600px] p-4 bg-white border border-gray-300 rounded">
        <SortableContext items={content.map(s => s.id)}>
          <div>
            {(content.length == 0 || isDragging) && (
              <div
                className="w-full py-3 flex items-center justify-center text-sm text-gray-600 border-dashed border-2 border-gray-400 rounded cursor-pointer"
                title="Drop a section here"
                onDrop={(e) => handleDropAt(0, e)}
                onDragOver={(e) => e.preventDefault()}
              >
                Wybierz sekcję
              </div>
            )}
            {content.map((section, idx) => (
              <React.Fragment>
                <SortableSection
                  key={section.id}
                  content={section}
                />
                {(
                  <div
                    className="w-full py-3 flex items-center justify-center text-sm text-gray-600 border-dashed border-2 border-gray-400 rounded cursor-pointer"
                    title="Drop a section here"
                    onDrop={(e) => handleDropAt(idx + 1, e)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    Wybierz sekcję
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
};
