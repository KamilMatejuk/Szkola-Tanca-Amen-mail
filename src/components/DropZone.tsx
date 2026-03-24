import { DragEvent } from "react";
import { twMerge } from "tailwind-merge"

interface DropZoneProps {
  isDragging: boolean;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
}

export default function DropZone({ isDragging, onDrop }: DropZoneProps) {
  return (
    <div
      className={twMerge("w-full flex items-center justify-center text-sm",
        "text-gray-300 cursor-pointer overflow-hidden",
        "border-dashed border-2 border-gray-200 rounded",
        isDragging ? "h-8 my-[1px]" : "h-0 border-white",
        "transition-all duration-500")}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      Upuść sekcję
    </div>
  );
}
