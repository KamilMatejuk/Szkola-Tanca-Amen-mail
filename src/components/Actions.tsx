import Action from './Action';
import { useContext } from 'react';
import { ContentContext } from '../context/ContentContext';
import { AiOutlineInfoCircle, AiOutlineDelete, AiOutlineSend } from 'react-icons/ai';

const exportMail = () => {
  const editor = document.getElementById('editor-root');
  const html = editor!!.innerHTML;
  navigator.clipboard
    .writeText(html)
    .then(() => alert('Copied HTML to clipboard'))
    .catch(() => alert('Failed to copy HTML'));
};

export default function Actions() {
  const { setContent } = useContext(ContentContext)!;
  return (
    <div className="flex flex-col items-end space-y-2 absolute top-4 right-4">
      <Action label="info" Icon={AiOutlineInfoCircle} onClick={() => alert('test')} />
      <Action label="clear" Icon={AiOutlineDelete} onClick={() => setContent([])} />
      <Action label="export" Icon={AiOutlineSend} onClick={() => exportMail()} />
    </div>
  );
}
