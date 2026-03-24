import { IconType } from "react-icons";

export interface ActionProps {
  label: string;
  Icon: IconType;
  onClick?: () => void;
  className?: string;
}

export default function Action({ label, Icon, onClick, className }: ActionProps) {
  return (
    <button
      className={className ?? 'flex items-center gap-2 px-2 py-1 rounded group'}
      onClick={onClick}
    >
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
      <Icon className="ml-1" size={24} />
    </button>
  );
}
