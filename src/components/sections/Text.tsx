import { useState, useEffect, useContext } from 'react';
import { ContentContext } from '../../context/ContentContext';
import { SectionType } from '../../utils/types';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ExportContext } from '../../context/ExportContext';

// @ts-ignore (unknown type - ts 2507)
class CustomLink extends Quill.import('formats/link') {
  static create(value: string) {
    const node = super.create(value);
    node.setAttribute('style', 'color: #EF6C00');
    return node;
  }
}
// @ts-ignore (unknown type - ts 2507)
Quill.register(CustomLink, true);


export default function Text({ id }: { id: string }) {
  const { isExporting } = useContext(ExportContext)!;
  const { content, setContent } = useContext(ContentContext)!;
  const textItem = content.find((item) => item.id === id);
  const [value, setValue] = useState(textItem?.content || '');

  const modules = {
    toolbar: [
      'bold',
      'italic',
      'underline',
      "link",
      { list: "ordered" },
      { list: "bullet" },
    ],
  };
  const formats = ['header', 'bold', 'italic', 'underline', 'link', 'list'];

  useEffect(() => {
    if (textItem && textItem.content !== value) {
      setValue(textItem.content);
    }
  }, [textItem, value]);

  const handleChange = (html: string) => {
    setValue(html);
    if (textItem) {
      setContent((prev) => prev.map((item) => item.id === id ? { ...item, content: html } : item));
    }
  };

  return (
    <div id={`quill-container-${id}`}>
      <ReactQuill style={{ fontSize: '12px' }}
        value={value}
        onChange={handleChange}
        theme="snow"
        readOnly={isExporting}
        modules={isExporting ? { toolbar: null } : modules}
        formats={formats}
        bounds={`#quill-container-${id}`}
      />
    </div>
  );
}
