import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NeetCodeTracker, Patterns, InterviewRoadmap } from "./pages";
import { Navbar } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <Routes>
          <Route path="/" element={<NeetCodeTracker />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/roadmap" element={<InterviewRoadmap />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
