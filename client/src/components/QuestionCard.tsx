/*
 * QuestionCard — Focus Lab Nordic Functionalism
 * Card-based question display with smooth answer feedback
 * Each question is a distinct learning unit
 */
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import type { SingleChoiceQuestion } from '@/lib/types';

interface QuestionCardProps {
  question: SingleChoiceQuestion;
  index: number;
  total: number;
  onAnswer?: (questionId: string, answer: string, isCorrect: boolean) => void;
  onNext?: () => void;
  showPassage?: boolean;
  initialAnswer?: string;
}

export default function QuestionCard({
  question,
  index,
  total,
  onAnswer,
  onNext,
  showPassage = true,
  initialAnswer,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(initialAnswer || null);
  const [submitted, setSubmitted] = useState(!!initialAnswer);
  const isCorrect = selected === question.answer;

  function handleSelect(label: string) {
    if (submitted) return;
    setSelected(label);
  }

  function handleSubmit() {
    if (!selected || submitted) return;
    setSubmitted(true);
    onAnswer?.(question.id, selected, selected === question.answer);
  }

  return (
    <div className="question-card p-5 sm:p-7 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          第 {index + 1} / {total} 题
        </span>
        <span
          className={cn(
            'text-xs px-2 py-0.5 rounded-full font-medium',
            question.difficulty === 'easy' && 'bg-correct-light text-correct',
            question.difficulty === 'medium' && 'bg-gold-light text-gold',
            question.difficulty === 'hard' && 'bg-wrong-light text-wrong'
          )}
        >
          {question.difficulty === 'easy' ? '基础' : question.difficulty === 'medium' ? '中等' : '较难'}
        </span>
      </div>

      {/* Passage (for reading comprehension / cloze) */}
      {showPassage && question.passage && (
        <div className="mb-5 p-4 rounded-lg bg-muted/50 border border-border/40">
          {question.passageTitle && (
            <h4 className="text-sm font-semibold text-foreground mb-2">{question.passageTitle}</h4>
          )}
          <div className="passage-text text-sm text-foreground/85 whitespace-pre-line leading-relaxed">
            {question.passage}
          </div>
        </div>
      )}

      {/* Stem */}
      <p className="text-base font-medium text-foreground leading-relaxed mb-5 whitespace-pre-line">
        {question.stem}
      </p>

      {/* Options */}
      <div className="space-y-2.5 mb-5">
        {question.options.map((opt) => {
          const isThisCorrect = opt.label === question.answer;
          const isThisSelected = selected === opt.label;
          let stateClass = '';

          if (submitted) {
            if (isThisCorrect) stateClass = 'correct';
            else if (isThisSelected && !isThisCorrect) stateClass = 'wrong';
          } else if (isThisSelected) {
            stateClass = 'selected';
          }

          return (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              disabled={submitted}
              className={cn('option-btn flex items-start gap-3', stateClass)}
            >
              <span
                className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors',
                  submitted && isThisCorrect
                    ? 'bg-correct text-white border-correct'
                    : submitted && isThisSelected && !isThisCorrect
                    ? 'bg-wrong text-white border-wrong'
                    : isThisSelected
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground'
                )}
              >
                {submitted && isThisCorrect ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : submitted && isThisSelected && !isThisCorrect ? (
                  <XCircle className="w-4 h-4" />
                ) : (
                  opt.label
                )}
              </span>
              <span className="text-sm leading-relaxed pt-0.5">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {submitted && (
        <div
          className={cn(
            'p-4 rounded-lg border mb-5 animate-fade-in-up',
            isCorrect
              ? 'bg-correct-light/50 border-correct/20'
              : 'bg-wrong-light/50 border-wrong/20'
          )}
        >
          <div className="flex items-center gap-2 mb-1.5">
            {isCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-correct" />
            ) : (
              <XCircle className="w-4 h-4 text-wrong" />
            )}
            <span
              className={cn(
                'text-sm font-semibold',
                isCorrect ? 'text-correct' : 'text-wrong'
              )}
            >
              {isCorrect ? '回答正确！' : `回答错误，正确答案是 ${question.answer}`}
            </span>
          </div>
          <p className="text-sm text-foreground/75 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!selected}
            className="px-6"
          >
            提交答案
          </Button>
        ) : (
          onNext && (
            <Button onClick={onNext} className="px-6 gap-1.5">
              下一题
              <ChevronRight className="w-4 h-4" />
            </Button>
          )
        )}
      </div>
    </div>
  );
}
