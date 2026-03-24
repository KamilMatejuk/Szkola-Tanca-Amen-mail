import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MailContent } from '../utils/storage';

const classes = { container: 'border border-gray-300 rounded p-2' };


interface SortableSectionProps {
  content: MailContent;
}

export default function SortableSection({ content }: SortableSectionProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: content.id });
  const style = {
    cursor: 'grab',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classes.container}
      dangerouslySetInnerHTML={{ __html: content.content }}
      {...attributes}
      {...listeners}
    />
  );
};
