 import { CheckCircle2, Circle, Calendar, ExternalLink, Minus } from "lucide-react";

const difficultyColor = {
  Easy: "text-green-600",
  Medium: "text-yellow-600",
  Hard: "text-red-600",
};

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
      filterCategory === "All" ||
      (problem.topics || []).includes(filterCategory);

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Problems
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-16">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[200px]">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-40">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-24">
                Difficulty
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-40">
                Companies
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-32">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[200px]">
                Reviews & Due Dates
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProblems.map((problem, index) => {
              const prob = progress[problem.id] || {};
              const nextReviews = calculateNextReviews(prob.solvedDate);
              return (
                <tr
                  key={index.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center gap-2">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center gap-1"
                        title={`Open ${problem.name} on NeetCode`}
                      >
                        <span className="line-clamp-2">{problem.title}</span>
                        <ExternalLink size={14} className="flex-shrink-0" />
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex flex-wrap gap-1.5 max-w-[192px]">
                      {problem.listMeta?.section || problem.listMeta?.module ? (
                        <span
                          className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
                          title="Category"
                        >
                          {problem.listMeta.section || problem.listMeta.module}
                        </span>
                      ) : null}
                      {(problem.topics || []).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded"
                          title="Topic"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap text-sm font-semibold ${
                      difficultyColor[problem.difficulty]
                    }`}
                  >
                    {problem.difficulty}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 flex-wrap max-w-[192px]">
                      {problem.companies && problem.companies.length > 0 ? (
                        problem.companies.map((company, idx) => (
                          <div
                            key={idx}
                            className="relative group"
                            title={company.name}
                          >
                            {company.logo ? (
                              <img
                                src={company.logo}
                                alt={company.name}
                                className="h-6 w-6 object-contain cursor-pointer hover:scale-110 transition-transform"
                              />
                            ) : (
                              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-semibold text-gray-800 dark:text-gray-100 cursor-pointer hover:scale-110 transition-transform">
                                {company.name[0]}
                              </div>
                            )}
                            {/* Tooltip */}
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              {company.name}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div
                          className="flex items-center gap-1 text-gray-400 dark:text-gray-500"
                          title="No company data available"
                        >
                          <Minus
                            size={16}
                            className="text-gray-300 dark:text-gray-600"
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleComplete(problem.id)}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      {prob.solved ? (
                        <CheckCircle2
                          className="text-green-600 dark:text-green-500"
                          size={20}
                        />
                      ) : (
                        <Circle size={20} />
                      )}
                      <span className="text-xs">
                        {prob.solved ? "Solved" : "Not Solved"}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    {prob.solved ? (
                      <div className="flex flex-wrap gap-2">
                        {nextReviews.map((date, idx) => {
                          const isCompleted = prob.reviews?.[idx];
                          const overdue = !isCompleted && isOverdue(date);
                          const dueToday = !isCompleted && isDueToday(date);

                          return (
                            <div
                              key={idx}
                              className="flex flex-col items-center"
                            >
                              <button
                                onClick={() => toggleComplete(problem.id, idx)}
                                className={`px-2 py-1 rounded text-xs border min-w-[50px] transition-colors ${
                                  isCompleted
                                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-600"
                                    : overdue
                                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-600"
                                    : dueToday
                                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-600"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                                }`}
                                title={`Review ${idx + 1} - Due: ${formatDate(
                                  date
                                )}`}
                              >
                                {`R${idx + 1}`}
                              </button>
                              <div
                                className={`text-[10px] mt-1 flex items-center gap-0.5 ${
                                  isCompleted
                                    ? "text-green-600 dark:text-green-400"
                                    : overdue
                                    ? "text-red-600 dark:text-red-400"
                                    : dueToday
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : "text-gray-500 dark:text-gray-300"
                                }`}
                              >
                                <Calendar size={10} />
                                {formatDate(date)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Complete problem to see review schedule
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemTable;
