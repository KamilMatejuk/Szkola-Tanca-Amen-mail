export enum SectionType {
  Banner = 'Baner',
  Title = 'Tytuł',
  Subtitle = 'Podtytuł',
  Text = 'Paragraf',
  Separator = 'Separator',
  Signature = 'Podpis',
}

export type MailContent = { id: string, type: SectionType; content: string };
