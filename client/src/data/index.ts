import type { ExamPaper } from '@/lib/types';
import { paper1 } from './paper1';

// Registry of all exam papers
// To add a new paper, import it and add to this array
export const papers: ExamPaper[] = [paper1];

export function getPaperById(id: string): ExamPaper | undefined {
  return papers.find((p) => p.id === id);
}

export function getDefaultPaper(): ExamPaper {
  return papers[0];
}
