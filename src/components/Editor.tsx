import { useState, useEffect, Fragment, DragEvent, useContext } from 'react';
import { DndContext, closestCenter, useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import SortableSection from './SortableSection';
import DropZone from './DropZone';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { v7 as uuidv7 } from 'uuid';
import { MailContent, SectionType } from '../utils/types';
import { ContentContext } from '../context/ContentContext';
import { BANNER_WIDTH, DEFAULT_BANNER_BASE64 } from '../assets/banner';
import { ExportContext } from '../context/ExportContext';

export default function Editor() {
  const { content, setContent } = useContext(ContentContext)!;
  const { isExporting } = useContext(ExportContext)!;
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

  const createMailContent = (sectionType: SectionType) => {
    const item = { type: sectionType, content: '', id: uuidv7() } as MailContent;
    switch (sectionType) {
      case SectionType.Banner:
        return { ...item, content: DEFAULT_BANNER_BASE64 };
      case SectionType.Title:
        return { ...item, content: 'Tytuł' };
      case SectionType.Subtitle:
        return { ...item, content: 'Podtytuł' };
      case SectionType.Text:
        return { ...item, content: 'Paragraf' };
      case SectionType.Separator:
        return { ...item, content: 'both' };
      case SectionType.Signature:
        return item;
      default:
        return item;
    }
  }

  const handleDropAt = (index: number, e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.dataTransfer.getData('text/html');
    if (!html) return;
    const sectionType = html as SectionType;
    const newSection = createMailContent(sectionType);
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
      <table id="editor-root" style={{
        boxSizing: 'border-box',
        margin: isExporting ? 'auto' : '',
        width: isExporting ? `${BANNER_WIDTH}px` : '600px',
        padding: isExporting ? '0px' : '16px',
        backgroundColor: '#ffffff',
        border: isExporting ? '' : '1px solid #D1D5DB',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
      }}>
        <SortableContext items={content.map(s => s.id)}>
          <>
            <DropZone onDrop={(e) => handleDropAt(0, e)} isDragging={isDragging || content.length == 0} />
            {content.flatMap((section, idx) => (
              <Fragment key={section.id}>
                <SortableSection
                  key={section.id}
                  item={section}
                />
                <DropZone
                  key={`drop-${idx}`}
                  onDrop={(e) => handleDropAt(idx + 1, e)}
                  isDragging={isDragging} />
              </Fragment>
            ))}
          </>
        </SortableContext>
      </table>
    </DndContext>
  );
};
