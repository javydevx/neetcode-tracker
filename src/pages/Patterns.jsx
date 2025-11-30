import { useState } from "react";
import { Check, Code2, Copy } from "lucide-react";
import { patterns } from "../data";

const Patterns = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const languages = [
    { id: "python", name: "Python", color: "bg-ctp-blue" },
    { id: "javascript", name: "JavaScript", color: "bg-ctp-yellow" },
    { id: "java", name: "Java", color: "bg-ctp-red" },
    { id: "go", name: "Go", color: "bg-ctp-teal" },
  ];

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-ctp-text">
              <span className="text-gradient">LeetCode Patterns</span>
            </h1>
            <Code2 size={32} className="text-ctp-blue" />
          </div>
          <p className="text-ctp-subtext0">
            Master coding patterns in multiple languages
          </p>
        </div>

        {/* Language Selector */}
        <div className="glass-card p-4 mb-8 sticky top-16 md:top-4 z-10">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-ctp-subtext0 text-sm font-medium hidden sm:inline">
              Language:
            </span>
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  selectedLanguage === lang.id
                    ? `${lang.color} text-ctp-crust shadow-lg scale-105`
                    : "bg-ctp-surface0/50 text-ctp-subtext0 hover:bg-ctp-surface1/50 hover:text-ctp-text"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Patterns */}
        <div className="space-y-6">
          {patterns.map((pattern, idx) => (
            <div
              key={idx}
              className="glass-card-hover overflow-hidden animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-ctp-mauve/20 to-ctp-blue/20 py-4 px-5 border-b border-ctp-surface1/30">
                <h2 className="text-lg font-bold text-ctp-text mb-1">
                  {pattern.title}
                </h2>
                <p className="text-ctp-subtext0 text-sm">{pattern.description}</p>
              </div>

              <div className="p-5">
                {/* Code Block */}
                <div className="relative mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-ctp-overlay0 uppercase tracking-wider">
                      {languages.find((l) => l.id === selectedLanguage)?.name}{" "}
                      Template
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(pattern.templates[selectedLanguage], idx)
                      }
                      className="glass-button flex items-center gap-2 px-3 py-1.5 text-xs"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check size={14} className="text-ctp-green" />
                          <span className="text-ctp-green">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-ctp-mantle rounded-xl p-4 overflow-x-auto border border-ctp-surface0">
                    <code className="text-sm font-mono text-ctp-text whitespace-pre">
                      {pattern.templates[selectedLanguage].replace(/\\n/g, "\n")}
                    </code>
                  </pre>
                </div>

                {/* Common Problems */}
                <div className="bg-ctp-surface0/30 rounded-xl p-4">
                  <span className="font-semibold text-ctp-blue text-sm">
                    Common Problems:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {pattern.problems.map((problem, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-3 py-1 bg-ctp-blue/10 text-ctp-blue border border-ctp-blue/20 rounded-full text-xs font-medium"
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

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-ctp-overlay0">
            Practice these patterns regularly to build strong problem-solving
            intuition
          </p>
        </div>
      </div>
    </div>
  );
};

export default Patterns;
