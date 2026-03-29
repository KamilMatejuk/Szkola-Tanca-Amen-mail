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
import { MdUploadFile } from "react-icons/md";
import { CSSProperties, Dispatch, SetStateAction, useContext } from 'react';
import { ContentContext } from '../context/ContentContext';
import { BANNER_WIDTH } from '../assets/banner';


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
  const switchSeparatorAction = {
    Icon: BiRotateRight,
    action: () => {
      const next = { 'top': 'bottom', 'bottom': 'both', 'both': 'top' }[item.content] || 'both';
      setContent((prev) => prev.map(i => i.id == item.id ? { ...i, content: next } : i))
    },
  }
  const uploadBannerAction = {
    Icon: MdUploadFile,
    action: () => {
      // upload image, resize it to BANNER_WIDTH, and convert to Base64
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/png, image/jpeg, image/jpg, image/gif';
      input.style.display = 'none';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const img = new Image();
        const reader = new FileReader();
        reader.onload = () => { img.src = reader.result as string; };
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const targetHeight = BANNER_WIDTH * img.height / img.width;;
          canvas.width = BANNER_WIDTH;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.drawImage(img, 0, 0, BANNER_WIDTH, targetHeight);
          canvas.toBlob((blob) => {
            if (!blob) return;
            const readerBlob = new FileReader();
            readerBlob.onloadend = () => {
              const base64 = readerBlob.result as string;
              setContent((prev) => prev.map(i => i.id == item.id ? { ...i, content: base64 } : i))
            };
            readerBlob.readAsDataURL(blob);
          }, file.type);
        };
        reader.readAsDataURL(file);
      };
      document.body.appendChild(input);
      input.click();
      input.onblur = () => document.body.removeChild(input);
    },
  }
  switch (item.type) {
    case SectionType.Banner:
      return [deleteAction, uploadBannerAction];
    case SectionType.Separator:
      return [deleteAction, switchSeparatorAction];
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
