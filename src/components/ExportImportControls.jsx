import { Download, Upload, Trash2 } from "lucide-react";

const ExportImportControls = ({ progress, setProgress }) => {
  const exportData = () => {
    const dataStr = JSON.stringify(progress, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `neetcode-progress-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
  };

  const importData = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          setProgress(imported);
          alert("Progress imported successfully!");
        } catch {
          alert("Error importing file. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all progress?")) {
      setProgress({});
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={exportData}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded transition-colors"
      >
        <Download size={16} /> Export Progress
      </button>
      <label className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded transition-colors cursor-pointer">
        <Upload size={16} /> Import Progress
        <input
          type="file"
          accept=".json"
          onChange={importData}
          className="hidden"
        />
      </label>
      <button
        onClick={clearAllData}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded transition-colors"
      >
        <Trash2 size={16} /> Clear All
      </button>
    </div>
  );
};

export default ExportImportControls;
