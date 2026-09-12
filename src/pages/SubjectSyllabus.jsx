import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useParams } from "react-router-dom";
import { Eye, Download } from "lucide-react";

import syllabusData from "../data/syllabusData";

function AnimatedUnit({ children, index }) {
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

  const y = useTransform(progress, [0, 0.5, 1], [45, 0, -25]);
  const rotateX = useTransform(progress, [0, 0.5, 1], [6, 0, -3]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const opacity = useTransform(
    progress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.92]
  );

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
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
        className="flex min-h-screen items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-red-500"
        >
          Subject Not Found
        </motion.h1>
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
      className="min-h-screen overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <motion.p
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="
              text-sm
              font-bold
              uppercase
              tracking-[0.25em]
            "
            style={{ color: "var(--primary)" }}
          >
            Semester {semesterId}
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="
              mt-3
              break-words
              text-4xl
              font-extrabold
              leading-tight
              transition-colors
              duration-300
              sm:text-5xl
            "
            style={{ color: "var(--text)" }}
          >
            {subjectName}
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            className="
              mt-4
              text-lg
              transition-colors
              duration-300
            "
            style={{ color: "var(--text-secondary)" }}
          >
            Official syllabus for this subject.
          </motion.p>
        </motion.div>

        {/* Units */}

        <div className="mt-12">

          {units.length === 0 ? (

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="
                rounded-3xl
                border
                border-dashed
                p-10
                transition-colors
                duration-300
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <h2
                className="
                  text-2xl
                  font-bold
                  transition-colors
                  duration-300
                "
                style={{ color: "var(--text)" }}
              >
                Syllabus will be available soon
              </h2>

              <p
                className="
                  mt-3
                  transition-colors
                  duration-300
                "
                style={{ color: "var(--text-secondary)" }}
              >
                Units and official PDF will appear here after
                uploading.
              </p>
            </motion.div>

          ) : (

            <div className="space-y-5">

              {units.map((unit, index) => (

                <AnimatedUnit
                  key={index}
                  index={index}
                >
                  <motion.div
                    whileHover={{
                      y: -5,
                      scale: 1.01,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      p-6
                      transition-all
                      duration-500
                      hover:shadow-xl
                    "
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                    }}
                  >

                    {/* Hover Highlight */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-32
                        w-32
                        rounded-full
                        opacity-0
                        blur-3xl
                        transition-opacity
                        duration-500
                        group-hover:opacity-20
                      "
                      style={{
                        backgroundColor: "var(--primary)",
                      }}
                    />

                    <h2
                      className="
                        relative
                        text-xl
                        font-bold
                        transition-colors
                        duration-300
                      "
                      style={{ color: "var(--text)" }}
                    >
                      Unit {index + 1}
                    </h2>

                    <p
                      className="
                        relative
                        mt-2
                        leading-7
                        transition-colors
                        duration-300
                      "
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      {unit}
                    </p>

                  </motion.div>
                </AnimatedUnit>

              ))}

            </div>

          )}

        </div>

        {/* PDF Actions */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.45,
          }}
          className="
            mt-10
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:gap-4
          "
        >

          <motion.a
            href={pdf}
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-6
              py-3
              text-white
              transition-all
              duration-300
            "
            style={{
              backgroundColor: "var(--primary)",
            }}
          >
            <Eye size={18} />
            View PDF
          </motion.a>

          <motion.a
            href={pdf}
            download
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              px-6
              py-3
              transition-all
              duration-300
            "
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <Download size={18} />
            Download PDF
          </motion.a>

        </motion.div>

      </div>
    </main>
  );
}

export default SubjectSyllabus;