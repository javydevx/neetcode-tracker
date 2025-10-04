import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NeetCodeTracker, Patterns, InterviewRoadmap } from "./pages";
import { Navbar } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<NeetCodeTracker />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/roadmap" element={<InterviewRoadmap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
