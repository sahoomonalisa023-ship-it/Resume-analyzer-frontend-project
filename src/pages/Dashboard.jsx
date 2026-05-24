import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/dashboard");

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {!data ? (
          <p>No Data Found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-500/20 p-6 rounded-3xl">
              <h2>ATS Score</h2>

              <p className="text-5xl font-bold mt-3">{data.match_score}%</p>
            </div>

            <div className="bg-purple-500/20 p-6 rounded-3xl">
              <h2>Skills</h2>

              <p className="mt-3">{data.resume_skills.join(", ")}</p>
            </div>

            <div className="bg-red-500/20 p-6 rounded-3xl">
              <h2>Missing Skills</h2>

              <p className="mt-3">{data.missing_skills.join(", ")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
