import { Link } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => (
  <nav className="bg-white dark:bg-gray-800 shadow pb-4 pt-4 transition-colors duration-200">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Tracker
          </Link>
          <Link to="/patterns" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Patterns
          </Link>
          <Link to="/roadmap" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Roadmap
          </Link>
        </div>
        <div className="flex items-center">
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
