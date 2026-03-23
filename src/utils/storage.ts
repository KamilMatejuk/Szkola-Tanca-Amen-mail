const STORAGE_KEY = 'amen_mail_content';

export const loadContent = (): string | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved;
};

export const saveContent = (content: string): void => {
  localStorage.setItem(STORAGE_KEY, content);
};
