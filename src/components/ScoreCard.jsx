function ScoreCard({ score }) {
  return (
    <div className="bg-linear-to-r from-blue-500/20 to-cyan-500/20 border border-white/10 p-8 rounded-3xl shadow-2xl hover:scale-[1.02] duration-300">
      <h2 className="text-3xl font-bold mb-6">ATS Score</h2>

      <div className="w-full bg-slate-700 h-6 rounded-full overflow-hidden">
        <div
          className="bg-linear-to-r from-green-400 to-blue-500 h-6 rounded-full"
          style={{ width: `${score || 0}%` }}
        ></div>
      </div>

      <p className="mt-6 text-6xl font-extrabold text-blue-300">
        {(score || 0).toFixed(2)}%
      </p>
    </div>
  );
}

export default ScoreCard;
