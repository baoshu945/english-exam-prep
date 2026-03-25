/*
 * TranslationWriting — Focus Lab Nordic Functionalism
 * Subjective question module with self-evaluation checklist
 */
import { useState } from 'react';
import { getDefaultPaper } from '@/data';
import type { TranslationQuestion, WritingQuestion } from '@/lib/types';
import { PenLine, Languages, FileText, ChevronDown, ChevronUp, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TranslationWriting() {
  const paper = getDefaultPaper();
  const translationPart = paper.parts.find((p) => p.type === 'translation');
  const writingPart = paper.parts.find((p) => p.type === 'writing');

  const translationQ = translationPart?.questions[0] as TranslationQuestion | undefined;
  const writingQ = writingPart?.questions[0] as WritingQuestion | undefined;

  const [activeTab, setActiveTab] = useState<'translation' | 'writing'>('translation');

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="container py-10 sm:py-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <PenLine className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1
              className="text-2xl sm:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              翻译与写作
            </h1>
            <p className="text-sm text-muted-foreground">主观题练习，含参考答案与自评清单</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('translation')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'translation'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            <Languages className="w-4 h-4" />
            英译汉
          </button>
          <button
            onClick={() => setActiveTab('writing')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'writing'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            <FileText className="w-4 h-4" />
            写作
          </button>
        </div>
      </div>

      <div className="container pb-12">
        {activeTab === 'translation' && translationQ && (
          <TranslationSection question={translationQ} />
        )}
        {activeTab === 'writing' && writingQ && (
          <WritingSection question={writingQ} />
        )}
      </div>
    </div>
  );
}

function TranslationSection({ question }: { question: TranslationQuestion }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userText, setUserText] = useState('');
  const [checklist, setChecklist] = useState<boolean[]>(
    new Array(question.selfCheckList.length).fill(false)
  );

  function toggleCheck(i: number) {
    setChecklist((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Source text */}
      <div className="question-card p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-primary mb-3">原文（英译汉）</h3>
        <div className="passage-text text-foreground/90 leading-relaxed">
          {question.sourceText}
        </div>
      </div>

      {/* User input */}
      <div className="question-card p-5 sm:p-6">
        <h3 className="text-sm font-semibold mb-3">你的翻译</h3>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="在此输入你的翻译..."
          className="w-full h-40 p-3 rounded-lg border border-border/60 bg-muted/30 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors"
        />
      </div>

      {/* Reference answer toggle */}
      <div className="question-card overflow-hidden">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-muted/30 transition-colors"
        >
          <span className="text-sm font-semibold">参考答案与评分标准</span>
          {showAnswer ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {showAnswer && (
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4 animate-fade-in-up">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                参考译文
              </h4>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {question.referenceAnswer}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                评分标准
              </h4>
              <ul className="space-y-1">
                {question.scoringCriteria.map((c, i) => (
                  <li key={i} className="text-sm text-foreground/75 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Self-check list */}
      <div className="question-card p-5 sm:p-6">
        <h3 className="text-sm font-semibold mb-3">自评清单</h3>
        <div className="space-y-2.5">
          {question.selfCheckList.map((item, i) => (
            <button
              key={i}
              onClick={() => toggleCheck(i)}
              className="w-full flex items-start gap-3 text-left group"
            >
              {checklist[i] ? (
                <CheckSquare className="w-4 h-4 text-correct mt-0.5 flex-shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-foreground transition-colors" />
              )}
              <span
                className={cn(
                  'text-sm leading-relaxed transition-colors',
                  checklist[i] ? 'text-foreground/60 line-through' : 'text-foreground/85'
                )}
              >
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WritingSection({ question }: { question: WritingQuestion }) {
  const [showOutline, setShowOutline] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userText, setUserText] = useState('');
  const [checklist, setChecklist] = useState<boolean[]>(
    new Array(question.selfCheckList.length).fill(false)
  );

  function toggleCheck(i: number) {
    setChecklist((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  const wordCount = userText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Prompt */}
      <div className="question-card p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-primary mb-3">写作题目</h3>
        <p className="text-sm text-foreground/90 leading-relaxed mb-3">
          {question.prompt}
        </p>
        <div className="flex flex-wrap gap-2">
          {question.requirements.map((req, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {req}
            </span>
          ))}
        </div>
      </div>

      {/* User input */}
      <div className="question-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">你的作文</h3>
          <span
            className={cn(
              'text-xs font-medium',
              wordCount >= 140 && wordCount <= 170 ? 'text-correct' : 'text-muted-foreground'
            )}
          >
            {wordCount} 词
          </span>
        </div>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="Start writing your essay here..."
          className="w-full h-56 p-3 rounded-lg border border-border/60 bg-muted/30 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors passage-text"
        />
      </div>

      {/* Reference outline */}
      <div className="question-card overflow-hidden">
        <button
          onClick={() => setShowOutline(!showOutline)}
          className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-muted/30 transition-colors"
        >
          <span className="text-sm font-semibold">写作提纲参考</span>
          {showOutline ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {showOutline && (
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 animate-fade-in-up">
            <pre className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed font-sans">
              {question.referenceOutline}
            </pre>
          </div>
        )}
      </div>

      {/* Reference answer */}
      <div className="question-card overflow-hidden">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-muted/30 transition-colors"
        >
          <span className="text-sm font-semibold">参考范文与评分标准</span>
          {showAnswer ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {showAnswer && (
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4 animate-fade-in-up">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                参考范文
              </h4>
              <div className="passage-text text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                {question.referenceAnswer}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                评分标准
              </h4>
              <ul className="space-y-1">
                {question.scoringCriteria.map((c, i) => (
                  <li key={i} className="text-sm text-foreground/75 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Self-check list */}
      <div className="question-card p-5 sm:p-6">
        <h3 className="text-sm font-semibold mb-3">自评清单</h3>
        <div className="space-y-2.5">
          {question.selfCheckList.map((item, i) => (
            <button
              key={i}
              onClick={() => toggleCheck(i)}
              className="w-full flex items-start gap-3 text-left group"
            >
              {checklist[i] ? (
                <CheckSquare className="w-4 h-4 text-correct mt-0.5 flex-shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-foreground transition-colors" />
              )}
              <span
                className={cn(
                  'text-sm leading-relaxed transition-colors',
                  checklist[i] ? 'text-foreground/60 line-through' : 'text-foreground/85'
                )}
              >
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
