import { useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

import {
  FaFileUpload,
  FaCopy,
  FaCheckCircle,
  FaBrain,
  FaLink,
  FaFileAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ScoreCard from "../components/ScoreCard";
import SkillTag from "../components/SkillTag";

function Analyzer() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [inputType, setInputType] = useState("text");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ FIXED BACKEND URL
  const API_URL = "https://resume-analyzer-backend-project.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please Upload Resume PDF");
      return;
    }

    if (inputType === "text" && !jobDescription) {
      alert("Paste Job Description");
      return;
    }

    if (inputType === "link" && !jobLink) {
      alert("Paste Job Link");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);
    formData.append("job_link", jobLink);

    try {
      setLoading(true);

      const res = await axios.post(`${API_URL}/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Backend Error");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!result) return;

    const text = `
ATS Score: ${result.match_score}%

Skill Score: ${result.skill_score}%

Text Score: ${result.text_score}%

Resume Skills:
${result.resume_skills.join(", ")}

Missing Skills:
${result.missing_skills.join(", ")}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10 md:py-16">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500/20 p-5 rounded-full border border-blue-500">
              <FaBrain className="text-5xl text-blue-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold">
            AI Resume <span className="text-blue-400">Analyzer</span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
            Upload your resume and compare it with job description using AI ATS
            analysis.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] p-8 space-y-8"
        >
          {/* FILE */}
          <div>
            <label className="block mb-4 text-2xl font-bold text-blue-300">
              Upload Resume PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && <p className="mt-3 text-green-400">{file.name}</p>}
          </div>

          {/* TOGGLE */}
          <div className="flex gap-4">
            <button type="button" onClick={() => setInputType("text")}>
              Job Description
            </button>

            <button type="button" onClick={() => setInputType("link")}>
              Job Link
            </button>
          </div>

          {/* INPUT */}
          {inputType === "text" ? (
            <textarea
              rows="8"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste Job Description"
              className="w-full p-4 bg-black/40"
            />
          ) : (
            <input
              type="text"
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              placeholder="Paste Job Link"
              className="w-full p-4 bg-black/40"
            />
          )}

          {/* SUBMIT */}
          <button type="submit" className="w-full bg-blue-500 py-4 rounded-2xl">
            Analyze Resume
          </button>
        </motion.form>

        {loading && <Loader />}

        {/* RESULT */}
        {result && (
          <div className="mt-10">
            <ScoreCard score={result.match_score} />

            <h2>Skill Score: {result.skill_score}%</h2>
            <h2>Text Score: {result.text_score}%</h2>

            <h3>Resume Skills</h3>
            {result.resume_skills.map((s, i) => (
              <SkillTag key={i} skill={s} />
            ))}

            <h3>Missing Skills</h3>
            {result.missing_skills.map((s, i) => (
              <span key={i}>{s}</span>
            ))}

            <button onClick={copyResult}>
              {copied ? "Copied" : "Copy Result"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analyzer;
