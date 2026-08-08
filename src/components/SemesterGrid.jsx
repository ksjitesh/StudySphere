import SemesterCard from "./SemesterCard";
import semesterData from "../data/semesterData";

function SemesterGrid() {
  return (
    <section className="mt-20">

      {/* Heading */}

      <div className="mb-12">

        <h2
          className="text-4xl font-extrabold transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Continue Learning
        </h2>

        <p
          className="mt-3 text-lg transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Select a semester to access all your study resources.
        </p>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

        {semesterData.map((semester) => (

          <SemesterCard
            key={semester.id}
            id={semester.id}
            semester={semester.semester}
            subjects={semester.subjects}
          />

        ))}

      </div>

    </section>
  );
}

export default SemesterGrid;