import { Bell } from "lucide-react";

function LatestNotice() {
  return (
    <section className="mt-20">

      {/* Heading */}

      <div className="mb-8">

        <h2
          className="text-4xl font-extrabold transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Latest Notice
        </h2>

        <p
          className="mt-3 text-lg transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Stay updated with important announcements.
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
                "color-mix(in srgb, var(--primary) 12%, transparent)",
            }}
          >

            <Bell
              size={28}
              style={{ color: "var(--primary)" }}
            />

          </div>

          {/* Content */}

          <div>

            <h3
              className="text-2xl font-bold transition-colors duration-300"
              style={{ color: "var(--text)" }}
            >
              No announcements yet
            </h3>

            <p
              className="mt-3 leading-7 transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              Important notices from the department will
              appear here automatically after they are
              published by the administrator.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default LatestNotice;