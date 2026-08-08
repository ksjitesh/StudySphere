import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import syllabusData from "../data/syllabusdata";

function Semester() {
  const { semesterId } = useParams();

  const subjects = syllabusData[semesterId] || [];

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">

        {/* Heading */}

        <p
          className="text-xs font-bold uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.25em]"
          style={{ color: "var(--primary)" }}
        >
          Semester {semesterId}
        </p>

        <h1
          className="mt-3 break-words text-4xl font-extrabold leading-tight transition-colors duration-300 sm:text-5xl"
          style={{ color: "var(--text)" }}
        >
          Subject Syllabus
        </h1>

        <p
          className="mt-3 max-w-2xl text-base leading-7 transition-colors duration-300 sm:mt-4 sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Select a subject to view the complete syllabus.
        </p>

        {/* Subject List */}

        <div className="mt-8 w-full space-y-4 sm:mt-10 sm:space-y-5">

          {subjects.length === 0 ? (

            <div
              className="w-full rounded-2xl border p-6 transition-colors duration-300 sm:p-8"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <h2 className="text-xl font-bold text-red-500 sm:text-2xl">
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
                    w-full
                    min-w-0
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                    sm:p-6
                  "
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="min-w-0">
                    <h2
                      className="break-words text-base font-bold leading-6 transition-colors duration-300 sm:text-xl sm:leading-7"
                      style={{ color: "var(--text)" }}
                    >
                      {subjectName}
                    </h2>

                    <p
                      className="mt-1.5 text-sm transition-colors duration-300 sm:mt-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      View Complete Syllabus
                    </p>
                  </div>

                  <ArrowRight
                    size={20}
                    style={{ color: "var(--primary)" }}
                    className="
                      shrink-0
                      transition-transform
                      duration-300
                      group-hover:translate-x-2
                      sm:h-[22px]
                      sm:w-[22px]
                    "
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