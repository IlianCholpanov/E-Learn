import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LearningsPage from "./pages/LearningsPage";
import { CoursesProvider } from "./context/ContextProvider";

export default function LearningDashboard() {
  return (
    <CoursesProvider>
      <div className="min-h-screen bg-background">
        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learning" element={<LearningsPage />} />
        </Routes>
      </div>
    </CoursesProvider>
  );
}
