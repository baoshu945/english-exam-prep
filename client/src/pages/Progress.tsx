/*
 * Progress — Focus Lab Nordic Functionalism
 * Study statistics with visual charts and per-type breakdown
 */
import { useMemo } from 'react';
import { getProgress, getTypeAccuracy, getExamRecords } from '@/lib/store';
import { getDefaultPaper } from '@/data';
import { partLabels, type QuestionType } from '@/lib/types';
import { BarChart3, Target, BookOpen, Clock, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const PROGRESS_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663470538270/NQ8dwZyxuDfY6G48WPipnm/hero-progress-cards-KvryRfmpS8mNDu52QeVUph.webp';

const typeOrder: QuestionType[] = [
  'oral_communication',
  'vocabulary',
  'reading_comprehension',
  'cloze',
  'text_completion',
];

const barColors = [
  'bg-primary',
  'bg-correct',
  'bg-gold',
  'bg-wrong',
  'bg-[oklch(0.50_0.10_240)]',
];

export default function Progress() {
  const progress = getProgress();
  const paper = getDefaultPaper();
  const examRecords = getExamRecords();

  const totalQuestions = useMemo(() => {
    return paper.parts.reduce((sum, part) => {
      if (part.type !== 'translation' && part.type !== 'writing') {
        return sum + part.questions.length;
      }
      return sum;
    }, 0);
  }, [paper]);

  const overallAccuracy =
    progress.totalAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
      : 0;

  const completionPct =
    totalQuestions > 0
      ? Math.round((progress.totalAnswered / totalQuestions) * 100)
      : 0;

  const typeStats = typeOrder.map((type, i) => {
    const part = paper.parts.find((p) => p.type === type);
    const total = part ? part.questions.length : 0;
    const stats = progress.byType[type];
    const answered = stats?.answered || 0;
    const accuracy = getTypeAccuracy(type);
    return { type, label: partLabels[type], total, answered, accuracy, color: barColors[i] };
  });

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}分${s}秒`;
  }

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${PROGRESS_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background" />
        <div className="relative container py-10 sm:py-14">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[oklch(0.72_0.14_80/0.08)] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h1
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                学习进度
              </h1>
              <p className="text-sm text-muted-foreground">查看你的备考数据</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 sm:py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="question-card p-4 sm:p-5 text-center">
            <BookOpen className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
              {progress.totalAnswered}
            </p>
            <p className="text-xs text-muted-foreground mt-1">已做题目</p>
          </div>
          <div className="question-card p-4 sm:p-5 text-center">
            <Target className="w-5 h-5 text-correct mx-auto mb-2" />
            <p className="text-2xl font-bold text-correct" style={{ fontFamily: 'var(--font-display)' }}>
              {overallAccuracy}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">正确率</p>
          </div>
          <div className="question-card p-4 sm:p-5 text-center">
            <BarChart3 className="w-5 h-5 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-gold" style={{ fontFamily: 'var(--font-display)' }}>
              {completionPct}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">完成度</p>
          </div>
          <div className="question-card p-4 sm:p-5 text-center">
            <Trophy className="w-5 h-5 text-wrong mx-auto mb-2" />
            <p className="text-2xl font-bold text-wrong" style={{ fontFamily: 'var(--font-display)' }}>
              {progress.wrongQuestions.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">错题数</p>
          </div>
        </div>

        {/* Per-type breakdown */}
        <div className="question-card p-5 sm:p-6 mb-6">
          <h2
            className="text-lg mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            各题型表现
          </h2>
          <div className="space-y-4">
            {typeStats.map((ts) => (
              <div key={ts.type}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{ts.label}</span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{ts.answered}/{ts.total} 题</span>
                    {ts.answered > 0 && (
                      <span className={cn(
                        'font-medium',
                        ts.accuracy >= 80 ? 'text-correct' : ts.accuracy >= 60 ? 'text-gold' : 'text-wrong'
                      )}>
                        {ts.accuracy}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-muted/70 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-700', ts.color)}
                    style={{
                      width: ts.total > 0 ? `${(ts.answered / ts.total) * 100}%` : '0%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Records */}
        <div className="question-card p-5 sm:p-6">
          <h2
            className="text-lg mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            模考记录
          </h2>
          {examRecords.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              暂无模考记录，去参加一次模拟考试吧！
            </p>
          ) : (
            <div className="space-y-3">
              {examRecords.map((record, i) => {
                const accuracy = record.totalQuestions > 0
                  ? Math.round((record.correctCount / record.totalQuestions) * 100)
                  : 0;
                const date = new Date(record.startedAt);
                return (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/30"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        第 {i + 1} 次模考
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {date.toLocaleDateString('zh-CN')} {date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right">
                        <p className="font-semibold text-correct">{accuracy}%</p>
                        <p className="text-xs text-muted-foreground">正确率</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatTime(record.timeSpentSeconds)}</p>
                        <p className="text-xs text-muted-foreground">用时</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
