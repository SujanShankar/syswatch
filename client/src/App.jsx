import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import LogAnalyzer from "./pages/LogAnalyzer";
import Alerts from "./pages/Alerts";
import History from "./pages/History";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logs" element={<LogAnalyzer />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;