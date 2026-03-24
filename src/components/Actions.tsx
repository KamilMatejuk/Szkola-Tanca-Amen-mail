import { clearContent } from '../utils/storage';
import Action from './Action';
import { AiOutlineInfoCircle, AiOutlineDelete, AiOutlineSend } from 'react-icons/ai';

export default function Actions() {
  return (
    <div className="flex flex-col items-end space-y-2 absolute top-4 right-4">
      <Action label="info" Icon={AiOutlineInfoCircle} onClick={() => alert('test')} />
      <Action label="clear" Icon={AiOutlineDelete} onClick={() => { clearContent(); window.location.reload(); }} />
      <Action label="export" Icon={AiOutlineSend} onClick={() => alert('export')} />
    </div>
  );
}
