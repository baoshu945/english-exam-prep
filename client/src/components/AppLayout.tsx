/*
 * AppLayout — Focus Lab Nordic Functionalism
 * Left sidebar on desktop, bottom tab bar on mobile
 * Warm neutrals, clean lines, breathing whitespace
 */
import { useLocation, Link } from 'wouter';
import {
  Home,
  BookOpen,
  Clock,
  BookMarked,
  BarChart3,
  PenLine,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: '/', label: '首页', icon: Home },
  { href: '/practice', label: '练习', icon: BookOpen },
  { href: '/exam', label: '模考', icon: Clock },
  { href: '/wrong-book', label: '错题本', icon: BookMarked },
  { href: '/progress', label: '进度', icon: BarChart3 },
  { href: '/writing', label: '写译', icon: PenLine },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[220px] fixed inset-y-0 left-0 z-30 border-r border-border/60 bg-sidebar/80 backdrop-blur-md">
        <div className="px-6 pt-7 pb-5">
          <h1 className="text-lg leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            英语备考
          </h1>
          <p className="text-xs text-muted-foreground mt-1">同等学力统考</p>
        </div>
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? location === '/'
                : location.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <item.icon className="w-[18px] h-[18px]" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-4 text-[11px] text-muted-foreground/60">
          2025 同等学力英语
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-[220px] pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border/60 bg-background/90 backdrop-blur-md safe-area-pb">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? location === '/'
                : location.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    'flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
