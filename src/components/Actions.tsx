import Action from './Action';
import { useContext, useEffect } from 'react';
import { ContentContext } from '../context/ContentContext';
import { AiOutlineInfoCircle, AiOutlineDelete, AiOutlineSend } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { ExportContext } from '../context/ExportContext';

export default function Actions() {
  const { setContent } = useContext(ContentContext)!;
  const { isExporting, setIsExporting } = useContext(ExportContext)!;

  useEffect(() => {
    if (!isExporting) return;
    const editor = document.getElementById('editor-root');
    // remove the Quill tooltip (src/components/sections/Text.tsx)
    const editorClone = editor!.cloneNode(true) as HTMLElement;
    editorClone.querySelectorAll('.ql-tooltip').forEach((el) => el.remove());
    // Remove empty <p> tags
    editorClone.querySelectorAll('p').forEach((p) => {
      if (!p.textContent?.trim()) p.remove();
    });
    const html = editorClone.outerHTML;
    setIsExporting(false);
    navigator.clipboard
      .writeText(html)
      .then(() => toast.success('Copied HTML to clipboard'))
      .catch(() => toast.error('Failed to copy HTML'));
  }, [isExporting]);

  return (
    <div className="h-fit flex flex-col items-end space-y-2 sticky top-4 right-4">
      <Action label="info" Icon={AiOutlineInfoCircle} onClick={() => toast('test')} />
      <Action label="clear" Icon={AiOutlineDelete} onClick={() => setContent([])} />
      <Action label="export" Icon={AiOutlineSend} onClick={() => setIsExporting(true)} />
    </div>
  );
}
