import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://resume-analyzer-backend-project.onrender.com";

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API_URL}/dashboard`);

      // 🔥 HANDLE BACKEND ERROR RESPONSE
      if (!res.data || res.data.error) {
        throw new Error(res.data?.error || "No dashboard data found");
      }

      setData(res.data);
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* LOADING */}
        {loading && <p className="text-gray-400">Loading dashboard...</p>}

        {/* ERROR */}
        {error && (
          <p className="text-red-400 bg-red-500/10 p-4 rounded-xl">{error}</p>
        )}

        {/* NO DATA */}
        {!loading && !data && !error && (
          <p className="text-gray-400">No Data Found</p>
        )}

        {/* DATA CARDS */}
        {data && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* ATS SCORE */}
            <div className="bg-blue-500/20 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold">ATS Score</h2>

              <p className="text-5xl font-bold mt-3">
                {data.match_score || data.ats_score || 0}%
              </p>
            </div>

            {/* SKILLS */}
            <div className="bg-purple-500/20 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold">Skills</h2>

              <p className="mt-3 text-gray-200">
                {Array.isArray(data?.resume_skills) &&
                data.resume_skills.length > 0
                  ? data.resume_skills.join(", ")
                  : "No skills found"}
              </p>
            </div>

            {/* MISSING SKILLS */}
            <div className="bg-red-500/20 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold">Missing Skills</h2>

              <p className="mt-3 text-gray-200">
                {Array.isArray(data?.missing_skills) &&
                data.missing_skills.length > 0
                  ? data.missing_skills.join(", ")
                  : "No missing skills"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
