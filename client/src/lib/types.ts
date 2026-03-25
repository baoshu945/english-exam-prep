// ============================================================
// Data Model Types for English Exam Prep Quiz Tool
// Design: Focus Lab Nordic Functionalism
// ============================================================

export type QuestionType =
  | 'oral_communication'
  | 'vocabulary'
  | 'reading_comprehension'
  | 'cloze'
  | 'text_completion'
  | 'translation'
  | 'writing';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Option {
  label: string; // A, B, C, D
  text: string;
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  tags: string[];
}

/** Single-choice question (oral_communication, vocabulary, reading, cloze, text_completion) */
export interface SingleChoiceQuestion extends BaseQuestion {
  stem: string;
  passage?: string; // For reading comprehension / cloze
  passageTitle?: string;
  options: Option[];
  answer: string; // e.g. "A"
  explanation: string;
}

/** Translation question (English → Chinese) */
export interface TranslationQuestion extends BaseQuestion {
  type: 'translation';
  sourceText: string;
  referenceAnswer: string;
  scoringCriteria: string[];
  selfCheckList: string[];
}

/** Writing question */
export interface WritingQuestion extends BaseQuestion {
  type: 'writing';
  prompt: string;
  requirements: string[];
  referenceOutline: string;
  referenceAnswer: string;
  scoringCriteria: string[];
  selfCheckList: string[];
}

export type Question = SingleChoiceQuestion | TranslationQuestion | WritingQuestion;

export interface ExamPart {
  id: string;
  title: string;
  titleEn: string;
  type: QuestionType;
  description: string;
  timeMinutes: number;
  questions: Question[];
}

export interface ExamPaper {
  id: string;
  title: string;
  subtitle: string;
  totalTimeMinutes: number;
  parts: ExamPart[];
}

// ============================================================
// User Progress & State Types
// ============================================================

export type AnswerStatus = 'unanswered' | 'correct' | 'wrong';

export interface UserAnswer {
  questionId: string;
  paperId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  answeredAt: number; // timestamp
}

export interface WrongQuestion {
  questionId: string;
  paperId: string;
  partId: string;
  wrongCount: number;
  lastWrongAt: number;
  userAnswer: string;
}

export interface ExamRecord {
  id: string;
  paperId: string;
  startedAt: number;
  finishedAt: number;
  totalQuestions: number;
  correctCount: number;
  answers: Record<string, string>;
  timeSpentSeconds: number;
}

export interface UserProgress {
  totalAnswered: number;
  totalCorrect: number;
  byType: Record<QuestionType, { answered: number; correct: number }>;
  wrongQuestions: WrongQuestion[];
  examRecords: ExamRecord[];
  answers: Record<string, UserAnswer>;
}

// ============================================================
// UI Helper Types
// ============================================================

export const partLabels: Record<QuestionType, string> = {
  oral_communication: '口语交际',
  vocabulary: '词汇',
  reading_comprehension: '阅读理解',
  cloze: '完形填空',
  text_completion: '短文完成',
  translation: '英译汉',
  writing: '写作',
};

export const partLabelsEn: Record<QuestionType, string> = {
  oral_communication: 'Oral Communication',
  vocabulary: 'Vocabulary',
  reading_comprehension: 'Reading Comprehension',
  cloze: 'Cloze',
  text_completion: 'Text Completion',
  translation: 'Translation',
  writing: 'Writing',
};

export const difficultyLabels: Record<Difficulty, string> = {
  easy: '基础',
  medium: '中等',
  hard: '较难',
};

export function isObjectiveQuestion(q: Question): q is SingleChoiceQuestion {
  return q.type !== 'translation' && q.type !== 'writing';
}
