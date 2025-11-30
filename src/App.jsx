import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NeetCodeTracker, Patterns, InterviewRoadmap } from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<NeetCodeTracker />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/roadmap" element={<InterviewRoadmap />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
