import { useEffect, useContext, useRef, CSSProperties } from 'react';
import { ContentContext } from '../../context/ContentContext';
import { SectionType } from '../../utils/types';

const style: Record<string, CSSProperties> = {
  all: {
    minWidth: '10px',
    outline: 'none',
    margin: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '18px',
  },
}

export default function Title({ id, level }: { id: string, level: 'title' | 'subtitle' }) {
  const { content, setContent } = useContext(ContentContext)!;
  const titleItem = content.find((item) => item.id === id);
  const elementRef = useRef<HTMLParagraphElement>(null);
  const lastVersion = useRef(titleItem?.content);

  useEffect(() => {
    if (elementRef.current && titleItem?.content !== elementRef.current.textContent) {
      elementRef.current.textContent = titleItem?.content || 'Tytuł';
      lastVersion.current = titleItem?.content;
    }
  }, [titleItem?.content]);

  const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
    const newText = e.currentTarget.textContent || '';
    lastVersion.current = newText;
    if (titleItem) {
      setContent(prev => prev.map(item =>
        item.type === SectionType.Title ? { ...item, content: newText } : item
      ));
    }
  };

  return (
    <p
      ref={elementRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onInput={handleInput}
      style={{...style.all, ...style[level]}}
    />
  );
}
