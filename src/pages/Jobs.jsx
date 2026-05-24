import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://resume-analyzer-backend-project.onrender.com";

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API_URL}/jobs`);

      setJobs(res.data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-8">AI Job Recommendations</h1>

        {/* LOADING */}
        {loading && <p className="text-gray-400">Loading jobs...</p>}

        {/* ERROR */}
        {error && (
          <p className="text-red-400 bg-red-500/10 p-4 rounded-xl">{error}</p>
        )}

        {/* EMPTY */}
        {!loading && jobs.length === 0 && !error && (
          <p className="text-gray-400">No jobs found</p>
        )}

        {/* JOB LIST */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white/10 p-6 rounded-3xl hover:scale-[1.02] transition"
            >
              <h2 className="text-2xl font-bold text-blue-400">
                {job.title || "Untitled Job"}
              </h2>

              <p className="mt-3 text-gray-300">
                Skills:{" "}
                {Array.isArray(job.skills)
                  ? job.skills.join(", ")
                  : job.skills || "Not specified"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
