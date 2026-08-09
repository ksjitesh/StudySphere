import { useParams } from "react-router-dom";
import {
  Eye,
  Download,
  ClipboardList,
} from "lucide-react";
import assignmentsData from "../data/assignmentsData";

function Assignments() {
  const { semesterId, subjectSlug } = useParams();

  const assignments =
    assignmentsData?.[semesterId]?.[subjectSlug] || [];

  const subjectName = subjectSlug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-8 lg:px-10 lg:py-12">

        {/* Header */}

        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{
            color: "var(--primary)",
          }}
        >
          Semester {semesterId}
        </p>

        <h1
          className="
            mt-3
            break-words
            text-3xl
            font-extrabold
            leading-tight
            transition-colors
            duration-300
            sm:text-5xl
          "
          style={{
            color: "var(--text)",
          }}
        >
          {subjectName}
        </h1>

        <p
          className="
            mt-3
            text-base
            transition-colors
            duration-300
            sm:text-lg
          "
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Assignments
        </p>

        {/* Assignments */}

        <div className="mt-8 space-y-6 sm:mt-12">

          {assignments.length === 0 ? (

            <div
              className="
                rounded-3xl
                border
                border-dashed
                p-8
                text-center
                transition-colors
                duration-300
                sm:p-10
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >

              <ClipboardList
                size={50}
                className="mx-auto"
                style={{
                  color: "var(--text-secondary)",
                }}
              />

              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                  transition-colors
                  duration-300
                  sm:text-2xl
                "
                style={{
                  color: "var(--text)",
                }}
              >
                No Assignments Available Yet
              </h2>

              <p
                className="mt-2 transition-colors duration-300"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Assignments will be uploaded soon.
              </p>

            </div>

          ) : (

            assignments.map((assignment, index) => (

              <div
                key={index}
                className="
                  w-full
                  min-w-0
                  rounded-3xl
                  border
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:shadow-lg
                  sm:p-6
                "
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >

                <div
                  className="
                    flex
                    min-w-0
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  {/* Assignment Information */}

                  <div className="min-w-0">

                    <h2
                      className="
                        break-words
                        text-xl
                        font-bold
                        leading-7
                        transition-colors
                        duration-300
                        sm:text-2xl
                      "
                      style={{
                        color: "var(--text)",
                      }}
                    >
                      {assignment.title}
                    </h2>

                    <p
                      className="
                        mt-2
                        text-sm
                        transition-colors
                        duration-300
                      "
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      Assignment PDF
                    </p>

                  </div>

                  {/* Action Buttons */}

                  <div
                    className="
                      flex
                      w-full
                      min-w-0
                      flex-col
                      gap-3
                      sm:w-auto
                      sm:flex-row
                    "
                  >

                    {/* View */}

                    <a
                      href={assignment.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-5
                        py-3
                        text-center
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:scale-105
                        sm:w-auto
                      "
                      style={{
                        backgroundColor: "var(--primary)",
                      }}
                    >
                      <Eye size={18} />
                      View
                    </a>

                    {/* Download */}

                    <a
                      href={assignment.pdf}
                      download
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        px-5
                        py-3
                        text-center
                        text-sm
                        font-semibold
                        transition-all
                        duration-300
                        hover:scale-105
                        sm:w-auto
                      "
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <Download size={18} />
                      Download
                    </a>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    </main>
  );
}

export default Assignments;