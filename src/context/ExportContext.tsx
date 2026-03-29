import { createContext, Dispatch, SetStateAction } from 'react';

export interface ExportContextType {
  isExporting: boolean;
  setIsExporting: Dispatch<SetStateAction<boolean>>;
}

export const ExportContext = createContext<ExportContextType | null>(null);
