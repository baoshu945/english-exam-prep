/*
 * Home Page — Focus Lab Nordic Functionalism
 * Hero section with study workspace image, stats overview, module entry cards
 * Warm neutrals, card-based layout, breathing whitespace
 */
import { Link } from 'wouter';
import { BookOpen, Clock, BookMarked, BarChart3, PenLine, ArrowRight } from 'lucide-react';
import { getProgress, getAccuracyRate } from '@/lib/store';
import { getDefaultPaper } from '@/data';
import { partLabels } from '@/lib/types';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663470538270/NQ8dwZyxuDfY6G48WPipnm/hero-study-workspace-Ki2MEgSpVaCeu3YcYhnvGB.webp';

const modules = [
  {
    href: '/practice',
    icon: BookOpen,
    title: '分类练习',
    desc: '按题型分类刷题，逐步攻克薄弱环节',
    color: 'bg-primary/8 text-primary',
  },
  {
    href: '/exam',
    icon: Clock,
    title: '模拟考试',
    desc: '整套试卷限时作答，模拟真实考场',
    color: 'bg-[oklch(0.55_0.15_155/0.08)] text-correct',
  },
  {
    href: '/wrong-book',
    icon: BookMarked,
    title: '错题本',
    desc: '自动收集错题，支持重新练习',
    color: 'bg-[oklch(0.58_0.18_25/0.08)] text-wrong',
  },
  {
    href: '/progress',
    icon: BarChart3,
    title: '学习进度',
    desc: '查看完成题量、正确率和各题型表现',
    color: 'bg-[oklch(0.72_0.14_80/0.08)] text-gold',
  },
  {
    href: '/writing',
    icon: PenLine,
    title: '翻译与写作',
    desc: '主观题练习，含参考答案与自评清单',
    color: 'bg-primary/8 text-primary',
  },
];

export default function Home() {
  const progress = getProgress();
  const paper = getDefaultPaper();
  const totalQuestions = paper.parts.reduce(
    (sum, part) => sum + part.questions.length,
    0
  );
  const accuracy = getAccuracyRate();

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="relative container py-12 sm:py-16 lg:py-20">
          <div className="max-w-lg">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              2025 同等学力英语全国统考
            </p>
            <h1
              className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              备考冲刺
              <br />
              <span className="text-primary">模拟测验工具</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-md">
              涵盖口语交际、词汇、阅读理解、完形填空、短文完成、翻译与写作七大题型，助你高效备考。
            </p>
            <Link href="/practice">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                开始练习
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8 sm:py-10">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="question-card p-4 sm:p-5 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
              {progress.totalAnswered}
            </p>
            <p className="text-xs text-muted-foreground mt-1">已完成题目</p>
          </div>
          <div className="question-card p-4 sm:p-5 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-correct" style={{ fontFamily: 'var(--font-display)' }}>
              {accuracy}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">正确率</p>
          </div>
          <div className="question-card p-4 sm:p-5 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gold" style={{ fontFamily: 'var(--font-display)' }}>
              {totalQuestions}
            </p>
            <p className="text-xs text-muted-foreground mt-1">题库总量</p>
          </div>
        </div>

        {/* Module Cards */}
        <h2
          className="text-xl sm:text-2xl mb-5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          学习模块
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <Link key={m.href} href={m.href}>
              <div className="question-card p-5 sm:p-6 group hover:border-primary/20 transition-all duration-300">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${m.color}`}
                >
                  <m.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                  {m.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Exam Paper Info */}
        <div className="mt-8 sm:mt-10 question-card p-5 sm:p-6">
          <h2
            className="text-lg sm:text-xl mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            当前试卷
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div>
              <h3 className="font-semibold">{paper.title}</h3>
              <p className="text-sm text-muted-foreground">{paper.subtitle}</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium sm:ml-auto">
              {paper.totalTimeMinutes} 分钟
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {paper.parts.map((part) => (
              <div
                key={part.id}
                className="text-center p-3 rounded-lg bg-muted/50 border border-border/30"
              >
                <p className="text-xs text-muted-foreground mb-0.5">
                  {partLabels[part.type]}
                </p>
                <p className="text-sm font-semibold">{part.questions.length} 题</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
