import { DragEvent, useContext } from "react";
import { twMerge } from "tailwind-merge"
import { ExportContext } from "../context/ExportContext";

const classes = {
  base: twMerge(
    "w-[calc(100%-32px)] mx-4 flex items-center justify-center text-sm",
    "text-gray-300 cursor-pointer overflow-hidden",
    "border-dashed border-2 rounded",
    "transition-all duration-500"
  ),
  dragging: "h-8 my-1 border-gray-200",
  notDragging: "h-0 my-0 border-white"
};

interface DropZoneProps {
  isDragging: boolean;
  onDrop: (e: DragEvent<HTMLTableCellElement>) => void;
}

export default function DropZone({ isDragging, onDrop }: DropZoneProps) {
  const { isExporting } = useContext(ExportContext)!;
  return isExporting ? null : (
    <tr>
      <td
        className={twMerge(classes.base, isDragging ? classes.dragging : classes.notDragging)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {isDragging ? "Upuść sekcję" : ""}
      </td>
    </tr>
  );
}
