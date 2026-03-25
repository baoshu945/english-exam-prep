/*
 * WrongBook — Focus Lab Nordic Functionalism
 * Auto-collected wrong answers, re-practice support
 */
import { useState, useMemo } from 'react';
import { getWrongQuestions } from '@/lib/store';
import { getDefaultPaper } from '@/data';
import { partLabels, isObjectiveQuestion, type SingleChoiceQuestion, type QuestionType } from '@/lib/types';
import QuestionCard from '@/components/QuestionCard';
import { recordAnswer } from '@/lib/store';
import { BookMarked, RotateCcw, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function WrongBook() {
  const paper = getDefaultPaper();
  const wrongList = getWrongQuestions();

  // Build a map of questionId -> question
  const questionMap = useMemo(() => {
    const map = new Map<string, { question: SingleChoiceQuestion; partId: string; partType: QuestionType }>();
    for (const part of paper.parts) {
      for (const q of part.questions) {
        if (isObjectiveQuestion(q)) {
          map.set(q.id, { question: q as SingleChoiceQuestion, partId: part.id, partType: part.type });
        }
      }
    }
    return map;
  }, [paper]);

  const wrongQuestions = useMemo(() => {
    return wrongList
      .map((w) => {
        const found = questionMap.get(w.questionId);
        if (!found) return null;
        return { ...w, ...found };
      })
      .filter(Boolean) as Array<{
        questionId: string;
        paperId: string;
        partId: string;
        wrongCount: number;
        lastWrongAt: number;
        userAnswer: string;
        question: SingleChoiceQuestion;
        partType: QuestionType;
      }>;
  }, [wrongList, questionMap]);

  const [practicing, setPracticing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  function handleStartPractice() {
    setPracticing(true);
    setCurrentIndex(0);
    setCorrectCount(0);
  }

  function handleAnswer(questionId: string, answer: string, isCorrect: boolean) {
    const item = wrongQuestions[currentIndex];
    recordAnswer(questionId, paper.id, item.partId, item.partType, answer, isCorrect);
    if (isCorrect) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (currentIndex < wrongQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPracticing(false);
    }
  }

  if (wrongQuestions.length === 0) {
    return (
      <div className="animate-fade-in-up">
        <div className="container py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[oklch(0.58_0.18_25/0.08)] flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-wrong" />
            </div>
            <div>
              <h1
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                错题本
              </h1>
              <p className="text-sm text-muted-foreground">自动收集错题，支持重新练习</p>
            </div>
          </div>
        </div>
        <div className="container text-center py-12">
          <div className="w-16 h-16 rounded-full bg-correct-light flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-correct" />
          </div>
          <h2
            className="text-xl mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            暂无错题
          </h2>
          <p className="text-sm text-muted-foreground">
            做题过程中答错的题目会自动收集到这里
          </p>
        </div>
      </div>
    );
  }

  if (practicing) {
    const current = wrongQuestions[currentIndex];
    return (
      <div className="animate-slide-in-right">
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/40">
          <div className="container flex items-center justify-between h-12">
            <button
              onClick={() => setPracticing(false)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              错题本
            </button>
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} / {wrongQuestions.length}
            </span>
          </div>
          <div className="h-0.5 bg-border/30">
            <div
              className="h-full bg-wrong transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / wrongQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="container py-6 sm:py-8 max-w-2xl mx-auto" key={current.question.id}>
          <QuestionCard
            question={current.question}
            index={currentIndex}
            total={wrongQuestions.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="container py-10 sm:py-14">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[oklch(0.58_0.18_25/0.08)] flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-wrong" />
            </div>
            <div>
              <h1
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                错题本
              </h1>
              <p className="text-sm text-muted-foreground">
                共 {wrongQuestions.length} 道错题
              </p>
            </div>
          </div>
          <Button onClick={handleStartPractice} className="gap-1.5">
            <RotateCcw className="w-4 h-4" />
            重新练习
          </Button>
        </div>
      </div>

      <div className="container pb-8 space-y-3">
        {wrongQuestions.map((item, i) => (
          <div
            key={item.questionId}
            className="question-card p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-wrong-light text-wrong font-medium">
                    错 {item.wrongCount} 次
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {partLabels[item.partType]}
                  </span>
                </div>
                <p className="text-sm text-foreground line-clamp-2 whitespace-pre-line">
                  {item.question.stem}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  你的答案: <span className="text-wrong font-medium">{item.userAnswer}</span>
                  {' · '}
                  正确答案: <span className="text-correct font-medium">{item.question.answer}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
