import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/jobs");

      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-8">Recommended Jobs</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-3xl">
              <h2 className="text-2xl font-bold">{job.title}</h2>

              <p className="mt-3">Skills: {job.skills}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
