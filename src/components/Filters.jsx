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
  <div className="card p-4 fade-in">
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      {/* Filter icon and label */}
      <div className="flex items-center gap-2 text-lc-text-secondary">
        <div className="p-2 rounded-md bg-lc-bg-elevated">
          <Filter size={16} />
        </div>
        <span className="text-sm font-medium hidden sm:inline">Filters</span>
      </div>

      {/* Filter controls */}
      <div className="flex flex-1 flex-col sm:flex-row gap-3 sm:items-center">
        {/* Category select */}
        <div className="flex-1 min-w-0">
          <select
            title="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select w-full"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-lc-bg-secondary text-lc-text-primary">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty select */}
        <div className="flex-1 min-w-0">
          <select
            title="Difficulty"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="filter-select w-full"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff} className="bg-lc-bg-secondary text-lc-text-primary">
                {diff}
              </option>
            ))}
          </select>
        </div>

        {/* Due today toggle */}
        <div className="flex items-center gap-3 pl-2">
          <button
            role="switch"
            aria-checked={showOnlyDueToday}
            onClick={() => setShowOnlyDueToday((prev) => !prev)}
            className={`toggle ${showOnlyDueToday ? 'active' : ''}`}
          >
            <span className="toggle-thumb" />
          </button>
          <label
            className="text-sm text-lc-text-secondary whitespace-nowrap cursor-pointer hover:text-lc-text-primary transition-colors"
            onClick={() => setShowOnlyDueToday((prev) => !prev)}
          >
            Due Today
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default Filters;
