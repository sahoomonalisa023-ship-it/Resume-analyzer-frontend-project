import React, { useState } from "react";
import { FaFileAlt, FaLink, FaCloudUploadAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import ScoreCard from "../components/ScoreCard";
import SkillTag from "../components/SkillTag";

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [inputType, setInputType] = useState("text");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "https://resume-analyzer-backend-project.onrender.com";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload your resume PDF first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_description", jobDescription);
      formData.append("job_link", jobLink);

      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Backend error");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-blue-400">
            Upload Resume PDF
          </h1>

          <form onSubmit={handleAnalyze} className="space-y-6">
            {/* FILE UPLOAD */}
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <FaCloudUploadAlt className="text-5xl text-blue-400 mx-auto" />

              <p className="mt-4 text-gray-300">
                {file ? file.name : "Click to upload your resume PDF"}
              </p>
            </div>

            {/* TOGGLE */}
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => setInputType("text")}
                className={`px-6 py-3 rounded-xl font-semibold ${
                  inputType === "text"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-gray-300"
                }`}
              >
                <FaFileAlt /> Job Description
              </button>

              <button
                type="button"
                onClick={() => setInputType("link")}
                className={`px-6 py-3 rounded-xl font-semibold ${
                  inputType === "link"
                    ? "bg-green-500 text-white"
                    : "bg-white/10 text-gray-300"
                }`}
              >
                <FaLink /> Job Link
              </button>
            </div>

            {/* INPUT */}
            {inputType === "text" ? (
              <textarea
                rows="5"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Job Description"
                className="w-full p-4 bg-black/40 rounded-xl"
              />
            ) : (
              <input
                type="text"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                placeholder="Paste Job Link"
                className="w-full p-4 bg-black/40 rounded-xl"
              />
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-4 rounded-xl font-bold text-white"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </form>

          {/* ERROR */}
          {error && <p className="text-red-400 text-center">{error}</p>}

          {/* RESULT */}
          {result && (
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <ScoreCard score={result.match_score || result.ats_score} />

              <div className="bg-white/5 p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-3 text-green-400">
                  Matched Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {(result.resume_skills || result.matched_skills || []).map(
                    (skill, i) => (
                      <SkillTag key={i} skill={skill} />
                    ),
                  )}
                </div>

                <p className="mt-4 text-gray-400 text-sm">
                  {result.message || ""}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
