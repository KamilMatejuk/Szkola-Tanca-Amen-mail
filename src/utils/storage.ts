const STORAGE_KEY = 'amen_mail_content';

export type MailContent = { type: string; content: string };

export const loadContent = (): MailContent[] | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

export const saveContent = (contents: MailContent[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contents));
};
