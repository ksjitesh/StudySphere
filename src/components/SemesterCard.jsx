import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function SemesterCard({
  id,
  semester,
  subjects,
}) {
  return (
    <Link
      to={`/semester/${id}`}
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
        {semester}
      </p>

      {/* Subject Preview */}

      <div className="mt-8 space-y-4">

        {subjects.slice(0, 3).map((subject) => (
          <p
            key={subject}
            className="text-xl font-semibold transition-colors duration-300"
            style={{ color: "var(--text)" }}
          >
            {subject}
          </p>
        ))}

      </div>

      {/* Footer */}

      <div className="mt-10 flex items-center justify-between">

        <div>

          <p
            className="text-sm transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            {subjects.length} Subjects Available
          </p>

          <p
            className="mt-1 font-semibold"
            style={{ color: "var(--primary)" }}
          >
            Explore Semester
          </p>

        </div>

        <ArrowRight
          size={22}
          style={{ color: "var(--primary)" }}
          className="transition-transform duration-300 group-hover:translate-x-2"
        />

      </div>

    </Link>
  );
}

export default SemesterCard;