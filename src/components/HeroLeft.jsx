import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";

function HeroLeft() {
  return (
    <div className="max-w-xl">

      {/* Badge */}

      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 backdrop-blur-xl">

        <GraduationCap size={18} className="text-cyan-400" />

        <span className="text-cyan-300 font-medium">
          Built for MGKVP BCA Students
        </span>

      </div>

      {/* Heading */}

      <h1 className="mt-8 text-7xl font-black leading-tight">

        Study
        <span className="text-cyan-400">
          Sphere
        </span>

      </h1>

      <h2 className="mt-5 text-3xl font-bold text-slate-200">

        Your Complete BCA Learning Platform

      </h2>

      <p className="mt-7 text-lg leading-8 text-slate-400">

        Access Semester-wise Syllabus,
        Notes, Previous Year Question Papers,
        Assignments and Projects
        in one modern learning platform.

      </p>

      {/* Buttons */}

      <div className="mt-10 flex gap-5">

        <Link
          to="/syllabus"
          state={{ from: "home" }}
          className="flex items-center gap-3 rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-slate-900 transition hover:scale-105 hover:bg-cyan-300"
        >

          Start Studying

          <ArrowRight size={20} />

        </Link>

        <button className="rounded-2xl border border-slate-700 px-8 py-4 font-semibold transition hover:border-cyan-400 hover:text-cyan-400">

          Explore

        </button>

      </div>

      {/* Stats */}

      <div className="mt-14 flex gap-12">

        <div>

          <h2 className="text-5xl font-black text-cyan-400">
            6
          </h2>

          <p className="text-slate-400">
            Semesters
          </p>

        </div>

        <div>

          <h2 className="text-5xl font-black text-cyan-400">
            30+
          </h2>

          <p className="text-slate-400">
            Subjects
          </p>

        </div>

        <div>

          <h2 className="text-5xl font-black text-cyan-400">
            100+
          </h2>

          <p className="text-slate-400">
            Resources
          </p>

        </div>

      </div>

    </div>
  );
}

export default HeroLeft;