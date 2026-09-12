import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const resources = [
    {
      title: "Notes",
      description:
        "Lecture notes, handwritten notes and study material.",
      icon: BookOpen,
      link: `/semester/${semesterId}/subject/${subjectSlug}/notes`,
    },
    {
      title: "PYQs",
      description:
        "Previous year question papers with solutions.",
      icon: FileQuestion,
      link: `/semester/${semesterId}/subject/${subjectSlug}/pyqs`,
    },
    {
      title: "Assignments",
      description:
        "College assignments and practice questions.",
      icon: FolderOpen,
      link: `/semester/${semesterId}/subject/${subjectSlug}/assignments`,
    },
    {
      title: "Projects",
      description:
        "Mini projects and major project resources.",
      icon: FolderGit2,
      link: `/semester/${semesterId}/subject/${subjectSlug}/projects`,
    },
  ];

  return (
    <section className="w-full overflow-hidden">

      {/* Header */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="mb-8 sm:mb-12"
      >

        <motion.p
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
            sm:text-sm
            sm:tracking-[0.25em]
          "
          style={{
            color: "var(--primary)",
          }}
        >
          SEM {semesterId}
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.65,
            delay: 0.12,
            ease: "easeOut",
          }}
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
          style={{
            color: "var(--text)",
          }}
        >
          {subjectName}
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            delay: 0.22,
            ease: "easeOut",
          }}
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
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Select the resource you want to access.
        </motion.p>

      </motion.div>

      {/* Resources */}

      <div
        className="
          grid
          w-full
          grid-cols-1
          gap-4
          sm:gap-6
          md:grid-cols-2
          lg:gap-8
        "
      >

        {resources.map((resource, index) => (

          <motion.div
            key={resource.title}
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.55,
              delay: 0.25 + index * 0.1,
              ease: "easeOut",
            }}
          >
            <ResourceCard
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              link={resource.link}
            />
          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default ResourceHub;