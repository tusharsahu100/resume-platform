export type CoverLetterType = 'software-engineer' | 'lead-developer' | 'startup';

export interface CoverLetter {
  type: CoverLetterType;
  title: string;
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
}
