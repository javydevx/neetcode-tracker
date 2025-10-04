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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Rocket size={36} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Interview Mastery Roadmap
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Your complete guide from application to offer
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab("interview")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === "interview"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Interview Process
          </button>
          <button
            onClick={() => setActiveTab("dsa")}
            className={`flex-1 py-2 px-6 rounded-lg font-semibold transition-all ${
              activeTab === "dsa"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            DSA Mind Map
          </button>
        </div>

        {/* Interview Process Tab */}
        {activeTab === "interview" && (
          <div className="space-y-6">
            {interviewRoadmap.map((section, idx) => {
              const Icon = iconMap[section.icon];
              const progress = getProgress(section.id);
              const isExpanded = expandedSections[section.id];

              return (
                <div
                  key={section.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Section Header */}
                  <div
                    onClick={() => toggleSection(section.id)}
                    className={`${section.color} p-4 cursor-pointer hover:opacity-90 transition-opacity`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                          <Icon size={32} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            {idx + 1}. {section.title}
                          </h2>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="bg-white bg-opacity-30 rounded-full h-2 w-24">
                              <div
                                className="bg-white rounded-full h-2 transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-white text-xs font-semibold">
                              {progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown size={24} className="text-white" />
                      ) : (
                        <ChevronRight size={24} className="text-white" />
                      )}
                    </div>
                  </div>

                  {/* Section Content */}
                  {isExpanded && (
                    <div className="p-6 bg-gray-50">
                      <div className="grid gap-4">
                        {section.items.map((item) => {
                          const isCompleted = completedItems[item.id];
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleComplete(item.id)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                isCompleted
                                  ? "bg-green-50 border-green-500"
                                  : "bg-white border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {isCompleted ? (
                                  <CheckCircle
                                    className="text-green-500 flex-shrink-0 mt-1"
                                    size={24}
                                  />
                                ) : (
                                  <Circle
                                    className="text-gray-400 flex-shrink-0 mt-1"
                                    size={24}
                                  />
                                )}
                                <div className="flex-1">
                                  <h3
                                    className={`font-semibold mb-1 ${
                                      isCompleted
                                        ? "text-green-900 line-through"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {item.title}
                                  </h3>
                                  <p className="text-sm text-gray-600">
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
            <div className="bg-white rounded-lg shadow-lg py-4 px-6">
              <div className="flex items-center gap-3 mb-2">
                <Brain size={32} className="text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {dsaMindmap.title}
                </h2>
              </div>
              <p className="text-gray-600">{dsaMindmap.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {dsaMindmap.sections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className={`${section.color} py-3 px-4`}>
                    <h3 className="text-lg font-bold text-white">
                      {section.title}
                    </h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {section.content.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          item.type === "question"
                            ? "bg-blue-50 border-l-4 border-blue-500"
                            : item.type === "answer"
                            ? "bg-green-50 border-l-4 border-green-500 ml-4"
                            : item.type === "use"
                            ? "bg-purple-50 border-l-4 border-purple-500"
                            : item.type === "note"
                            ? "bg-yellow-50 border-l-4 border-yellow-500"
                            : "bg-gray-50 border-l-4 border-gray-300"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            item.type === "question"
                              ? "font-semibold text-blue-900"
                              : item.type === "answer"
                              ? "text-green-900"
                              : item.type === "use"
                              ? "text-purple-900"
                              : item.type === "note"
                              ? "text-yellow-900"
                              : "text-gray-700"
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewRoadmap;
