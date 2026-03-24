import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Actions from './components/Actions';
import DraggableSection from './components/DraggableSection';
import { loadContent, MailContent, saveContent } from './utils/storage';

const classes = {
  root: "flex min-h-screen gap-4 p-4",
  sidebar: "w-72 h-[calc(100vh-32px)] p-4 bg-white border border-gray-300 rounded",
  sectionHeader: "text-lg font-semibold",
  sectionDescription: "text-black text-sm mb-2",
  editorContainer: "flex-1 flex flex-col items-center",
  editorTitle: "text-2xl font-bold",
  editorSubtitle: "text-sm text-black mt-1 mb-4",
};
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
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <h2 className={classes.sectionHeader}>Sekcje</h2>
        <p className={classes.sectionDescription}>Złap i przeciągnij sekcje</p>
        <DraggableSection label="Baner" dragContent='<div class="section baner">Baner</div>' />
        <DraggableSection label="Tytuł" dragContent='<div class="section title">Tytuł</div>' />
        <DraggableSection label="Podtytuł" dragContent='<div class="section subtitle">Podtytuł</div>' />
        <DraggableSection label="Text" dragContent='<div class="section text">Text</div>' />
        <DraggableSection label="Separator" dragContent='<hr class="section separator"/>' />
        <DraggableSection label="Podpis" dragContent='<div class="section signature">Podpis</div>' />
      </div>
      <div className={classes.editorContainer}>
        <h1 className={classes.editorTitle}>Editor Maili</h1>
        <h2 className={classes.editorSubtitle}>Szkoła Tańca Amen</h2>
        <Editor content={content} setContent={setContent} />
      </div>
      <Actions />
    </div>
  );
}

export default App;
