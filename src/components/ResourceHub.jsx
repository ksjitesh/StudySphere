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

  const subjectName = (subjectSlug || "Subject")
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  return (
    <section className="w-full overflow-hidden">

      {/* Heading */}

      <div className="mb-8 sm:mb-12">

        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
            sm:text-sm
            sm:tracking-[0.25em]
          "
          style={{ color: "var(--primary)" }}
        >
          SEM {semesterId}
        </p>

        <h1
          className="
            mt-3
            break-words
            text-3xl
            font-extrabold
            leading-tight
            transition-colors
            duration-300
            sm:text-4xl
            lg:text-5xl
          "
          style={{ color: "var(--text)" }}
        >
          {subjectName}
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-base
            leading-7
            transition-colors
            duration-300
            sm:mt-4
            sm:text-lg
          "
          style={{ color: "var(--text-secondary)" }}
        >
          Select the resource you want to access.
        </p>

      </div>

      {/* Resources */}

      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">

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