import { Link, useLocation } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const navLink = (path, name) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-xl font-medium hover:bg-blue-500/20 hover:text-blue-400 ${
        location.pathname === path ? "bg-blue-500 text-white" : "text-gray-300"
      }`}
    >
      {name}
    </Link>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <div className="flex items-center gap-3">
          <FaRobot className="text-3xl text-blue-400" />

          <h1 className="text-3xl font-extrabold tracking-wide">
            Resume
            <span className="text-blue-400">AI</span>
          </h1>
        </div>

        <div className="flex gap-3 text-sm md:text-base">
          {navLink("/", "Analyzer")}
          {navLink("/dashboard", "Dashboard")}
          {navLink("/jobs", "Jobs")}
          {navLink("/login", "Login")}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
