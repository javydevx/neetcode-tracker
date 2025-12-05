import { Filter } from "lucide-react";

const Filters = ({
  categories,
  difficulties,
  filterCategory,
  setFilterCategory,
  filterDifficulty,
  setFilterDifficulty,
  showOnlyDueToday,
  setShowOnlyDueToday,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-colors">
    <div className="flex items-center gap-2 mb-4">
      <Filter size={20} className="text-gray-600" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Filters
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          title="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full p-2 cursor-pointer border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none transition-colors"
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Difficulty
        </label>
        <select
          title="Difficulty"
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="w-full p-2 cursor-pointer border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none transition-colors"
        >
          {difficulties.map((diff) => (
            <option
              key={diff}
              value={diff}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {diff}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 md:mt-6">
        <input
          id="due-today-checkbox"
          type="checkbox"
          title="Show Only Due Today"
          checked={showOnlyDueToday}
          onChange={() => setShowOnlyDueToday((prev) => !prev)}
          className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 border border-gray-300 dark:border-gray-600 rounded bg-white"
        />
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Show Only Due Today
        </label>
      </div>
    </div>
  </div>
);

export default Filters;
