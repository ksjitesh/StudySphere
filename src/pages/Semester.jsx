import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import syllabusData from "../data/syllabusData";

function Semester() {
  const { semesterId } = useParams();

  const subjects = syllabusData[semesterId] || [];

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Heading */}

        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: "var(--primary)" }}
        >
          Semester {semesterId}
        </p>

        <h1
          className="mt-3 text-5xl font-extrabold transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Subject Syllabus
        </h1>

        <p
          className="mt-4 text-lg transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Select a subject to view the complete syllabus.
        </p>

        {/* Subject List */}

        <div className="mt-12 space-y-5">

          {subjects.length === 0 ? (

            <div
              className="rounded-2xl border p-8 transition-colors duration-300"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <h2 className="text-2xl font-bold text-red-500">
                No subjects found.
              </h2>
            </div>

          ) : (

            subjects.map((item, index) => {

              const subjectName =
                typeof item === "string" ? item : item.subject;

              const slug = subjectName
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/[()]/g, "")
                .replace(/\s+/g, "-");

              return (

                <Link
                  key={index}
                  to={`/syllabus/semester/${semesterId}/${slug}`}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >

                  <div>

                    <h2
                      className="text-xl font-bold transition-colors duration-300"
                      style={{ color: "var(--text)" }}
                    >
                      {subjectName}
                    </h2>

                    <p
                      className="mt-2 transition-colors duration-300"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      View Complete Syllabus
                    </p>

                  </div>

                  <ArrowRight
                    size={22}
                    style={{ color: "var(--primary)" }}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />

                </Link>

              );
            })

          )}

        </div>

      </div>
    </main>
  );
}

export default Semester;