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

      const res = await axios.post("http://127.0.0.1:5000/analyze", formData, {
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

    setTimeout(() => {
      setCopied(false);
    }, 2000);
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

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            AI Resume
            <span className="text-blue-400"> Analyzer</span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg max-w-3xl mx-auto leading-8">
            Upload your resume and compare it with any job description or job
            link using AI powered ATS analysis.
          </p>
        </motion.div>

        {/* FORM */}

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] p-8 md:p-10 shadow-2xl space-y-8"
        >
          {/* FILE */}

          <div>
            <label className="block mb-4 text-2xl font-bold text-blue-300">
              Upload Resume PDF
            </label>

            <div className="border-2 border-dashed border-blue-500 rounded-3xl p-10 text-center bg-black/30 hover:bg-black/40 cursor-pointer duration-300">
              <FaFileUpload className="mx-auto text-6xl text-blue-400 mb-5" />

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-gray-300"
              />

              {file && (
                <p className="mt-5 text-green-400 font-bold text-lg">
                  {file.name}
                </p>
              )}
            </div>
          </div>

          {/* TOGGLE BUTTONS */}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setInputType("text")}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold ${
                inputType === "text" ? "bg-blue-500" : "bg-white/10"
              }`}
            >
              <FaFileAlt />
              Job Description
            </button>

            <button
              type="button"
              onClick={() => setInputType("link")}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold ${
                inputType === "link" ? "bg-green-500" : "bg-white/10"
              }`}
            >
              <FaLink />
              Job Link
            </button>
          </div>

          {/* INPUT */}

          {inputType === "text" ? (
            <textarea
              rows="10"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste Job Description Here..."
              className="w-full p-6 bg-black/40 border border-white/10 rounded-3xl outline-none focus:border-blue-500 text-gray-300 text-lg"
            />
          ) : (
            <input
              type="text"
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              placeholder="Paste Naukri / LinkedIn Job URL"
              className="w-full p-6 bg-black/40 border border-white/10 rounded-3xl outline-none focus:border-green-500 text-gray-300 text-lg"
            />
          )}

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-5 rounded-3xl text-xl font-bold hover:scale-[1.02] duration-300 shadow-lg"
          >
            Analyze Resume
          </button>
        </motion.form>

        {loading && <Loader />}

        {/* RESULT */}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 space-y-8"
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-4xl md:text-5xl font-extrabold">
                Analysis Result
              </h2>

              <button
                onClick={copyResult}
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 px-7 py-4 rounded-2xl font-bold text-lg duration-300"
              >
                {copied ? (
                  <>
                    <FaCheckCircle />
                    Copied
                  </>
                ) : (
                  <>
                    <FaCopy />
                    Copy Result
                  </>
                )}
              </button>
            </div>

            <ScoreCard score={result?.match_score} />

            {/* EXTRA SCORE */}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-5 text-green-400">
                  Skill Score
                </h3>

                <p className="text-6xl font-extrabold">
                  {result?.skill_score?.toFixed(2)}%
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-5 text-cyan-400">
                  Text Score
                </h3>

                <p className="text-6xl font-extrabold">
                  {result?.text_score?.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* SKILLS */}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h2 className="text-3xl font-bold mb-6 text-blue-400">
                  Resume Skills
                </h2>

                <div className="flex flex-wrap gap-3">
                  {result?.resume_skills?.map((skill, index) => (
                    <SkillTag key={index} skill={skill} />
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h2 className="text-3xl font-bold mb-6 text-red-400">
                  Missing Skills
                </h2>

                <div className="flex flex-wrap gap-3">
                  {result?.missing_skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 bg-red-500/20 border border-red-500 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Analyzer;
