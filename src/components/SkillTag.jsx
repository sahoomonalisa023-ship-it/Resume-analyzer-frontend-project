function SkillTag({ skill }) {
  return (
    <span className="px-4 py-2 bg-blue-500/20 border border-blue-400 rounded-full text-sm hover:scale-105 hover:bg-blue-500/40">
      {skill}
    </span>
  );
}

export default SkillTag;
