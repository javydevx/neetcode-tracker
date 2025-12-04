import { useState } from "react";
import { Check, Code2, Copy } from "lucide-react";
import { patterns } from "../data";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../context/ThemeContext";


const Patterns = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const { isDark } = useTheme();


  const languages = [
    { id: "python", name: "Python", color: "bg-blue-500" },
    { id: "javascript", name: "JavaScript", color: "bg-yellow-500" },
    { id: "java", name: "Java", color: "bg-red-500" },
    { id: "go", name: "Go", color: "bg-cyan-500" },
  ];

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              LeetCode Patterns Cheat Sheet
            </h1>
            <Code2
              size={36}
              className="text-blue-600 dark:text-blue-400 ml-2"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Master coding patterns in multiple languages
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8 sticky top-4 z-10 transition-colors">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Select Language:
            </span>
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLanguage === lang.id
                    ? `${lang.color} text-white shadow-lg scale-105`
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {patterns.map((pattern, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 px-4">
                <h2 className="text-lg font-bold text-white mb-1">
                  {pattern.title}
                </h2>
                <p className="text-blue-50">{pattern.description}</p>
              </div>

              <div className="p-6">
                <div className="relative mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                      {languages.find((l) => l.id === selectedLanguage)?.name}{" "}
                      Template
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          pattern.templates[selectedLanguage],
                          idx
                        )
                      }
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check
                            size={16}
                            className="text-green-600 dark:text-green-400"
                          />
                          <span className="text-green-600 dark:text-green-400">
                            Copied!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy
                            size={16}
                            className="text-gray-700 dark:text-gray-300"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            Copy
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                  <SyntaxHighlighter
                    language={selectedLanguage}
                    style={isDark ? oneDark : oneLight}
                    wrapLongLines={true}
                    showLineNumbers={true}
                    className="rounded-lg overflow-x-auto"
                  >
                    {pattern.templates[selectedLanguage].replace(/\\n/g, "\n")}
                  </SyntaxHighlighter>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <span className="font-semibold text-blue-900 dark:text-blue-300 text-sm">
                    Common Problems:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pattern.problems.map((problem, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium"
                      >
                        {problem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            💡 Practice these patterns regularly to build strong problem-solving
            intuition
          </p>
        </div>
      </div>
    </div>
  );
};

export default Patterns;
