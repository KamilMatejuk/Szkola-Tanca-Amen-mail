import { SectionType } from "../utils/types";

const classes = { container: 'bg-gray-200 rounded p-2 mb-2 cursor-grab' };

export interface DraggableSectionProps {
  label: SectionType;
}

export default function DraggableSection({ label }: DraggableSectionProps) {
  return (
    <div
      className={classes.container}
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/html', label.toString());
      }}
    >
      {label}
    </div>
  );
}
