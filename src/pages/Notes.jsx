import { useParams } from "react-router-dom";
import { Eye, Download, FileText } from "lucide-react";
import notesData from "../data/notesData";

function Notes() {
  const { semesterId, subjectSlug } = useParams();

  const notes =
    notesData?.[semesterId]?.[subjectSlug] || [];

  console.log("SEMESTER:", semesterId);
  console.log("SUBJECT:", subjectSlug);
  console.log("NOTES:", notes);

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
          Study Notes
        </p>

        {/* Notes */}

        <div className="mt-8 space-y-6 sm:mt-12">

          {notes.length === 0 ? (

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

              <FileText
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
                No Notes Available Yet
              </h2>

              <p
                className="mt-2 transition-colors duration-300"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Notes will be uploaded soon.
              </p>

            </div>

          ) : (

            notes.map((note, index) => (

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

                  {/* Note Information */}

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
                      {note.title}
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
                      PDF Notes
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

                    {/* Open Note */}

                    <a
                      href={note.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
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
                      Open
                    </a>

                    {/* Download */}

                    <a
                      href={note.pdf}
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

export default Notes;