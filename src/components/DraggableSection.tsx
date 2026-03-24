const classes = { container: 'bg-gray-200 rounded p-2 mb-2 cursor-grab' };

export interface DraggableSectionProps {
  label: string;
  dragContent: string;
}

export default function DraggableSection({ label, dragContent }: DraggableSectionProps) {
  return (
    <div
      className={classes.container}
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/html', dragContent);
      }}
    >
      {label}
    </div>
  );
}
