import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MailContent, SectionType } from '../utils/types';
import Banner from './sections/Banner';
import Title from './sections/Title';
import Text from './sections/Text';
import Separator from './sections/Separator';
import Signature from './sections/Signature';
import { GoGrabber } from "react-icons/go";
import { AiOutlineDelete } from 'react-icons/ai';
import { BiRotateRight } from "react-icons/bi";
import { CSSProperties, Dispatch, SetStateAction, useContext } from 'react';
import { ContentContext } from '../context/ContentContext';


function getRenderedContent(content: MailContent) {
  switch (content.type) {
    case SectionType.Banner:
      return <Banner id={content.id} />;
    case SectionType.Title:
      return <Title id={content.id} level="title" />
    case SectionType.Subtitle:
      return <Title id={content.id} level="subtitle" />
    case SectionType.Text:
      return <Text id={content.id} />;
    case SectionType.Separator:
      return <Separator id={content.id} />;
    case SectionType.Signature:
      return <Signature />;
    default: return null;
  }
}

function getActions(item: MailContent, setContent: Dispatch<SetStateAction<MailContent[]>>) {
  const deleteAction = {
    Icon: AiOutlineDelete,
    action: () => setContent((prev) => prev.filter(i => i.id != item.id)),
  }
  switch (item.type) {
    case SectionType.Separator:
      return [
        deleteAction,
        {
          Icon: BiRotateRight,
          action: () => {
            const next = { 'top': 'bottom', 'bottom': 'both', 'both': 'top' }[item.content] || 'both';
            setContent((prev) => prev.map(i => i.id == item.id ? { ...i, content: next } : i))
          },
        },
      ];
    default: return [deleteAction];
  }
}



interface SortableSectionProps {
  item: MailContent;
}

export default function SortableSection({ item }: SortableSectionProps) {
  const { setContent } = useContext(ContentContext)!;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style: CSSProperties = {
    position: 'relative',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderedContent = getRenderedContent(item);
  const extraActions = getActions(item, setContent);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-100 p-1"
      {...attributes}
    >
      <GoGrabber {...listeners} size={32} className="absolute top-1/2 -translate-y-1/2 left-[-50px] cursor-grab" />
      {renderedContent}
      <div className="absolute top-1/2 -translate-y-1/2 left-[590px] cursor-pointer text-gray-400 flex  gap-1">
        {extraActions.map(({ Icon, action }, idx) => (
          <Icon key={idx} size={20} onClick={action} />
        ))}
      </div>
    </div>
  );
};
