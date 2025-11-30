import { useState, useEffect } from "react";
import { Info, ExternalLink, Map, ChevronDown, ChevronUp } from "lucide-react";
import {
  Filters,
  StatsCard,
  ProblemTable,
  ExportImportControls,
  CircularProgress,
} from "../components";
import { problems } from "../data";

// --- Spaced repetition intervals ---
const intervals = [1, 3, 7, 14, 30];

const NeetCodeTracker = () => {
  // --- Local state with localStorage ---
  const [progress, setProgress] = useState(() => {
    try {
      const savedProgress = localStorage.getItem("neetcode-progress");
      return savedProgress ? JSON.parse(savedProgress) : {};
    } catch (error) {
      console.error("Error loading progress from localStorage:", error);
      return {};
    }
  });

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [showOnlyDueToday, setShowOnlyDueToday] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("neetcode-progress", JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving progress to localStorage:", error);
    }
  }, [progress]);

  // --- Helpers ---
  const today = new Date().toISOString().split("T")[0];

  const calculateNextReviews = (solvedDate) => {
    if (!solvedDate) return [];
    const date = new Date(solvedDate);
    return intervals.map(
      (days) =>
        new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
    );
  };

  const toggleComplete = (problemId, reviewIndex = null) => {
    const todayStr = new Date().toISOString().split("T")[0];
    setProgress((prev) => {
      const current = prev[problemId] || {
        solved: false,
        reviews: Array(5).fill(false),
        dates: {},
      };

      if (reviewIndex === null) {
        const newSolved = !current.solved;
        return {
          ...prev,
          [problemId]: {
            ...current,
            solved: newSolved,
            solvedDate: newSolved ? todayStr : null,
            reviews: newSolved ? current.reviews : Array(5).fill(false),
            dates: newSolved ? { ...current.dates, initial: todayStr } : {},
          },
        };
      } else {
        const newReviews = [...current.reviews];
        newReviews[reviewIndex] = !newReviews[reviewIndex];
        const newDates = { ...current.dates };
        if (newReviews[reviewIndex]) {
          newDates[`review${reviewIndex + 1}`] = todayStr;
        } else {
          delete newDates[`review${reviewIndex + 1}`];
        }
        return {
          ...prev,
          [problemId]: { ...current, reviews: newReviews, dates: newDates },
        };
      }
    });
  };

  const categories = [
    "All",
    ...Array.from(new Set(problems.map((p) => p.category))),
  ];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const stats = {
    total: problems.length,
    solved: Object.values(progress).filter((p) => p.solved).length,
    easy: problems.filter(
      (p) => p.difficulty === "Easy" && progress[p.id]?.solved
    ).length,
    medium: problems.filter(
      (p) => p.difficulty === "Medium" && progress[p.id]?.solved
    ).length,
    hard: problems.filter(
      (p) => p.difficulty === "Hard" && progress[p.id]?.solved
    ).length,
  };

  const getDueProblems = () => {
    return problems.filter((problem) => {
      const prob = progress[problem.id];
      if (!prob || !prob.solved) return false;
      const nextReviews = calculateNextReviews(prob.solvedDate);
      return nextReviews.some(
        (date, idx) => !prob.reviews?.[idx] && date <= today
      );
    }).length;
  };

  const progressPercent = Math.round((stats.solved / stats.total) * 100);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="card fade-in">
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left: Title and CircularProgress */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Circular Progress */}
                <div className="fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
                  <CircularProgress value={progressPercent} size={100} strokeWidth={8} />
                </div>

                {/* Title and subtitle */}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-lc-text-primary mb-1">
                    NeetCode <span className="text-lc-accent">150</span>
                  </h1>
                  <p className="text-lc-text-secondary">
                    Master algorithms with spaced repetition
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="text-lc-success font-medium">{stats.solved} solved</span>
                    <span className="text-lc-text-tertiary">•</span>
                    <span className="text-lc-text-secondary">{stats.total - stats.solved} remaining</span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://neetcode.io/roadmap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                  title="View the official NeetCode roadmap"
                >
                  <Map size={16} />
                  <span className="hidden sm:inline">Official Roadmap</span>
                  <ExternalLink size={14} className="opacity-60" />
                </a>
              </div>
            </div>

            {/* Explanation toggle */}
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="mt-6 flex items-center gap-2 text-lc-accent hover:text-lc-accent-hover text-sm transition-colors"
            >
              <Info size={16} />
              {showExplanation ? "Hide" : "Show"} Spaced Repetition Info
              {showExplanation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Explanation Section */}
        {showExplanation && (
          <div className="card p-6 fade-in border-l-4 border-l-lc-accent">
            <h3 className="text-lg font-semibold text-lc-accent mb-4 flex items-center gap-2">
              <Info size={20} />
              How Spaced Repetition Works
            </h3>
            <p className="text-lc-text-secondary mb-4">
              This tracker uses spaced repetition to help you retain coding
              problems long-term.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-lc-text-primary">Review Schedule</h4>
                <ul className="space-y-2 text-sm text-lc-text-secondary">
                  {[
                    { label: 'R1', time: 'After 1 day' },
                    { label: 'R2', time: 'After 3 days' },
                    { label: 'R3', time: 'After 7 days (1 week)' },
                    { label: 'R4', time: 'After 14 days (2 weeks)' },
                    { label: 'R5', time: 'After 30 days (1 month)' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 fade-in-up" style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}>
                      <span className="w-8 h-8 rounded bg-lc-bg-elevated flex items-center justify-center text-lc-success font-mono text-xs font-bold">
                        {item.label}
                      </span>
                      <span>{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-lc-text-primary">How to Use</h4>
                <ol className="space-y-2 text-sm text-lc-text-secondary list-decimal list-inside">
                  <li>Mark a problem as solved when you complete it</li>
                  <li>Review dots will show your progress</li>
                  <li>Click dots to mark reviews as complete</li>
                  <li>Use "Due Today" filter to see what needs review</li>
                  <li>Check the Official Roadmap for study guidance</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatsCard
            color="blue"
            value={`${stats.solved}/${stats.total}`}
            label="Total Solved"
          />
          <StatsCard color="green" value={stats.easy} label="Easy" />
          <StatsCard color="yellow" value={stats.medium} label="Medium" />
          <StatsCard color="red" value={stats.hard} label="Hard" />
          <div className="col-span-2 md:col-span-1">
            <StatsCard
              color="orange"
              value={getDueProblems()}
              label="Due Today"
            />
          </div>
        </div>

        {/* Export / Import / Clear */}
        <ExportImportControls progress={progress} setProgress={setProgress} />

        {/* Filters */}
        <Filters
          categories={categories}
          difficulties={difficulties}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterDifficulty={filterDifficulty}
          setFilterDifficulty={setFilterDifficulty}
          showOnlyDueToday={showOnlyDueToday}
          setShowOnlyDueToday={setShowOnlyDueToday}
        />

        {/* Problems Table */}
        <ProblemTable
          problems={problems}
          progress={progress}
          toggleComplete={toggleComplete}
          calculateNextReviews={calculateNextReviews}
          filterCategory={filterCategory}
          filterDifficulty={filterDifficulty}
          showOnlyDueToday={showOnlyDueToday}
        />
      </div>
    </div>
  );
};

export default NeetCodeTracker;
