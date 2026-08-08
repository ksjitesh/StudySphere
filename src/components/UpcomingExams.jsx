import { CalendarDays, Clock3 } from "lucide-react";

function UpcomingExams() {
  return (
    <section className="mt-20">

      {/* Heading */}

      <div className="mb-8">

        <h2
          className="text-4xl font-extrabold transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Upcoming Exams
        </h2>

        <p
          className="mt-3 text-lg transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Never miss an important examination.
        </p>

      </div>

      {/* Card */}

      <div
        className="rounded-3xl border p-8 shadow-sm transition-colors duration-300"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >

        <div className="flex items-start gap-5">

          {/* Icon */}

          <div
            className="rounded-2xl p-4"
            style={{
              backgroundColor:
                "color-mix(in srgb, #C58B32 12%, transparent)",
            }}
          >

            <CalendarDays
              size={28}
              style={{ color: "#C58B32" }}
            />

          </div>

          {/* Content */}

          <div className="flex-1">

            <h3
              className="text-2xl font-bold transition-colors duration-300"
              style={{ color: "var(--text)" }}
            >
              No Upcoming Exams
            </h3>

            <p
              className="mt-3 leading-7 transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              Examination schedules published by the department
              will automatically appear here.
            </p>

            <div
              className="mt-6 flex items-center gap-2 text-sm transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >

              <Clock3 size={16} />

              <span>Updated automatically</span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default UpcomingExams;