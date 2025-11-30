import { Check, ExternalLink } from "lucide-react";

const ProblemTable = ({
  problems,
  progress,
  toggleComplete,
  calculateNextReviews,
  filterCategory,
  filterDifficulty,
  showOnlyDueToday,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const filteredProblems = problems.filter((problem) => {
    const categoryMatch =
      filterCategory === "All" || problem.category === filterCategory;
    const difficultyMatch =
      filterDifficulty === "All" || problem.difficulty === filterDifficulty;

    if (!showOnlyDueToday) return categoryMatch && difficultyMatch;

    const prob = progress[problem.id];
    if (!prob || !prob.solved) return false;
    const nextReviews = calculateNextReviews(prob.solvedDate);
    const isDueToday = nextReviews.some(
      (date, idx) => !prob.reviews?.[idx] && date <= today
    );
    return categoryMatch && difficultyMatch && isDueToday;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = (date) => {
    return date < today;
  };

  const isDueToday = (date) => {
    return date === today;
  };

  return (
    <div className="card overflow-hidden fade-in">
      {/* Header */}
      <div className="px-6 py-4 border-b border-lc-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-lc-text-primary">Problems</h2>
          <p className="text-sm text-lc-text-secondary mt-0.5">
            {filteredProblems.length} of {problems.length} problems
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-lc-text-tertiary">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-lc-success" /> Solved
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-lc-error animate-pulse" /> Overdue
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-lc-bg-elevated/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-lc-text-tertiary uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lc-text-tertiary uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lc-text-tertiary uppercase tracking-wider hidden md:table-cell">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lc-text-tertiary uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lc-text-tertiary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lc-text-tertiary uppercase tracking-wider hidden lg:table-cell">
                Reviews
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem, index) => {
              const prob = progress[problem.id] || {};
              const nextReviews = calculateNextReviews(prob.solvedDate);

              return (
                <tr
                  key={problem.id}
                  className="table-row fade-in-up"
                  style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s`, opacity: 0 }}
                >
                  {/* ID */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-lc-text-tertiary font-mono">
                    {problem.id}
                  </td>

                  {/* Name - Orange accent link */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="problem-link flex items-center gap-2 group"
                      title={`Open ${problem.name} on NeetCode`}
                    >
                      <span className="text-sm">{problem.name}</span>
                      <ExternalLink
                        size={14}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-lc-text-secondary hidden md:table-cell">
                    <span className="px-2 py-1 rounded bg-lc-bg-elevated text-xs">
                      {problem.category}
                    </span>
                  </td>

                  {/* Difficulty */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium text-lc-${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleComplete(problem.id)}
                      className="flex items-center gap-2 group"
                    >
                      <div className={`status-check ${prob.solved ? 'checked' : 'unchecked'}`}>
                        {prob.solved && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className={`text-xs font-medium ${prob.solved ? 'text-lc-success' : 'text-lc-text-tertiary'}`}>
                        {prob.solved ? "Solved" : "Todo"}
                      </span>
                    </button>
                  </td>

                  {/* Reviews */}
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {prob.solved ? (
                      <div className="flex items-center gap-1.5">
                        {nextReviews.map((date, idx) => {
                          const isCompleted = prob.reviews?.[idx];
                          const overdue = !isCompleted && isOverdue(date);
                          const dueToday = !isCompleted && isDueToday(date);

                          let dotClass = "review-dot";
                          if (isCompleted) dotClass += " filled";
                          else if (overdue) dotClass += " overdue";
                          else if (dueToday) dotClass += " due";

                          return (
                            <button
                              key={idx}
                              onClick={() => toggleComplete(problem.id, idx)}
                              className={dotClass}
                              title={`Review ${idx + 1} - ${formatDate(date)}${
                                isCompleted ? " (Done)" : overdue ? " (Overdue)" : dueToday ? " (Due Today)" : ""
                              }`}
                            >
                              {idx + 1}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-xs text-lc-text-tertiary">
                        Complete to unlock
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty state */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-lc-bg-elevated flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-lc-text-secondary font-medium">No problems match your filters</p>
            <p className="text-lc-text-tertiary text-sm mt-1">Try adjusting your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemTable;
