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
    <div
      ref={ref}
      contentEditable
      className="min-h-[300px] border border-gray-300 p-2 m-2"
      onInput={handleInput}
      suppressContentEditableWarning={true}
    />
  );
};

export default Editor;
