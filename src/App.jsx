import { Routes, Route } from "react-router-dom";
import Analyzer from "./pages/Analyzer";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Analyzer />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
