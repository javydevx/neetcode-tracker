import { Link } from "react-router-dom";
import { Github, Star, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow dark:shadow-gray-800 mb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex gap-3 sm:gap-6">
          <Link
            to="/"
            className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
          >
            Tracker
          </Link>
          <Link
            to="/patterns"
            className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
          >
            Patterns
          </Link>
          <Link
            to="/roadmap"
            className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
          >
            Roadmap
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="h-10 w-10 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={20} className="text-yellow-500 animate-spin-slow" />
            ) : (
              <Moon size={20} className="text-gray-700 dark:text-gray-200" />
            )}
          </button>

          {/* GitHub Button */}
          <a
            href="https://github.com/javydevx/neetcode-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 group relative flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded overflow-hidden font-semibold transition-all duration-300 hover:shadow-xl"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <Github
              size={20}
              className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="relative z-10 hidden sm:inline">
              Star on GitHub
            </span>
            <Star
              size={16}
              className="relative z-10 group-hover:fill-yellow-300 group-hover:text-yellow-300 transition-all duration-300"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
