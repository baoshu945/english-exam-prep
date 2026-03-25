/*
 * PracticeSelect — Focus Lab Nordic Functionalism
 * Choose question type to practice, card-based layout
 */
import { Link } from 'wouter';
import { getDefaultPaper } from '@/data';
import { getProgress, getTypeAccuracy } from '@/lib/store';
import { partLabels, partLabelsEn, type QuestionType } from '@/lib/types';
import { BookOpen, ArrowRight } from 'lucide-react';

const BOOKS_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663470538270/NQ8dwZyxuDfY6G48WPipnm/hero-knowledge-books-b3zGH85YLZHXYBmpHcvCvN.webp';

const typeColors: Record<string, string> = {
  oral_communication: 'from-primary/10 to-primary/5 border-primary/15',
  vocabulary: 'from-[oklch(0.55_0.15_155/0.1)] to-[oklch(0.55_0.15_155/0.05)] border-correct/15',
  reading_comprehension: 'from-[oklch(0.72_0.14_80/0.1)] to-[oklch(0.72_0.14_80/0.05)] border-gold/15',
  cloze: 'from-[oklch(0.58_0.18_25/0.1)] to-[oklch(0.58_0.18_25/0.05)] border-wrong/15',
  text_completion: 'from-primary/10 to-primary/5 border-primary/15',
  translation: 'from-[oklch(0.55_0.15_155/0.1)] to-[oklch(0.55_0.15_155/0.05)] border-correct/15',
  writing: 'from-[oklch(0.72_0.14_80/0.1)] to-[oklch(0.72_0.14_80/0.05)] border-gold/15',
};

export default function PracticeSelect() {
  const paper = getDefaultPaper();
  const progress = getProgress();

  // Only show objective question types for practice
  const objectiveParts = paper.parts.filter(
    (p) => p.type !== 'translation' && p.type !== 'writing'
  );

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${BOOKS_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        <div className="relative container py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                分类练习
              </h1>
              <p className="text-sm text-muted-foreground">选择题型，按类别刷题</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 sm:py-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {objectiveParts.map((part) => {
            const accuracy = getTypeAccuracy(part.type);
            const typeStats = progress.byType[part.type];
            const answered = typeStats?.answered || 0;
            const total = part.questions.length;
            const progressPct = total > 0 ? Math.round((answered / total) * 100) : 0;
            const colorClass = typeColors[part.type] || typeColors.oral_communication;

            return (
              <Link key={part.id} href={`/practice/${part.type}`}>
                <div
                  className={`question-card p-5 sm:p-6 bg-gradient-to-br ${colorClass} group hover:shadow-md transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                        {partLabels[part.type as QuestionType]}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {partLabelsEn[part.type as QuestionType]}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {part.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-foreground font-medium">{total} 题</span>
                    <span className="text-muted-foreground">
                      已做 {answered}/{total}
                    </span>
                    {answered > 0 && (
                      <span className="text-correct font-medium">
                        正确率 {accuracy}%
                      </span>
                    )}
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 rounded-full bg-border/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/60 transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Subjective questions link */}
        <div className="mt-6 question-card p-5 sm:p-6">
          <p className="text-sm text-muted-foreground mb-3">
            翻译与写作为主观题，请前往专门模块练习：
          </p>
          <Link href="/writing">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              前往翻译与写作模块
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
