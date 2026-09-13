import { useParams } from "react-router-dom";
import {
  Eye,
  Download,
  FolderKanban,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import projectsData from "../data/projectsData";

function Projects() {
  const { semesterId, subjectSlug } = useParams();

  const projects =
    projectsData?.[semesterId]?.[subjectSlug] || [];

  const subjectName = subjectSlug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  return (
    <main
      className="relative min-h-screen overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--primary)" }}
      />

      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:px-8 lg:px-10 lg:py-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="h-px w-10"
              style={{ backgroundColor: "var(--primary)" }}
            />

            <p
              className="text-xs font-bold uppercase tracking-[0.28em] sm:text-sm"
              style={{ color: "var(--primary)" }}
            >
              Semester {semesterId}
            </p>
          </div>

          <div className="mt-4 flex items-end justify-between gap-6">
            <div className="min-w-0">
              <h1
                className="break-words text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: "var(--text)" }}
              >
                {subjectName}
              </h1>

              <p
                className="mt-3 text-base sm:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                Projects
              </p>
            </div>

            {/* Project Count */}
            <div
              className="hidden shrink-0 rounded-2xl border px-5 py-3 text-right sm:block"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <p
                className="text-2xl font-black"
                style={{ color: "var(--text)" }}
              >
                {projects.length}
              </p>

              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                Projects
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="mt-8 h-px origin-left"
          style={{ backgroundColor: "var(--border)" }}
        />

        {/* Projects */}
        <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">

          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-dashed p-8 text-center sm:p-12"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <FolderKanban
                size={52}
                strokeWidth={1.5}
                className="mx-auto"
                style={{ color: "var(--text-secondary)" }}
              />

              <h2
                className="mt-5 text-xl font-bold sm:text-2xl"
                style={{ color: "var(--text)" }}
              >
                No Projects Available Yet
              </h2>

              <p
                className="mt-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Projects will be uploaded soon.
              </p>
            </motion.div>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group w-full rounded-3xl border p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-6"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  {/* Project Info */}
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--primary) 12%, transparent)",
                        color: "var(--primary)",
                      }}
                    >
                      <FolderKanban size={22} />
                    </div>

                    <div className="min-w-0">
                      <h2
                        className="break-words text-lg font-bold leading-7 sm:text-xl"
                        style={{ color: "var(--text)" }}
                      >
                        {project.title}
                      </h2>

                      <p
                        className="mt-1 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Project Resource
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

                    {/* View */}
                    <a
                      href={project.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/button flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] sm:w-auto"
                      style={{
                        backgroundColor: "var(--primary)",
                        cursor: "pointer",
                      }}
                    >
                      <Eye size={18} />

                      <span>View</span>

                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-200 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                      />
                    </a>

                    {/* Download */}
                    <a
                      href={project.pdf}
                      download
                      className="flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] sm:w-auto"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                        cursor: "pointer",
                      }}
                    >
                      <Download size={18} />
                      <span>Download</span>
                    </a>

                  </div>
                </div>
              </motion.div>
            ))
          )}

        </div>
      </div>
    </main>
  );
}

export default Projects;