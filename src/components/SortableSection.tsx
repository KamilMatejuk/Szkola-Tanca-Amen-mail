import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MailContent, SectionType } from '../utils/types';
import Banner from './sections/Banner';
import Title from './sections/Title';
import Subtitle from './sections/Subtitle';
import Text from './sections/Text';
import Separator from './sections/Separator';
import Signature from './sections/Signature';

const classes = { container: 'border border-gray-100 p-1' };


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

  const renderedContent = (() => {
    switch (content.type) {
      case SectionType.Banner:
        return <Banner id={content.id} />;
      case SectionType.Title:
        return <Title id={content.id} />;
      case SectionType.Subtitle:
        return <Subtitle id={content.id} />;
      case SectionType.Text:
        return <Text id={content.id} />;
      case SectionType.Separator:
        return <Separator id={content.id} />;
      case SectionType.Signature:
        return <Signature />;
      default:
        return null;
    }
  })();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classes.container}
      {...attributes}
      {...listeners}
    >
      {renderedContent}
    </div>
  );
};
