import type { ExamRecord, UserAnswer, UserProgress, WrongQuestion, QuestionType } from './types';

const STORAGE_KEY = 'exam-prep-progress';

const defaultProgress: UserProgress = {
  totalAnswered: 0,
  totalCorrect: 0,
  byType: {
    oral_communication: { answered: 0, correct: 0 },
    vocabulary: { answered: 0, correct: 0 },
    reading_comprehension: { answered: 0, correct: 0 },
    cloze: { answered: 0, correct: 0 },
    text_completion: { answered: 0, correct: 0 },
    translation: { answered: 0, correct: 0 },
    writing: { answered: 0, correct: 0 },
  },
  wrongQuestions: [],
  examRecords: [],
  answers: {},
};

export function getProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };
    return JSON.parse(raw) as UserProgress;
  } catch {
    return { ...defaultProgress };
  }
}

function saveProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordAnswer(
  questionId: string,
  paperId: string,
  partId: string,
  questionType: QuestionType,
  selectedAnswer: string,
  isCorrect: boolean
) {
  const progress = getProgress();

  // Check if already answered
  const existing = progress.answers[questionId];
  const isFirstAttempt = !existing;

  // Save answer
  progress.answers[questionId] = {
    questionId,
    paperId,
    selectedAnswer,
    isCorrect,
    answeredAt: Date.now(),
  };

  if (isFirstAttempt) {
    progress.totalAnswered += 1;
    if (isCorrect) progress.totalCorrect += 1;

    const typeStats = progress.byType[questionType];
    if (typeStats) {
      typeStats.answered += 1;
      if (isCorrect) typeStats.correct += 1;
    }
  } else {
    // Update correct count if changed
    if (existing.isCorrect !== isCorrect) {
      if (isCorrect) {
        progress.totalCorrect += 1;
        const ts = progress.byType[questionType];
        if (ts) ts.correct += 1;
      } else {
        progress.totalCorrect -= 1;
        const ts = progress.byType[questionType];
        if (ts) ts.correct -= 1;
      }
    }
  }

  // Handle wrong questions
  if (!isCorrect) {
    const existingWrong = progress.wrongQuestions.find((w) => w.questionId === questionId);
    if (existingWrong) {
      existingWrong.wrongCount += 1;
      existingWrong.lastWrongAt = Date.now();
      existingWrong.userAnswer = selectedAnswer;
    } else {
      progress.wrongQuestions.push({
        questionId,
        paperId,
        partId,
        wrongCount: 1,
        lastWrongAt: Date.now(),
        userAnswer: selectedAnswer,
      });
    }
  } else {
    // Remove from wrong questions if now correct
    progress.wrongQuestions = progress.wrongQuestions.filter((w) => w.questionId !== questionId);
  }

  saveProgress(progress);
  return progress;
}

export function saveExamRecord(record: ExamRecord) {
  const progress = getProgress();
  progress.examRecords.push(record);
  saveProgress(progress);
}

export function getWrongQuestions(): WrongQuestion[] {
  return getProgress().wrongQuestions;
}

export function getExamRecords(): ExamRecord[] {
  return getProgress().examRecords;
}

export function getAnswerForQuestion(questionId: string): UserAnswer | undefined {
  return getProgress().answers[questionId];
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAccuracyRate(): number {
  const p = getProgress();
  if (p.totalAnswered === 0) return 0;
  return Math.round((p.totalCorrect / p.totalAnswered) * 100);
}

export function getTypeAccuracy(type: QuestionType): number {
  const p = getProgress();
  const stats = p.byType[type];
  if (!stats || stats.answered === 0) return 0;
  return Math.round((stats.correct / stats.answered) * 100);
}
