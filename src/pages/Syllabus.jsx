import SyllabusCard from "../components/SyllabusCard";
import syllabusData from "../data/syllabusData";

function Syllabus() {
  const semesters = Object.keys(syllabusData);

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Heading */}

        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: "var(--primary)" }}
        >
          Academic Curriculum
        </p>

        <h1
          className="mt-3 text-6xl font-extrabold tracking-tight transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          BCA Syllabus
        </h1>

        <p
          className="mt-5 max-w-2xl text-xl leading-8 transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Choose your semester to view the official subject-wise syllabus.
        </p>

        {/* Semester Grid */}

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">

          {semesters.map((semester) => (

            <SyllabusCard
              key={semester}
              semester={semester}
              subjectCount={syllabusData[semester].length}
            />

          ))}

        </div>

      </div>
    </main>
  );
}

export default Syllabus;