import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import PracticeSelect from "./pages/PracticeSelect";
import PracticeQuiz from "./pages/PracticeQuiz";
import ExamMode from "./pages/ExamMode";
import WrongBook from "./pages/WrongBook";
import Progress from "./pages/Progress";
import TranslationWriting from "./pages/TranslationWriting";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/practice" component={PracticeSelect} />
        <Route path="/practice/:type" component={PracticeQuiz} />
        <Route path="/exam" component={ExamMode} />
        <Route path="/wrong-book" component={WrongBook} />
        <Route path="/progress" component={Progress} />
        <Route path="/writing" component={TranslationWriting} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
