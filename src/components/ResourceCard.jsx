import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

function ResourceCard({
  title,
  description,
  icon: Icon,
  link,
}) {
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
    [60, 0, -30]
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

  const iconY = useTransform(
    progress,
    [0, 0.5, 1],
    [12, 0, -8]
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
      className="w-full min-w-0"
    >
      <Link
        to={link}
        className="
          group
          relative
          block
          min-h-[250px]
          w-full
          overflow-hidden
          rounded-2xl
          border
          p-5
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-2xl
          sm:min-h-[275px]
          sm:rounded-3xl
          sm:p-7
          lg:min-h-[300px]
          lg:p-8
        "
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >

        {/* Subtle Hover Background */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
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
            pointer-events-none
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

        {/* Top */}

        <div className="relative flex items-center justify-between gap-4">

          {/* Icon */}

          <motion.div
            style={{
              y: iconY,
              transform: "translateZ(30px)",
            }}
            whileHover={{
              scale: 1.08,
              rotateZ: -3,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              shrink-0
              rounded-xl
              p-3
              transition-all
              duration-500
              group-hover:shadow-lg
              sm:rounded-2xl
              sm:p-4
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-xl
                opacity-80
                transition-all
                duration-500
                group-hover:opacity-100
                sm:rounded-2xl
              "
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--primary) 12%, transparent)",
              }}
            />

            <Icon
              size={24}
              className="
                relative
                z-10
                transition-transform
                duration-500
                sm:h-7
                sm:w-7
                group-hover:scale-110
              "
              style={{
                color: "var(--primary)",
              }}
            />
          </motion.div>

          {/* Arrow */}

          <motion.div
            whileHover={{
              x: 5,
            }}
            transition={{
              duration: 0.2,
            }}
            className="shrink-0"
          >
            <ArrowRight
              size={20}
              className="
                transition-all
                duration-500
                sm:h-[22px]
                sm:w-[22px]
              "
              style={{
                color: "var(--primary)",
              }}
            />
          </motion.div>

        </div>

        {/* Content */}

        <div
          className="relative mt-12 sm:mt-14"
          style={{
            transform: "translateZ(25px)",
          }}
        >

          {/* Small Label */}

          <p
            className="
              mb-3
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.2em]
              opacity-50
              transition-all
              duration-500
              group-hover:opacity-80
            "
            style={{
              color: "var(--primary)",
            }}
          >
            Study Resource
          </p>

          {/* Title */}

          <h2
            className="
              break-words
              text-2xl
              font-bold
              leading-tight
              transition-transform
              duration-500
              group-hover:translate-x-1
              sm:text-3xl
            "
            style={{
              color: "var(--text)",
            }}
          >
            {title}
          </h2>

          {/* Description */}

          <p
            className="
              mt-3
              max-w-xl
              break-words
              text-sm
              leading-6
              transition-colors
              duration-300
              sm:text-base
              sm:leading-7
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {description}
          </p>

        </div>

        {/* Bottom Right Indicator */}

        <div
          className="
            absolute
            bottom-5
            right-5
            h-1
            w-1
            rounded-full
            opacity-30
            transition-all
            duration-500
            group-hover:h-2
            group-hover:w-2
            group-hover:opacity-100
            sm:bottom-7
            sm:right-7
          "
          style={{
            backgroundColor: "var(--primary)",
          }}
        />

      </Link>
    </motion.div>
  );
}

export default ResourceCard;