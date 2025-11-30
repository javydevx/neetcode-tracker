import { useEffect, useState } from "react";
import {
  Briefcase,
  Code,
  MessageSquare,
  DollarSign,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  Brain,
  Rocket,
} from "lucide-react";
import { interviewRoadmap, dsaMindmap } from "../data";

const iconMap = {
  Briefcase,
  Code,
  MessageSquare,
  DollarSign,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  Brain,
};

const sectionColors = {
  "bg-blue-600": "from-ctp-blue/30 to-ctp-sapphire/30 border-ctp-blue/50",
  "bg-green-600": "from-ctp-green/30 to-ctp-teal/30 border-ctp-green/50",
  "bg-purple-600": "from-ctp-mauve/30 to-ctp-pink/30 border-ctp-mauve/50",
  "bg-orange-600": "from-ctp-peach/30 to-ctp-yellow/30 border-ctp-peach/50",
  "bg-teal-600": "from-ctp-teal/30 to-ctp-sky/30 border-ctp-teal/50",
  "bg-red-600": "from-ctp-red/30 to-ctp-maroon/30 border-ctp-red/50",
  "bg-indigo-600": "from-ctp-lavender/30 to-ctp-blue/30 border-ctp-lavender/50",
  "bg-pink-600": "from-ctp-pink/30 to-ctp-flamingo/30 border-ctp-pink/50",
};

const sectionIconColors = {
  "bg-blue-600": "text-ctp-blue",
  "bg-green-600": "text-ctp-green",
  "bg-purple-600": "text-ctp-mauve",
  "bg-orange-600": "text-ctp-peach",
  "bg-teal-600": "text-ctp-teal",
  "bg-red-600": "text-ctp-red",
  "bg-indigo-600": "text-ctp-lavender",
  "bg-pink-600": "text-ctp-pink",
};

const InterviewRoadmap = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [completedItems, setCompletedItems] = useState(() => {
    try {
      const saved = localStorage.getItem("interview-progress");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [activeTab, setActiveTab] = useState("interview");

  useEffect(() => {
    try {
      localStorage.setItem(
        "interview-progress",
        JSON.stringify(completedItems)
      );
    } catch (error) {
      console.error("Error saving interview progress:", error);
    }
  }, [completedItems]);

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComplete = (id) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getProgress = (sectionId) => {
    const section = interviewRoadmap.find((s) => s.id === sectionId);
    if (!section) return 0;
    const completed = section.items.filter(
      (item) => completedItems[item.id]
    ).length;
    return Math.round((completed / section.items.length) * 100);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-ctp-text">
              <span className="text-gradient">Interview Mastery</span>
            </h1>
            <Rocket size={32} className="text-ctp-peach" />
          </div>
          <p className="text-ctp-subtext0">
            Your complete guide from application to offer
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="glass-card p-1.5 mb-8 flex gap-1.5">
          <button
            onClick={() => setActiveTab("interview")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === "interview"
                ? "bg-ctp-blue text-ctp-crust shadow-lg"
                : "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/30"
            }`}
          >
            Interview Process
          </button>
          <button
            onClick={() => setActiveTab("dsa")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === "dsa"
                ? "bg-ctp-blue text-ctp-crust shadow-lg"
                : "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/30"
            }`}
          >
            DSA Mind Map
          </button>
        </div>

        {/* Interview Process Tab */}
        {activeTab === "interview" && (
          <div className="space-y-4">
            {interviewRoadmap.map((section, idx) => {
              const Icon = iconMap[section.icon];
              const progress = getProgress(section.id);
              const isExpanded = expandedSections[section.id];
              const gradientClass = sectionColors[section.color] || "from-ctp-surface1/30 to-ctp-surface0/30 border-ctp-surface1/50";
              const iconColor = sectionIconColors[section.color] || "text-ctp-text";

              return (
                <div
                  key={section.id}
                  className="glass-card-hover overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Section Header */}
                  <div
                    onClick={() => toggleSection(section.id)}
                    className={`bg-gradient-to-r ${gradientClass} p-4 cursor-pointer border-b transition-all duration-200`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-ctp-surface0/50 p-2.5 rounded-xl">
                          <Icon size={24} className={iconColor} />
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-ctp-text">
                            {idx + 1}. {section.title}
                          </h2>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="bg-ctp-surface0 rounded-full h-1.5 w-20">
                              <div
                                className="bg-ctp-green rounded-full h-1.5 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-ctp-subtext0 text-xs font-medium">
                              {progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-ctp-subtext0">
                        {isExpanded ? (
                          <ChevronDown size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  {isExpanded && (
                    <div className="p-4 bg-ctp-surface0/10 animate-fade-in">
                      <div className="space-y-3">
                        {section.items.map((item) => {
                          const isCompleted = completedItems[item.id];
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleComplete(item.id)}
                              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                                isCompleted
                                  ? "bg-ctp-green/10 border border-ctp-green/30"
                                  : "bg-ctp-surface0/30 border border-ctp-surface1/30 hover:border-ctp-lavender/30"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {isCompleted ? (
                                  <CheckCircle
                                    className="text-ctp-green flex-shrink-0 mt-0.5"
                                    size={20}
                                  />
                                ) : (
                                  <Circle
                                    className="text-ctp-overlay0 flex-shrink-0 mt-0.5"
                                    size={20}
                                  />
                                )}
                                <div className="flex-1">
                                  <h3
                                    className={`font-medium text-sm mb-1 ${
                                      isCompleted
                                        ? "text-ctp-green line-through"
                                        : "text-ctp-text"
                                    }`}
                                  >
                                    {item.title}
                                  </h3>
                                  <p className="text-xs text-ctp-subtext0">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* DSA Mind Map Tab */}
        {activeTab === "dsa" && (
          <div className="space-y-6">
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-ctp-text">
                  {dsaMindmap.title}
                </h2>
                <Brain size={24} className="text-ctp-mauve" />
              </div>
              <p className="text-ctp-subtext0 text-sm">{dsaMindmap.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {dsaMindmap.sections.map((section, idx) => {
                const gradientClass = sectionColors[section.color] || "from-ctp-surface1/30 to-ctp-surface0/30 border-ctp-surface1/50";

                return (
                  <div
                    key={section.id}
                    className="glass-card-hover overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className={`bg-gradient-to-r ${gradientClass} py-3 px-4 border-b`}>
                      <h3 className="text-sm font-bold text-ctp-text">
                        {section.title}
                      </h3>
                    </div>
                    <div className="p-4 space-y-2">
                      {section.content.map((item, cidx) => (
                        <div
                          key={cidx}
                          className={`p-3 rounded-lg text-sm ${
                            item.type === "question"
                              ? "bg-ctp-blue/10 border-l-2 border-ctp-blue"
                              : item.type === "answer"
                              ? "bg-ctp-green/10 border-l-2 border-ctp-green ml-3"
                              : item.type === "use"
                              ? "bg-ctp-mauve/10 border-l-2 border-ctp-mauve"
                              : item.type === "note"
                              ? "bg-ctp-yellow/10 border-l-2 border-ctp-yellow"
                              : "bg-ctp-surface0/30 border-l-2 border-ctp-surface1"
                          }`}
                        >
                          <p
                            className={`text-xs ${
                              item.type === "question"
                                ? "font-semibold text-ctp-blue"
                                : item.type === "answer"
                                ? "text-ctp-green"
                                : item.type === "use"
                                ? "text-ctp-mauve"
                                : item.type === "note"
                                ? "text-ctp-yellow"
                                : "text-ctp-subtext0"
                            }`}
                          >
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewRoadmap;
