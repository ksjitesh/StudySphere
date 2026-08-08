import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function SyllabusCard({ semester, subjectCount }) {
  return (
    <Link
      to={`/syllabus/semester/${semester}`}
      className="
        group
        block
        rounded-3xl
        border
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Semester */}

      <p
        className="text-sm font-bold uppercase tracking-[0.25em]"
        style={{ color: "var(--primary)" }}
      >
        SEM {String(semester).padStart(2, "0")}
      </p>

      {/* Subject Count */}

      <h2
        className="mt-6 text-4xl font-extrabold transition-colors duration-300"
        style={{ color: "var(--text)" }}
      >
        {subjectCount}
      </h2>

      <p
        className="mt-2 transition-colors duration-300"
        style={{ color: "var(--text-secondary)" }}
      >
        Subjects
      </p>

      {/* Footer */}

      <div className="mt-10 flex items-center justify-between">

        <span
          className="font-semibold"
          style={{ color: "var(--primary)" }}
        >
          View Syllabus
        </span>

        <ArrowRight
          size={22}
          style={{ color: "var(--primary)" }}
          className="transition-transform duration-300 group-hover:translate-x-2"
        />

      </div>

    </Link>
  );
}

export default SyllabusCard;