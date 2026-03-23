import React, { useRef, useEffect } from 'react';

function Editor({ value, onChange }) {
  const ref = useRef(null);

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
}

export default Editor;
