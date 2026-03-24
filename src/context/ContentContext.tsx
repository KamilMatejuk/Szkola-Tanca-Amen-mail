import { createContext, Dispatch, SetStateAction } from 'react';
import { MailContent } from '../utils/types';

export interface ContentContextType {
  content: MailContent[];
  setContent: Dispatch<SetStateAction<MailContent[]>>;
}

export const ContentContext = createContext<ContentContextType | null>(null);
