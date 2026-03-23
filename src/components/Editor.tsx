import React, { useRef, useEffect } from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  };

  return (
    <div className="w-[600px] p-4 bg-white border border-gray-300 rounded">
      <div
        className="w-full py-3 flex items-center justify-center text-sm text-gray-600 border-dashed border-2 border-gray-400 rounded cursor-pointer"
        title="Drop a section here"
        onDrop={(e) => {
          e.preventDefault();
          const html = e.dataTransfer.getData('text/html');
          onChange(value + html);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        Wybierz sekcję
      </div>
      <div
        ref={ref}
        contentEditable
        className="min-h-[300px] border border-gray-300 p-2 m-2"
        onInput={handleInput}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default Editor;
