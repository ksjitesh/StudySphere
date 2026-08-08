import SemesterCard from "./SemesterCard";
import semesterData from "../data/semesterData";

function SemesterGrid() {
  return (
    <section className="w-full min-w-0">

      {/* Heading */}

      <div className="mb-8 sm:mb-10 lg:mb-12">
        <h2
          className="text-3xl font-extrabold transition-colors duration-300 sm:text-4xl"
          style={{ color: "var(--text)" }}
        >
          Continue Learning
        </h2>

        <p
          className="mt-2 max-w-2xl text-base leading-7 transition-colors duration-300 sm:mt-3 sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Select a semester to access all your study resources.
        </p>
      </div>

      {/* Grid */}

      <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">

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