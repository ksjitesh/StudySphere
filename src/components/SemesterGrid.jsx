import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import SemesterCard from "./SemesterCard";
import { semesters } from "../data/semesterData";

function JourneyCard({ semester, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.2,
  });

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Timeline dot */}
      <motion.div
        animate={
          isInView
            ? {
                scale: 1,
                opacity: 1,
              }
            : {
                scale: 0.6,
                opacity: 0.35,
              }
        }
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-10 z-20 hidden -translate-x-1/2 md:flex"
      >
        <div
          className="relative flex h-4 w-4 items-center justify-center rounded-full border-2"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--primary)",
          }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          />

          {/* tiny glow */}
          <div
            className="absolute inset-[-7px] rounded-full opacity-30 blur-md"
            style={{ backgroundColor: "var(--primary)" }}
          />
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={false}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
                x: isLeft ? -55 : 55,
                y: 45,
                scale: 0.96,
                filter: "blur(7px)",
              }
        }
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`relative w-full md:w-[calc(50%-45px)] ${
          isLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <SemesterCard semester={semester} index={index} />

        {/* tiny side connector */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  scaleX: 1,
                  opacity: 0.5,
                }
              : {
                  scaleX: 0,
                  opacity: 0,
                }
          }
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className={`absolute top-[47px] hidden h-px w-[45px] origin-${
            isLeft ? "right" : "left"
          } md:block ${
            isLeft ? "-right-[45px]" : "-left-[45px]"
          }`}
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--primary))",
          }}
        />
      </motion.div>
    </div>
  );
}

function SemesterGrid() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 lg:py-16">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main glow */}
        <div
          className="absolute left-1/2 top-[15%] h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-[0.07] blur-[100px]"
          style={{ backgroundColor: "var(--primary)" }}
        />

        {/* Secondary glow */}
        <div
          className="absolute right-[-120px] top-[45%] h-[300px] w-[300px] rounded-full opacity-[0.045] blur-[90px]"
          style={{ backgroundColor: "var(--primary)" }}
        />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto mb-12 max-w-3xl text-center sm:mb-16"
      >
        {/* Tiny eyebrow */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles
            size={13}
            strokeWidth={1.7}
            style={{ color: "var(--primary)" }}
          />

          <span
            className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs"
            style={{ color: "var(--primary)" }}
          >
            The Journey
          </span>

          <Sparkles
            size={13}
            strokeWidth={1.7}
            style={{ color: "var(--primary)" }}
          />
        </div>

        <h2
          className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          style={{ color: "var(--text)" }}
        >
          Your BCA Journey
        </h2>

        <p
          className="mx-auto mt-3 max-w-xl text-sm leading-6 sm:mt-4 sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Six semesters. Thirty subjects. One journey from fundamentals to
          building something real.
        </p>

        {/* Small scroll cue */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-secondary)", opacity: 0.55 }}
          >
            Scroll to explore
          </span>

          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown
              size={13}
              style={{ color: "var(--primary)" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Journey timeline */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Central line */}
        <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 md:block">
          <div
            className="h-full w-full opacity-30"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--primary) 8%, var(--border) 50%, var(--primary) 92%, transparent)",
            }}
          />

          {/* moving light */}
          <motion.div
            animate={{ y: ["0%", "100%"] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-0 h-24 w-[2px] -translate-x-1/2 blur-[1px]"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--primary), transparent)",
            }}
          />
        </div>

        {/* Cards */}
        <div className="space-y-10 sm:space-y-12 md:space-y-16">
          {semesters.map((semester, index) => (
            <JourneyCard
              key={semester.id}
              semester={semester}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to top, var(--bg), transparent)",
        }}
      />
    </section>
  );
}

export default SemesterGrid;