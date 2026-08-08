import { useParams } from "react-router-dom";
import { Eye, Download, FolderKanban } from "lucide-react";
import projectsData from "../data/projectsData";

function Projects() {
  const { semesterId, subjectSlug } = useParams();

  const projects =
    projectsData?.[semesterId]?.[subjectSlug] || [];

  const subjectName = subjectSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}

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
          className="mt-3 text-lg transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Projects
        </p>

        {/* Projects */}

        <div className="mt-12 space-y-6">

          {projects.length === 0 ? (

            <div
              className="rounded-3xl border border-dashed p-10 text-center transition-colors duration-300"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >

              <FolderKanban
                size={50}
                className="mx-auto"
                style={{ color: "var(--text-secondary)" }}
              />

              <h2
                className="mt-5 text-2xl font-bold transition-colors duration-300"
                style={{ color: "var(--text)" }}
              >
                No Projects Available Yet
              </h2>

              <p
                className="mt-2 transition-colors duration-300"
                style={{ color: "var(--text-secondary)" }}
              >
                Projects will be uploaded soon.
              </p>

            </div>

          ) : (

            projects.map((project, index) => (

              <div
                key={index}
                className="rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2
                      className="text-2xl font-bold transition-colors duration-300"
                      style={{ color: "var(--text)" }}
                    >
                      {project.title}
                    </h2>

                    <p
                      className="mt-2 transition-colors duration-300"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Project Resource
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <a
                      href={project.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl px-5 py-3 text-white transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: "var(--primary)",
                      }}
                    >
                      <Eye size={18} />
                      View
                    </a>

                    <a
                      href={project.pdf}
                      download
                      className="flex items-center gap-2 rounded-xl border px-5 py-3 transition-all duration-300 hover:scale-105"
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

export default Projects;