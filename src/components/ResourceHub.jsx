import { useParams } from "react-router-dom";
import {
  BookOpen,
  FileQuestion,
  FolderOpen,
  FolderGit2,
} from "lucide-react";

import ResourceCard from "./ResourceCard";

function ResourceHub() {
  const { semesterId, subjectSlug } = useParams();

  const subjectName = subjectSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <section className="mt-12">

      {/* Heading */}

      <div className="mb-12">

        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: "var(--primary)" }}
        >
          SEM {semesterId}
        </p>

        <h1
          className="mt-3 text-5xl font-extrabold transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          {subjectName}
        </h1>

        <p
          className="mt-4 text-lg transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Select the resource you want to access.
        </p>

      </div>

      {/* Resources */}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

        <ResourceCard
          title="Notes"
          description="Lecture notes, handwritten notes and study material."
          icon={BookOpen}
          link={`/semester/${semesterId}/subject/${subjectSlug}/notes`}
        />

        <ResourceCard
          title="PYQs"
          description="Previous year question papers with solutions."
          icon={FileQuestion}
          link={`/semester/${semesterId}/subject/${subjectSlug}/pyqs`}
        />

        <ResourceCard
          title="Assignments"
          description="College assignments and practice questions."
          icon={FolderOpen}
          link={`/semester/${semesterId}/subject/${subjectSlug}/assignments`}
        />

        <ResourceCard
          title="Projects"
          description="Mini projects and major project resources."
          icon={FolderGit2}
          link={`/semester/${semesterId}/subject/${subjectSlug}/projects`}
        />

      </div>

    </section>
  );
}

export default ResourceHub;