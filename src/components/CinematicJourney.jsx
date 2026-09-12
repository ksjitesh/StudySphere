import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Layers3,
} from "lucide-react";
import { useRef } from "react";

import semesterData from "../data/semesterData";

/* =========================================================
   SLUG
========================================================= */

function makeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* =========================================================
   SUBJECT NAME
========================================================= */

function getSubjectName(subject) {
  if (typeof subject === "string") {
    return subject;
  }

  return (
    subject?.name ??
    subject?.title ??
    subject?.subjectName ??
    ""
  );
}

/* =========================================================
   SUBJECT
========================================================= */

function Subject({ subject, index, semesterId }) {
  const name = getSubjectName(subject);

  const slug =
    typeof subject === "string"
      ? makeSlug(subject)
      : subject?.slug ?? makeSlug(name);

  return (
    <Link
      to={`/semester/${semesterId}/subject/${slug}`}
      className="
        group
        flex
        items-center
        gap-4
        border-b
        py-3.5
        transition-all
        duration-300
        hover:pl-2
      "
      style={{
        borderColor:
          "color-mix(in srgb, var(--border) 70%, transparent)",
      }}
    >
      <span
        className="
          w-6
          shrink-0
          text-[10px]
          font-semibold
          tracking-[0.18em]
          opacity-40
        "
        style={{ color: "var(--text)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className="
          flex-1
          text-sm
          font-medium
          leading-6
          sm:text-[15px]
        "
        style={{ color: "var(--text)" }}
      >
        {name}
      </span>

      <span
        className="
          hidden
          text-[8px]
          font-medium
          uppercase
          tracking-[0.2em]
          opacity-30
          sm:block
        "
        style={{ color: "var(--text-secondary)" }}
      >
        Subject
      </span>

      <ArrowUpRight
        size={16}
        className="
          shrink-0
          opacity-25
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:-translate-y-1
          group-hover:opacity-100
        "
        style={{ color: "var(--primary)" }}
      />
    </Link>
  );
}

/* =========================================================
   SEMESTER
========================================================= */

function SemesterSection({ semester, index }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.4,
  });

  const numberY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [70, 0, -70]
  );

  const numberScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.78, 1, 0.78]
  );

  const numberOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [0, 1, 1, 1, 0]
  );

  const contentY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [55, 0, -40]
  );

  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.5, 0.88, 1],
    [0, 1, 1, 1, 0]
  );

  const contentScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.97, 1, 0.98]
  );

  const lineScale = useTransform(
    smoothProgress,
    [0.12, 0.5, 0.88],
    [0, 1, 0]
  );

  const semesterId =
    semester?.id ??
    semester?.semesterId ??
    index + 1;

  const subjects =
    semester?.subjects ??
    semester?.subjectList ??
    semester?.courses ??
    [];

  return (
    <section
      ref={ref}
      className="
        relative
        flex
        min-h-[78vh]
        items-center
        overflow-hidden
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:min-h-[82vh]
        lg:px-12
        xl:px-20
      "
    >
      {/* BACKGROUND NUMBER */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          select-none
          text-[36vw]
          font-black
          leading-none
          tracking-[-0.09em]
        "
        style={{
          y: numberY,
          scale: numberScale,
          opacity: numberOpacity,
          color:
            "color-mix(in srgb, var(--primary) 4%, transparent)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.028]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              var(--text) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              var(--text) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[0.75fr_1.25fr]
            lg:gap-16
          "
        >
          {/* LEFT */}

          <motion.div
            style={{
              y: numberY,
              opacity: numberOpacity,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                }}
              />

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                "
                style={{
                  color: "var(--primary)",
                }}
              >
                StudySphere
              </p>
            </div>

            <div className="mt-4 overflow-hidden">
              <motion.h2
                className="
                  text-[clamp(5rem,12vw,10rem)]
                  font-bold
                  leading-[0.78]
                  tracking-[-0.09em]
                "
                style={{
                  color: "var(--text)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.h2>
            </div>

            <p
              className="
                mt-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
              "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Semester
            </p>

            <motion.div
              className="
                mt-5
                h-px
                w-20
                origin-left
              "
              style={{
                scaleX: lineScale,
                backgroundColor: "var(--primary)",
              }}
            />

            <div className="mt-5 flex items-center gap-4">
              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                "
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                BCA
              </span>

              <span
                className="h-1 w-1 rounded-full opacity-30"
                style={{
                  backgroundColor: "var(--text)",
                }}
              />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                "
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {subjects.length} Subjects
              </span>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            style={{
              y: contentY,
              opacity: contentOpacity,
              scale: contentScale,
            }}
          >
            <div className="mb-6 flex items-end justify-between gap-5">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="h-px w-6"
                    style={{
                      backgroundColor: "var(--primary)",
                    }}
                  />

                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                    "
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    BCA Curriculum
                  </p>
                </div>

                <h3
                  className="
                    max-w-xl
                    text-3xl
                    font-semibold
                    leading-tight
                    tracking-[-0.05em]
                    sm:text-4xl
                    lg:text-5xl
                  "
                  style={{
                    color: "var(--text)",
                  }}
                >
                  Semester {String(index + 1).padStart(2, "0")}
                </h3>
              </div>

              <div className="text-right">
                <p
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                  "
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {subjects.length} Subjects
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-semibold
                    tracking-[0.2em]
                  "
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")} / 06
                </p>
              </div>
            </div>

            <div
              className="mb-1 h-px w-full"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--border) 75%, transparent)",
              }}
            />

            <div>
              {subjects.map((subject, subjectIndex) => (
                <Subject
                  key={`${semesterId}-${subjectIndex}`}
                  subject={subject}
                  index={subjectIndex}
                  semesterId={semesterId}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-5">
              <p
                className="
                  hidden
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  opacity-50
                  sm:block
                "
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Select a subject to continue
              </p>

              <Link
                to={`/semester/${semesterId}`}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                "
                style={{
                  color: "var(--text)",
                }}
              >
                Explore Semester

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                  "
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <ArrowUpRight
                    size={13}
                    style={{
                      color: "var(--primary)",
                    }}
                  />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SIDE INDICATOR */}

      <div
        className="
          pointer-events-none
          absolute
          right-6
          top-1/2
          hidden
          -translate-y-1/2
          md:block
        "
      >
        <div
          className="h-16 w-px"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--text) 12%, transparent)",
          }}
        />

        <div
          className="
            mt-3
            text-[8px]
            font-semibold
            tracking-[0.25em]
          "
          style={{
            color: "var(--text-secondary)",
            writingMode: "vertical-rl",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INTRO
========================================================= */

function IntroSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.4,
  });

  const ghostY = useTransform(progress, [0, 1], [0, 180]);
  const ghostRotate = useTransform(progress, [0, 1], [0, 12]);
  const glowY = useTransform(progress, [0, 1], [0, 80]);

  const contentY = useTransform(progress, [0, 0.72], [0, -85]);
  const contentScale = useTransform(progress, [0, 0.72], [1, 0.88]);
  const contentOpacity = useTransform(
    progress,
    [0, 0.58, 0.82],
    [1, 1, 0]
  );
  const contentRotateX = useTransform(progress, [0, 0.72], [0, -14]);
  const contentBlur = useTransform(
    progress,
    [0, 0.72],
    ["blur(0px)", "blur(8px)"]
  );

  const labelX = useTransform(progress, [0, 0.65], [0, -55]);
  const descriptionY = useTransform(progress, [0, 0.72], [0, 35]);
  const statsY = useTransform(progress, [0, 0.72], [0, 45]);
  const scrollY = useTransform(progress, [0, 0.72], [0, 25]);

  return (
    <section
      ref={ref}
      className="
        relative
        flex
        min-h-[60vh]
        items-center
        justify-center
        overflow-hidden
        px-6
        py-20
      "
    >
      {/* PARALLAX GHOST */}
      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          select-none
          text-[34vw]
          font-black
          leading-none
          tracking-[-0.1em]
        "
        style={{
          y: ghostY,
          rotate: ghostRotate,
          color:
            "color-mix(in srgb, var(--primary) 3%, transparent)",
        }}
      >
        06
      </motion.div>

      {/* GLOW */}
      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[32vw]
          w-[32vw]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-[100px]
        "
        style={{
          y: glowY,
          background:
            "color-mix(in srgb, var(--primary) 6%, transparent)",
        }}
      />

      {/* GRID */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.028]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              var(--text) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              var(--text) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "90px 90px",
        }}
      />

      <motion.div
        className="
          relative
          z-10
          w-full
          max-w-4xl
          text-center
        "
        style={{
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
          rotateX: contentRotateX,
          filter: contentBlur,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        {/* LABEL */}
        <motion.div
          className="flex items-center justify-center gap-3"
          style={{
            x: labelX,
            opacity: contentOpacity,
          }}
        >
          <motion.span
            className="h-px w-10 origin-right sm:w-14"
            style={{
              scaleX: useTransform(progress, [0, 0.6], [1, 0]),
              backgroundColor: "var(--primary)",
            }}
          />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.35em]
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            BCA • SIX SEMESTERS
          </span>

          <motion.span
            className="h-px w-10 origin-left sm:w-14"
            style={{
              scaleX: useTransform(progress, [0, 0.6], [1, 0]),
              backgroundColor: "var(--primary)",
            }}
          />
        </motion.div>

        {/* TITLE */}
        <motion.h2
          className="
            mt-7
            text-[clamp(3.5rem,8vw,7.5rem)]
            font-bold
            leading-[0.84]
            tracking-[-0.08em]
          "
          style={{
            color: "var(--text)",
            y: useTransform(progress, [0, 0.72], [0, -20]),
          }}
        >
          Six semesters.
          <br />
          <motion.span
            style={{
              color: "var(--primary)",
              x: useTransform(progress, [0, 0.72], [0, -18]),
              opacity: contentOpacity,
            }}
          >
            One journey.
          </motion.span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          className="
            mx-auto
            mt-7
            max-w-lg
            text-sm
            leading-7
            sm:text-base
          "
          style={{
            color: "var(--text-secondary)",
            y: descriptionY,
            opacity: contentOpacity,
          }}
        >
          Explore every semester, subject and resource
          <br className="hidden sm:block" />
          as you move through your BCA.
        </motion.p>

        {/* STATS */}
        <motion.div
          className="
            mx-auto
            mt-8
            flex
            w-fit
            items-center
            gap-5
            rounded-full
            border
            px-5
            py-2.5
          "
          style={{
            borderColor: "var(--border)",
            backgroundColor:
              "color-mix(in srgb, var(--surface) 45%, transparent)",
            y: statsY,
            scale: useTransform(progress, [0, 0.72], [1, 0.88]),
            opacity: contentOpacity,
          }}
        >
          <div className="flex items-center gap-2">
            <Layers3
              size={13}
              style={{
                color: "var(--primary)",
              }}
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
              "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              06 Semesters
            </span>
          </div>

          <span
            className="h-3 w-px"
            style={{
              backgroundColor: "var(--border)",
            }}
          />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            30 Subjects
          </span>
        </motion.div>

        {/* SCROLL */}
        <motion.div
          className="
            mx-auto
            mt-8
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
          "
          style={{
            borderColor: "var(--border)",
            y: scrollY,
            opacity: contentOpacity,
          }}
        >
          <ArrowDown
            size={14}
            style={{
              color: "var(--primary)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   OUTRO
========================================================= */

function OutroSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.4,
  });

  const ghostY = useTransform(
    progress,
    [0, 0.5, 1],
    [100, 0, -100]
  );

  const ghostRotate = useTransform(
    progress,
    [0, 0.5, 1],
    [-8, 0, 8]
  );

  const contentOpacity = useTransform(
    progress,
    [0, 0.18, 0.5, 0.82, 1],
    [0, 1, 1, 1, 0]
  );

  const contentY = useTransform(
    progress,
    [0, 0.5, 1],
    [60, 0, -60]
  );

  const contentScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.88, 1, 0.9]
  );

  const contentRotateX = useTransform(
    progress,
    [0, 0.5, 1],
    [16, 0, -16]
  );

  const lineScale = useTransform(
    progress,
    [0, 0.22, 0.5, 0.78, 1],
    [0, 0.7, 1, 0.7, 0]
  );

  const labelY = useTransform(progress, [0, 0.5, 1], [25, 0, -25]);
  const descriptionY = useTransform(progress, [0, 0.5, 1], [30, 0, -30]);

  return (
    <section
      ref={ref}
      className="
        relative
        flex
        min-h-[46vh]
        items-center
        justify-center
        overflow-hidden
        px-6
        py-20
        text-center
      "
    >
      {/* GHOST NUMBER */}
      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          select-none
          text-[34vw]
          font-black
          leading-none
          tracking-[-0.1em]
        "
        style={{
          y: ghostY,
          rotate: ghostRotate,
          color:
            "color-mix(in srgb, var(--primary) 3%, transparent)",
        }}
      >
        06
      </motion.div>

      {/* CONTENT */}
      <motion.div
        className="relative z-10"
        style={{
          opacity: contentOpacity,
          y: contentY,
          scale: contentScale,
          rotateX: contentRotateX,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        {/* LINE */}
        <motion.div
          className="
            mx-auto
            mb-6
            h-px
            w-24
            origin-center
          "
          style={{
            scaleX: lineScale,
            backgroundColor: "var(--primary)",
          }}
        />

        {/* LABEL */}
        <motion.p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.4em]
          "
          style={{
            color: "var(--primary)",
            y: labelY,
            opacity: contentOpacity,
          }}
        >
          The Journey Continues
        </motion.p>

        {/* TITLE */}
        <motion.h2
          className="
            mt-5
            text-[clamp(3rem,7vw,6rem)]
            font-bold
            leading-[0.88]
            tracking-[-0.075em]
          "
          style={{
            color: "var(--text)",
          }}
        >
          Keep learning.
          <br />
          <span
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Keep building.
          </span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          className="
            mx-auto
            mt-6
            max-w-md
            text-sm
            leading-6
          "
          style={{
            color: "var(--text-secondary)",
            y: descriptionY,
            opacity: contentOpacity,
          }}
        >
          Six semesters are only the beginning.
          <br />
          What you build with them is up to you.
        </motion.p>

        {/* ANIMATED LINE */}
        <div className="mx-auto mt-7 h-px w-32 overflow-hidden">
          <motion.div
            className="h-full origin-center"
            style={{
              scaleX: lineScale,
              backgroundColor: "var(--primary)",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   MAIN
========================================================= */

function CinematicJourney() {
  return (
    <main
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg)",
      }}
    >
      <IntroSection />

      {semesterData.slice(0, 6).map((semester, index) => (
        <SemesterSection
          key={semester?.id ?? index}
          semester={semester}
          index={index}
        />
      ))}

      <OutroSection />
    </main>
  );
}

export default CinematicJourney;