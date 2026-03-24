import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import DraggableSection from './components/DraggableSection';
import { loadContent, MailContent, saveContent } from './utils/storage';

function App() {
  const [content, setContent] = useState<MailContent[]>([]);

  useEffect(() => {
    const saved = loadContent();
    if (saved) setContent(saved);
  }, []);

  useEffect(() => {
    saveContent(content);
  }, [content]);

  return (
    <div className="flex min-h-screen gap-4 p-4">
      <div className="w-72 h-[calc(100vh-32px)] p-4 bg-white border border-gray-300 rounded">
        <h2 className="text-lg font-semibold">Sekcje</h2>
        <p className="text-black text-sm mb-2">Złap i przeciągnij sekcje</p>
        <DraggableSection label="Baner" dragContent='<div class="section baner">Baner</div>' />
        <DraggableSection label="Tytuł" dragContent='<div class="section title">Tytuł</div>' />
        <DraggableSection label="Podtytuł" dragContent='<div class="section subtitle">Podtytuł</div>' />
        <DraggableSection label="Text" dragContent='<div class="section text">Text</div>' />
        <DraggableSection label="Separator" dragContent='<hr class="section separator"/>' />
        <DraggableSection label="Podpis" dragContent='<div class="section signature">Podpis</div>' />
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Editor Maili</h1>
        <h2 className="text-sm text-black mt-1 mb-4">Szkoła Tańca Amen</h2>
        <Editor content={content} setContent={setContent} />
      </div>
    </div>
  );
}

export default App;
