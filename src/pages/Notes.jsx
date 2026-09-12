import { useParams } from "react-router-dom";
import { Eye, Download, FileText } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import notesData from "../data/notesData";

function ScrollCard({ children, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const y = useTransform(progress, [0, 0.5, 1], [55, 0, -35]);
  const rotateX = useTransform(progress, [0, 0.5, 1], [8, 0, -5]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const opacity = useTransform(progress, [0, 0.22, 0.78, 1], [0, 1, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotateX, scale, opacity, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function Notes() {
  const { semesterId, subjectSlug } = useParams();
  const notes = notesData?.[semesterId]?.[subjectSlug] || [];
  const subjectName = subjectSlug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <main className="min-h-screen overflow-hidden transition-colors duration-300" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-8 lg:px-10 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 35, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={{ transformPerspective: 1000 }}>
          <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: "var(--primary)" }}>Semester {semesterId}</p>
          <h1 className="mt-3 break-words text-3xl font-extrabold leading-tight sm:text-5xl" style={{ color: "var(--text)" }}>{subjectName}</h1>
          <p className="mt-3 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>Study Notes</p>
        </motion.div>

        <div className="mt-8 space-y-6 sm:mt-12">
          {notes.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6 }} className="rounded-3xl border border-dashed p-8 text-center sm:p-10" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <FileText size={50} className="mx-auto" style={{ color: "var(--text-secondary)" }} />
              <h2 className="mt-5 text-xl font-bold sm:text-2xl" style={{ color: "var(--text)" }}>No Notes Available Yet</h2>
              <p className="mt-2" style={{ color: "var(--text-secondary)" }}>Notes will be uploaded soon.</p>
            </motion.div>
          ) : notes.map((note, index) => (
            <ScrollCard key={index} index={index}>
              <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.25 }} className="w-full min-w-0 rounded-3xl border p-5 shadow-sm transition-shadow duration-300 hover:shadow-2xl sm:p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="break-words text-xl font-bold leading-7 sm:text-2xl" style={{ color: "var(--text)" }}>{note.title}</h2>
                    <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>PDF Notes</p>
                  </div>
                  <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row">
                    <a href={note.pdf} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-105 sm:w-auto" style={{ backgroundColor: "var(--primary)" }}><Eye size={18} />Open</a>
                    <a href={note.pdf} download className="flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-center text-sm font-semibold transition-all duration-300 hover:scale-105 sm:w-auto" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}><Download size={18} />Download</a>
                  </div>
                </div>
              </motion.div>
            </ScrollCard>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Notes;
