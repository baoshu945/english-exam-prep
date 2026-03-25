/*
 * ExamMode — Focus Lab Nordic Functionalism
 * Full exam simulation with timer, sequential questions, and results
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, Link } from 'wouter';
import { getDefaultPaper } from '@/data';
import { recordAnswer, saveExamRecord } from '@/lib/store';
import { partLabels, isObjectiveQuestion, type SingleChoiceQuestion } from '@/lib/types';
import QuestionCard from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const EXAM_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663470538270/NQ8dwZyxuDfY6G48WPipnm/hero-exam-focus-WQNjqNUSEXmc8kNUdrS76w.webp';

type ExamState = 'intro' | 'in_progress' | 'finished';

export default function ExamMode() {
  const [, navigate] = useLocation();
  const paper = getDefaultPaper();

  // Flatten all objective questions with part info
  const allQuestions = useMemo(() => {
    const qs: { question: SingleChoiceQuestion; partId: string; partType: string }[] = [];
    for (const part of paper.parts) {
      for (const q of part.questions) {
        if (isObjectiveQuestion(q)) {
          qs.push({ question: q as SingleChoiceQuestion, partId: part.id, partType: part.type });
        }
      }
    }
    return qs;
  }, [paper]);

  const [state, setState] = useState<ExamState>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(paper.totalTimeMinutes * 60);

  // Timer
  useEffect(() => {
    if (state !== 'in_progress') return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleFinish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? `${h}:` : ''}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, []);

  function handleStart() {
    setState('in_progress');
    setStartTime(Date.now());
    setTimeLeft(paper.totalTimeMinutes * 60);
  }

  function handleAnswer(questionId: string, answer: string, isCorrect: boolean) {
    const item = allQuestions[currentIndex];
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    if (isCorrect) setCorrectCount((c) => c + 1);
    recordAnswer(questionId, paper.id, item.partId, item.partType as any, answer, isCorrect);
  }

  function handleNext() {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleFinish() {
    const record = {
      id: `exam-${Date.now()}`,
      paperId: paper.id,
      startedAt: startTime,
      finishedAt: Date.now(),
      totalQuestions: allQuestions.length,
      correctCount,
      answers,
      timeSpentSeconds: paper.totalTimeMinutes * 60 - timeLeft,
    };
    saveExamRecord(record);
    setState('finished');
  }

  // Intro screen
  if (state === 'intro') {
    return (
      <div className="animate-fade-in-up">
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${EXAM_IMG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background" />
          <div className="relative container py-12 sm:py-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1
                  className="text-2xl sm:text-3xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  模拟考试
                </h1>
                <p className="text-sm text-muted-foreground">限时作答，模拟真实考场</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-6 sm:py-8 max-w-lg mx-auto">
          <div className="question-card p-6 sm:p-8 text-center">
            <h2
              className="text-xl sm:text-2xl mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {paper.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">{paper.subtitle}</p>

            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-semibold">{allQuestions.length} 题</p>
                <p className="text-xs text-muted-foreground">客观题总量</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-semibold">{paper.totalTimeMinutes} 分钟</p>
                <p className="text-xs text-muted-foreground">考试时长</p>
              </div>
            </div>

            <div className="text-left mb-6 p-4 rounded-lg bg-[oklch(0.72_0.14_80/0.08)] border border-gold/15">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div className="text-xs text-foreground/75 space-y-1">
                  <p>考试开始后将自动计时，时间到自动交卷。</p>
                  <p>本模拟仅包含客观题部分，翻译和写作请前往专门模块。</p>
                </div>
              </div>
            </div>

            <Button onClick={handleStart} size="lg" className="w-full gap-2">
              <Clock className="w-4 h-4" />
              开始考试
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Finished screen
  if (state === 'finished') {
    const accuracy = allQuestions.length > 0 ? Math.round((correctCount / allQuestions.length) * 100) : 0;
    const timeSpent = paper.totalTimeMinutes * 60 - timeLeft;

    return (
      <div className="container py-12 sm:py-16 animate-fade-in-up">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-5">
            <Trophy className="w-8 h-8 text-gold" />
          </div>
          <h1
            className="text-2xl sm:text-3xl mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            考试完成！
          </h1>
          <p className="text-muted-foreground mb-6">
            {paper.title} — {paper.subtitle}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="question-card p-4 text-center">
              <p className="text-2xl font-bold text-correct" style={{ fontFamily: 'var(--font-display)' }}>
                {correctCount}
              </p>
              <p className="text-xs text-muted-foreground mt-1">正确</p>
            </div>
            <div className="question-card p-4 text-center">
              <p className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                {accuracy}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">正确率</p>
            </div>
            <div className="question-card p-4 text-center">
              <p className="text-2xl font-bold text-gold" style={{ fontFamily: 'var(--font-display)' }}>
                {formatTime(timeSpent)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">用时</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" onClick={() => navigate('/progress')}>
              查看进度
            </Button>
            <Button onClick={() => navigate('/')}>
              返回首页
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // In-progress exam
  const current = allQuestions[currentIndex];
  const currentPartLabel = partLabels[current.partType as keyof typeof partLabels] || '';
  const isLast = currentIndex === allQuestions.length - 1;
  const timeWarning = timeLeft < 300; // 5 minutes warning

  return (
    <div>
      {/* Timer bar */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/40">
        <div className="container flex items-center justify-between h-12">
          <span className="text-xs text-muted-foreground">
            {currentPartLabel} · 第 {currentIndex + 1} / {allQuestions.length} 题
          </span>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'flex items-center gap-1.5 text-sm font-mono font-medium',
                timeWarning ? 'text-wrong animate-pulse' : 'text-foreground'
              )}
            >
              <Clock className="w-3.5 h-3.5" />
              {formatTime(timeLeft)}
            </span>
            {isLast && (
              <Button size="sm" variant="destructive" onClick={handleFinish}>
                交卷
              </Button>
            )}
          </div>
        </div>
        <div className="h-0.5 bg-border/30">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / allQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="container py-6 sm:py-8 max-w-2xl mx-auto" key={current.question.id}>
        <QuestionCard
          question={current.question}
          index={currentIndex}
          total={allQuestions.length}
          onAnswer={handleAnswer}
          onNext={isLast ? handleFinish : handleNext}
        />
      </div>
    </div>
  );
}
