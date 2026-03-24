import { useState, useEffect, SetStateAction, Dispatch, Fragment, DragEvent } from 'react';
import { DndContext, closestCenter, useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import SortableSection from './SortableSection';
import DropZone from './DropZone';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { v7 as uuidv7 } from 'uuid';
import { MailContent, SectionType } from '../utils/types';

const classes = { container: 'w-[600px] p-4 bg-white border border-gray-300 rounded flex flex-col gap-[1px]' };

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

  const handleDropAt = (index: number, e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.dataTransfer.getData('text/html');
    if (!html) return;
    const sectionType = html as SectionType;
    const newSection = { type: sectionType, content: '', id: uuidv7() } as MailContent;
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
      <div className={classes.container}>
        <SortableContext items={content.map(s => s.id)}>
          <>
            <DropZone onDrop={(e) => handleDropAt(0, e)} isDragging={isDragging || content.length == 0} />
            {content.map((section, idx) => (
              <Fragment>
                <SortableSection
                  key={section.id}
                  content={section}
                />
                <DropZone onDrop={(e) => handleDropAt(idx + 1, e)} isDragging={isDragging} />
              </Fragment>
            ))}
          </>
        </SortableContext>
      </div>
    </DndContext>
  );
};
