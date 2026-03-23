import React, { useState, useEffect } from 'react';

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
      <div className="w-72 h-screen p-4 bg-gray-50 border border-gray-300 rounded">
        <h2 className="text-lg font-semibold">Sekcje</h2>
        <p className="text-gray-500 text-sm mb-2">Złap i przeciągnij sekcje</p>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab">Baner</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab">Tytuł</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab">Podtytuł</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab">Text</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab">Separator</div>
        <div className="bg-gray-200 rounded p-2 mb-2 cursor-grab">Podpis</div>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Editor Maili</h1>
        <h2 className="text-sm text-gray-600 mt-1 mb-4">Szkoła Tańca Amen</h2>
        <div className="w-[600px] p-4 bg-white border border-gray-300 rounded">
          <button
            className="w-full py-3 text-3xl bg-gray-200 border-none rounded cursor-pointer"
            onClick={handleAddSection}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
