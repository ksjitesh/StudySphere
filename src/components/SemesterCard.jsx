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
        w-full
        min-w-0
        overflow-hidden
        rounded-3xl
        border
        p-5
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
        sm:p-6
        lg:p-8
      "
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Semester */}

      <p
        className="text-xs font-bold uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.25em]"
        style={{ color: "var(--primary)" }}
      >
        {semester}
      </p>

      {/* Subject Preview */}

      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4 lg:mt-8">
        {subjects.slice(0, 3).map((subject) => (
          <p
            key={subject}
            className="break-words text-base font-semibold leading-6 transition-colors duration-300 sm:text-lg lg:text-xl"
            style={{ color: "var(--text)" }}
          >
            {subject}
          </p>
        ))}
      </div>

      {/* Footer */}

      <div className="mt-7 flex min-w-0 items-center justify-between gap-4 sm:mt-8 lg:mt-10">
        <div className="min-w-0">
          <p
            className="text-xs transition-colors duration-300 sm:text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {subjects.length} Subjects Available
          </p>

          <p
            className="mt-1 text-sm font-semibold sm:text-base"
            style={{ color: "var(--primary)" }}
          >
            Explore Semester
          </p>
        </div>

        <ArrowRight
          size={20}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-2 sm:h-[22px] sm:w-[22px]"
          style={{ color: "var(--primary)" }}
        />
      </div>
    </Link>
  );
}

export default SemesterCard;