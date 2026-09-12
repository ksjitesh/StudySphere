import { useParams } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Eye,
  Download,
  ClipboardList,
} from "lucide-react";
import { useRef } from "react";

import assignmentsData from "../data/assignmentsData";

function ScrollCard({ children }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const y = useTransform(
    progress,
    [0, 0.5, 1],
    [55, 0, -35]
  );

  const rotateX = useTransform(
    progress,
    [0, 0.5, 1],
    [8, 0, -5]
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.94, 1, 0.97]
  );

  const opacity = useTransform(
    progress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0.9]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotateX,
        scale,
        opacity,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

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

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            rotateX: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          style={{
            transformPerspective: 1000,
          }}
        >
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
        </motion.div>

        {/* Assignments */}

        <div className="mt-8 space-y-6 sm:mt-12">

          {assignments.length === 0 ? (

            <ScrollCard>
              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.01,
                }}
                transition={{
                  duration: 0.25,
                }}
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
              </motion.div>
            </ScrollCard>

          ) : (

            assignments.map((assignment, index) => (

              <ScrollCard key={index}>
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.01,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
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

                      <motion.a
                        href={assignment.pdf}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
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
                          sm:w-auto
                        "
                        style={{
                          backgroundColor: "var(--primary)",
                        }}
                      >
                        <Eye size={18} />
                        View
                      </motion.a>

                      {/* Download */}

                      <motion.a
                        href={assignment.pdf}
                        download
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
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
                      </motion.a>

                    </div>

                  </div>

                </motion.div>
              </ScrollCard>

            ))

          )}

        </div>

      </div>
    </main>
  );
}

export default Assignments;