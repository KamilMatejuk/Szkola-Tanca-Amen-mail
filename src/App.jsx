import { useState, useEffect } from 'react';
import Editor from './components/Editor';

const STORAGE_KEY = 'amen_mail_content';

function App() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setContent(saved);
  }, []);

  const handleAddSection = () => {
    const newSection = '<div>New Section</div>';
    setContent(content + newSection);
  };

  return (
    <div className="flex min-h-screen gap-4 p-4">
      <div className="w-72 h-screen p-4 bg-white border border-gray-300 rounded">
        <h2 className="text-lg font-semibold">Sekcje</h2>
        <p className="text-black text-sm mb-2">Złap i przeciągnij sekcje</p>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab" draggable="true" onDragStart={(e)=>{e.dataTransfer.setData('text/html','<div class="section baner">Baner</div>');}}>Baner</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab" draggable="true" onDragStart={(e)=>{e.dataTransfer.setData('text/html','<div class="section title">Tytuł</div>');}}>Tytuł</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab" draggable="true" onDragStart={(e)=>{e.dataTransfer.setData('text/html','<div class="section subtitle">Podtytuł</div>');}}>Podtytuł</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab" draggable="true" onDragStart={(e)=>{e.dataTransfer.setData('text/html','<div class="section text">Text</div>');}}>Text</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab" draggable="true" onDragStart={(e)=>{e.dataTransfer.setData('text/html','<hr class="section separator"/>');}}>Separator</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab" draggable="true" onDragStart={(e)=>{e.dataTransfer.setData('text/html','<div class="section signature">Podpis</div>');}}>Podpis</div>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Editor Maili</h1>
        <h2 className="text-sm text-black mt-1 mb-4">Szkoła Tańca Amen</h2>
        <div className="w-[600px] p-4 bg-white border border-gray-300 rounded">
          <div className="w-full py-3 flex items-center justify-center text-sm text-gray-600 border-dashed border-2 border-gray-400 rounded cursor-pointer" title="Drop a section here" onDrop={e=>{e.preventDefault(); const html=e.dataTransfer.getData('text/html'); setContent(prev=>prev+html);}} onDragOver={e=>e.preventDefault()}>Wybierz sekcję</div>
        <Editor value={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}

export default App;
