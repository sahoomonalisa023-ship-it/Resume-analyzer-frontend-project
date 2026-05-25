import Navbar from "../components/Navbar";

function Dashboard() {
  const data = JSON.parse(localStorage.getItem("ats_result"));

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {!data ? (
          <p className="text-gray-400">No analysis data found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* ATS SCORE */}

            <div className="bg-blue-500/20 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold">ATS Score</h2>

              <p className="text-5xl font-bold mt-3">
                {data.match_score || 0}%
              </p>
            </div>

            {/* RESUME SKILLS */}

            <div className="bg-purple-500/20 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold">Resume Skills</h2>

              <p className="mt-3 text-gray-200">
                {data.resume_skills && data.resume_skills.length > 0
                  ? data.resume_skills.join(", ")
                  : "No skills found"}
              </p>
            </div>

            {/* MISSING SKILLS */}

            <div className="bg-red-500/20 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold">Missing Skills</h2>

              <p className="mt-3 text-gray-200">
                {data.missing_skills && data.missing_skills.length > 0
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
