import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import { ContentContext } from './context/ContentContext';
import Actions from './components/Actions';
import DraggableSection from './components/DraggableSection';
import { loadContent, saveContent } from './utils/storage';
import { MailContent, SectionType } from './utils/types';
import { ExportContext } from './context/ExportContext';
import { Toaster } from 'react-hot-toast';

const classes = {
  root: "flex min-h-screen gap-4 p-4",
  sidebar: "w-72 h-fit p-4 bg-white border border-gray-300 rounded sticky top-4 left-4",
  sectionHeader: "text-lg font-semibold",
  sectionDescription: "text-black text-sm mb-2",
  editorContainer: "flex-1 flex flex-col items-center",
  editorTitle: "text-2xl font-bold",
  editorSubtitle: "text-sm text-black mt-1 mb-4",
};
function App() {
  const [content, setContent] = useState<MailContent[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const saved = loadContent();
    if (saved) setContent(saved);
  }, []);

  useEffect(() => {
    saveContent(content);
  }, [content]);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      <ExportContext.Provider value={{ isExporting, setIsExporting }}>
        <div className={classes.root}>
          <Toaster position="top-right" />
          <div className={classes.sidebar}>
            <h2 className={classes.sectionHeader}>Sekcje</h2>
            <p className={classes.sectionDescription}>Złap i przeciągnij sekcje</p>
            <DraggableSection label={SectionType.Banner} />
            <DraggableSection label={SectionType.Title} />
            <DraggableSection label={SectionType.Subtitle} />
            <DraggableSection label={SectionType.Text} />
            <DraggableSection label={SectionType.Separator} />
            <DraggableSection label={SectionType.Signature} />
          </div>
          <div className={classes.editorContainer}>
            <h1 className={classes.editorTitle}>Editor Maili</h1>
            <h2 className={classes.editorSubtitle}>Szkoła Tańca Amen</h2>
            <Editor />
          </div>
          <Actions />
        </div>
      </ExportContext.Provider>
    </ContentContext.Provider>
  );
}

export default App;
