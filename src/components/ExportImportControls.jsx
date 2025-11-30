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
    <div className="flex flex-wrap gap-2 fade-in">
      <button
        onClick={exportData}
        className="btn-action blue group"
      >
        <Download size={16} />
        <span className="hidden sm:inline">Export</span>
      </button>

      <label className="btn-action green cursor-pointer group">
        <Upload size={16} />
        <span className="hidden sm:inline">Import</span>
        <input
          type="file"
          accept=".json"
          onChange={importData}
          className="hidden"
        />
      </label>

      <button
        onClick={clearAllData}
        className="btn-action red group"
      >
        <Trash2 size={16} />
        <span className="hidden sm:inline">Clear</span>
      </button>
    </div>
  );
};

export default ExportImportControls;
