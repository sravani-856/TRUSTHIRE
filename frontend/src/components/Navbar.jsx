import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur md:px-12">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
          TH
        </div>

        <h1 className="text-2xl font-bold text-[#07183d]">
          Trust<span className="text-blue-600">Hire</span>
        </h1>
      </Link>

      <div className="hidden items-center gap-8 font-medium text-slate-600 lg:flex">
        <Link to="/">Home</Link>

        <Link to="/jobs" className="hover:text-blue-600">
          Find Jobs
        </Link>

        <Link to="/applications" className="hover:text-blue-600">
          Applications
        </Link>

        <Link to="/resume-upload" className="hover:text-blue-600">
          Resume
        </Link>
      </div>

      <Link
        to="/applications"
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        My Applications
      </Link>
    </nav>
  );
}

export default Navbar;