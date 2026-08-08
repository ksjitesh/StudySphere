import { useParams } from "react-router-dom";
import { Eye, Download } from "lucide-react";
import syllabusData from "../data/syllabusData";

function SubjectSyllabus() {
  const { semesterId, subjectSlug } = useParams();

  const subjects = syllabusData[semesterId] || [];

  const subject = subjects.find((item) => {
    const subjectName =
      typeof item === "string" ? item : item.subject;

    if (!subjectName) return false;

    const slug = subjectName
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[()]/g, "")
      .replace(/\s+/g, "-");

    return slug === subjectSlug;
  });

  if (!subject) {
    return (
      <main
        className="min-h-screen flex items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <h1 className="text-3xl font-bold text-red-500">
          Subject Not Found
        </h1>
      </main>
    );
  }

  const subjectName =
    typeof subject === "string"
      ? subject
      : subject.subject;

  const units =
    typeof subject === "string"
      ? []
      : subject.units || [];

  const pdf =
    typeof subject === "string"
      ? "#"
      : subject.pdf || "#";

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">

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
          {subjectName}
        </h1>

        <p
          className="mt-4 text-lg transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Official syllabus for this subject.
        </p>

        <div className="mt-12">

          {units.length === 0 ? (

            <div
              className="rounded-3xl border border-dashed p-10 transition-colors duration-300"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >

              <h2
                className="text-2xl font-bold transition-colors duration-300"
                style={{ color: "var(--text)" }}
              >
                Syllabus will be available soon
              </h2>

              <p
                className="mt-3 transition-colors duration-300"
                style={{ color: "var(--text-secondary)" }}
              >
                Units and official PDF will appear here after uploading.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {units.map((unit, index) => (

                <div
                  key={index}
                  className="rounded-2xl border p-6 transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >

                  <h2
                    className="text-xl font-bold transition-colors duration-300"
                    style={{ color: "var(--text)" }}
                  >
                    Unit {index + 1}
                  </h2>

                  <p
                    className="mt-2 transition-colors duration-300"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {unit}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        <div className="mt-10 flex gap-4">

          <a
            href={pdf}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl px-6 py-3 text-white transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <Eye size={18} />
            View PDF
          </a>

          <a
            href={pdf}
            download
            className="flex items-center gap-2 rounded-xl border px-6 py-3 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <Download size={18} />
            Download PDF
          </a>

        </div>

      </div>
    </main>
  );
}

export default SubjectSyllabus;