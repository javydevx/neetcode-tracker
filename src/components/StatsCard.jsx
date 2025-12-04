const colorClasses = {
  blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  yellow:
    "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  red: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  purple:
    "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
};

const StatsCard = ({ color, value, label }) => (
  <div className={`${colorClasses[color]} p-4 rounded-lg transition-colors`}>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm opacity-75">{label}</div>
  </div>
);
export default StatsCard;
