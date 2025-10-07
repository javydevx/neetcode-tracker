const colorClasses = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-200 dark:text-blue-600",
  green: "bg-green-50 text-green-600 dark:bg-green-200 dark:text-green-600",
  yellow: "bg-yellow-50 text-yellow-600 dark:bg-yellow-200 dark:text-yellow-600",
  red: "bg-red-50 text-red-600 dark:bg-red-200 dark:text-red-600",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-200 dark:text-purple-600",
};

const StatsCard = ({ color, value, label }) => (
  <div className={`${colorClasses[color]} p-4 rounded-lg`}>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-gray-600 dark:text-gray-800">{label}</div>
  </div>
);

export default StatsCard;
