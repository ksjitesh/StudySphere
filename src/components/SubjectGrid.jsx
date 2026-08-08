import { useParams } from "react-router-dom";
import semesterData from "../data/semesterData";
import SubjectCard from "./SubjectCard";

function SubjectGrid() {
  const { semesterId } = useParams();

  const semester = semesterData.find(
    (item) => item.id === Number(semesterId)
  );

  if (!semester) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-4xl font-bold text-red-500">
          Semester Not Found
        </h2>
      </div>
    );
  }

  return (
    <section className="mt-12">

      {/* Heading */}

      <div className="mb-12">

        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: "var(--primary)" }}
        >
          {semester.semester}
        </p>

        <h1
          className="mt-3 text-5xl font-extrabold transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Subjects
        </h1>

        <p
          className="mt-4 text-lg transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Select a subject to explore its learning resources.
        </p>

      </div>

      {/* Subjects */}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

        {semester.subjects.map((subject) => (

          <SubjectCard
            key={subject}
            semesterId={semester.id}
            subject={subject}
          />

        ))}

      </div>

    </section>
  );
}

export default SubjectGrid;