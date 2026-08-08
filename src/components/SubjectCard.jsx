import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function SubjectCard({
  semesterId,
  subject,
}) {
  const subjectSlug = subject
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-");

  return (
    <Link
      to={`/semester/${semesterId}/subject/${subjectSlug}`}
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
      {/* Subject Name */}

      <h2
        className="text-2xl font-bold transition-colors duration-300"
        style={{ color: "var(--text)" }}
      >
        {subject}
      </h2>

      {/* Description */}

      <p
        className="mt-3 leading-7 transition-colors duration-300"
        style={{ color: "var(--text-secondary)" }}
      >
        Open notes, PYQs, assignments and projects for this subject.
      </p>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between">

        <span
          className="font-semibold"
          style={{ color: "var(--primary)" }}
        >
          Open Resources
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

export default SubjectCard;