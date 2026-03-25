/*
 * PracticeQuiz — Focus Lab Nordic Functionalism
 * Single-question focus mode with smooth transitions
 */
import { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'wouter';
import { getDefaultPaper } from '@/data';
import { recordAnswer } from '@/lib/store';
import { partLabels, isObjectiveQuestion, type QuestionType, type SingleChoiceQuestion } from '@/lib/types';
import QuestionCard from '@/components/QuestionCard';
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PracticeQuiz() {
  const params = useParams<{ type: string }>();
  const [, navigate] = useLocation();
  const questionType = params.type as QuestionType;
  const paper = getDefaultPaper();

  const part = paper.parts.find((p) => p.type === questionType);
  const questions = useMemo(() => {
    if (!part) return [];
    return part.questions.filter(isObjectiveQuestion) as SingleChoiceQuestion[];
  }, [part]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!part || questions.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground mb-4">未找到该题型的练习题</p>
        <Link href="/practice">
          <span className="text-primary hover:underline text-sm">返回练习选择</span>
        </Link>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  // For reading comprehension, only show passage on first question of each passage
  const showPassage =
    currentIndex === 0 ||
    questions[currentIndex]?.passageTitle !== questions[currentIndex - 1]?.passageTitle;

  function handleAnswer(questionId: string, answer: string, isCorrect: boolean) {
    recordAnswer(questionId, paper.id, part!.id, questionType, answer, isCorrect);
    setAnsweredCount((c) => c + 1);
    if (isCorrect) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setCorrectCount(0);
    setAnsweredCount(0);
    setFinished(false);
  }

  if (finished) {
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    return (
      <div className="container py-12 sm:py-16 animate-fade-in-up">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-correct-light flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-correct" />
          </div>
          <h1
            className="text-2xl sm:text-3xl mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            练习完成！
          </h1>
          <p className="text-muted-foreground mb-6">
            {partLabels[questionType]} — 共 {answeredCount} 题
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="question-card p-4 text-center">
              <p className="text-3xl font-bold text-correct" style={{ fontFamily: 'var(--font-display)' }}>
                {correctCount}
              </p>
              <p className="text-xs text-muted-foreground mt-1">正确</p>
            </div>
            <div className="question-card p-4 text-center">
              <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                {accuracy}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">正确率</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" onClick={handleRestart} className="gap-1.5">
              <RotateCcw className="w-4 h-4" />
              重新练习
            </Button>
            <Button onClick={() => navigate('/practice')}>
              返回选择
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-in-right">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/40">
        <div className="container flex items-center justify-between h-12">
          <Link href="/practice">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {partLabels[questionType]}
            </span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              正确 <span className="text-correct font-medium">{correctCount}</span>
            </span>
            <span>
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-border/30">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="container py-6 sm:py-8 max-w-2xl mx-auto" key={currentQuestion.id}>
        <QuestionCard
          question={currentQuestion}
          index={currentIndex}
          total={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
          showPassage={showPassage}
        />
      </div>
    </div>
  );
}
