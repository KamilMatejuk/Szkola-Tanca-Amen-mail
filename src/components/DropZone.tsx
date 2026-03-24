import { DragEvent } from "react";
import { twMerge } from "tailwind-merge"

const classes = {
  base: twMerge(
    "w-full flex items-center justify-center text-sm",
    "text-gray-300 cursor-pointer overflow-hidden",
    "border-dashed border-2 border-gray-200 rounded",
    "transition-all duration-500"
  ),
  dragging: "h-8 my-[1px]",
  notDragging: "h-0 border-white"
};

interface DropZoneProps {
  isDragging: boolean;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
}

export default function DropZone({ isDragging, onDrop }: DropZoneProps) {
  return (
    <div
      className={twMerge(classes.base, isDragging ? classes.dragging : classes.notDragging)}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      Upuść sekcję
    </div>
  );
}
