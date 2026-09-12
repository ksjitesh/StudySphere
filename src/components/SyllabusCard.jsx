import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

function SyllabusCard({ semester, subjectCount }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
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
    [55, 0, -30]
  );

  const rotateX = useTransform(
    progress,
    [0, 0.5, 1],
    [7, 0, -4]
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.94, 1, 0.98]
  );

  const opacity = useTransform(
    progress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.92]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        rotateX,
        scale,
        opacity,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="w-full"
    >
      <Link
        to={`/syllabus/semester/${semester}`}
        className="
          group
          relative
          block
          min-h-[280px]
          overflow-hidden
          rounded-3xl
          border
          p-7
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-2xl
          sm:min-h-[300px]
          sm:p-8
        "
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >

        {/* Subtle Background Highlight */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-56
            w-56
            rounded-full
            opacity-0
            blur-3xl
            transition-opacity
            duration-700
            group-hover:opacity-20
          "
          style={{
            backgroundColor: "var(--primary)",
          }}
        />

        {/* Bottom Accent */}

        <div
          className="
            absolute
            bottom-0
            left-0
            h-[2px]
            w-0
            transition-all
            duration-500
            group-hover:w-full
          "
          style={{
            backgroundColor: "var(--primary)",
          }}
        />

        {/* Semester */}

        <motion.p
          whileHover={{
            x: 4,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            relative
            text-sm
            font-bold
            uppercase
            tracking-[0.25em]
          "
          style={{
            color: "var(--primary)",
          }}
        >
          SEM {String(semester).padStart(2, "0")}
        </motion.p>

        {/* Subject Count */}

        <div
          className="relative mt-6"
          style={{
            transform: "translateZ(30px)",
          }}
        >
          <motion.h2
            whileHover={{
              scale: 1.04,
              x: 3,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              origin-left
              text-5xl
              font-extrabold
              tracking-tight
              transition-colors
              duration-300
              sm:text-6xl
            "
            style={{
              color: "var(--text)",
            }}
          >
            {String(subjectCount).padStart(2, "0")}
          </motion.h2>

          <p
            className="
              mt-1
              text-sm
              transition-colors
              duration-300
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Subjects
          </p>
        </div>

        {/* Footer */}

        <div
          className="
            relative
            mt-12
            flex
            items-center
            justify-between
          "
          style={{
            transform: "translateZ(20px)",
          }}
        >

          <motion.span
            whileHover={{
              x: 4,
            }}
            transition={{
              duration: 0.2,
            }}
            className="font-semibold"
            style={{
              color: "var(--primary)",
            }}
          >
            View Syllabus
          </motion.span>

          <motion.div
            whileHover={{
              x: 6,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <ArrowRight
              size={22}
              style={{
                color: "var(--primary)",
              }}
            />
          </motion.div>

        </div>

      </Link>
    </motion.div>
  );
}

export default SyllabusCard;