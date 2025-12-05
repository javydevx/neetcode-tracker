const CircularProgress = ({ solved, total, size = 120 }) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-blue-600 dark:text-blue-500 transition-all duration-500"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {solved}/{total}
          </div>
        </div>
      </div>
    </div>
  );
};

const CircularStatsCard = ({ stats, problems }) => {
  const totalEasy = problems.filter((p) => p.difficulty === "Easy").length;
  const totalMedium = problems.filter((p) => p.difficulty === "Medium").length;
  const totalHard = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Progress Overview
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <CircularProgress solved={stats.solved} total={stats.total} />
        </div>

        <div className="flex-1 w-full space-y-4">
          {/* Easy */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Easy
              </span>
            </div>
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      totalEasy > 0 ? (stats.easy / totalEasy) * 100 : 0
                    }%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-white min-w-[60px] text-right">
                {stats.easy}/{totalEasy}
              </span>
            </div>
          </div>

          {/* Medium */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Medium
              </span>
            </div>
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      totalMedium > 0 ? (stats.medium / totalMedium) * 100 : 0
                    }%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-white min-w-[60px] text-right">
                {stats.medium}/{totalMedium}
              </span>
            </div>
          </div>

          {/* Hard */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Hard
              </span>
            </div>
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      totalHard > 0 ? (stats.hard / totalHard) * 100 : 0
                    }%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-white min-w-[60px] text-right">
                {stats.hard}/{totalHard}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.dueToday || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Due Today
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round((stats.solved / stats.total) * 100) || 0}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularStatsCard;
