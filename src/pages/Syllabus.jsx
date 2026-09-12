import { motion } from "framer-motion";

import SyllabusCard from "../components/SyllabusCard";
import syllabusData from "../data/syllabusData";

function Syllabus() {
  const semesters = Object.keys(syllabusData);

  return (
    <main
      className="min-h-screen overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
      }}
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
            style={{
              color: "var(--primary)",
            }}
          >
            Academic Curriculum
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
              text-4xl
              font-extrabold
              tracking-tight
              transition-colors
              duration-300
              sm:text-5xl
              lg:text-6xl
            "
            style={{
              color: "var(--text)",
            }}
          >
            BCA Syllabus
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
              mt-5
              max-w-2xl
              text-lg
              leading-8
              transition-colors
              duration-300
              sm:text-xl
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Choose your semester to view the official
            subject-wise syllabus.
          </motion.p>

        </motion.div>

        {/* Semester Grid */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-6
            sm:mt-16
            sm:gap-8
            md:grid-cols-2
          "
        >

          {semesters.map((semester, index) => (

            <motion.div
              key={semester}
              initial={{
                opacity: 0,
                y: 45,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.65,
                delay: 0.3 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SyllabusCard
                semester={semester}
                subjectCount={syllabusData[semester].length}
              />
            </motion.div>

          ))}

        </div>

      </div>
    </main>
  );
}

export default Syllabus;