import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

import searchData from "../data/searchData";

function ScrollResult({ children }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
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
    [45, 0, -25]
  );

  const rotateX = useTransform(
    progress,
    [0, 0.5, 1],
    [7, 0, -4]
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.96, 1, 0.98]
  );

  const opacity = useTransform(
    progress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.92]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotateX,
        scale,
        opacity,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    return searchData.filter((item) =>
      item.subject
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            rotateX: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          style={{
            transformPerspective: 1000,
          }}
        >
          <p
            className="text-sm font-bold uppercase tracking-[0.25em]"
            style={{ color: "var(--primary)" }}
          >
            StudySphere Search
          </p>

          <h1
            className="
              mt-3
              text-4xl
              font-extrabold
              transition-colors
              duration-300
              sm:text-5xl
            "
            style={{ color: "var(--text)" }}
          >
            Search Subjects
          </h1>

          <p
            className="mt-4 text-lg transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            Find any subject instantly.
          </p>
        </motion.div>

        {/* Search Box */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.65,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="relative mt-12"
        >
          <Search
            size={22}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
            "
            style={{ color: "var(--text-secondary)" }}
          />

          <motion.input
            type="text"
            placeholder="Search subjects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            whileFocus={{
              scale: 1.01,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              w-full
              rounded-2xl
              border
              py-5
              pl-14
              pr-6
              text-lg
              outline-none
              transition-all
              duration-300
            "
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </motion.div>

        {/* Popular Searches */}

        {query.trim() === "" && (

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            className="mt-10"
          >
            <h2
              className="mb-5 text-xl font-bold"
              style={{ color: "var(--text)" }}
            >
              Popular Searches
            </h2>

            <div className="flex flex-wrap gap-4">

              {[
                "C Programming",
                "Operating System",
                "Database Management System",
                "Java Programming",
                "Computer Network",
              ].map((item, index) => (

                <motion.button
                  key={item}
                  onClick={() => setQuery(item)}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: 0.3 + index * 0.06,
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    rounded-full
                    border
                    px-5
                    py-3
                    transition-all
                    duration-300
                  "
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  {item}
                </motion.button>

              ))}

            </div>
          </motion.div>

        )}

        {/* Results */}

        {query.trim() !== "" && (

          <div className="mt-10 space-y-5">

            {results.length === 0 ? (

              <ScrollResult>
                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.01,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-dashed
                    p-10
                    text-center
                    transition-colors
                    duration-300
                  "
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: "var(--text)" }}
                  >
                    No Results Found
                  </h2>

                  <p
                    className="mt-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Try searching another subject.
                  </p>
                </motion.div>
              </ScrollResult>

            ) : (

              results.map((item, index) => (

                <ScrollResult key={`${item.semester}-${item.slug}`}>

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.06,
                    }}
                  >
                    <Link
                      to={`/semester/${item.semester}/subject/${item.slug}`}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        p-6
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-lg
                      "
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="min-w-0">

                        <span
                          className="
                            inline-block
                            rounded-full
                            px-3
                            py-1
                            text-sm
                            font-semibold
                          "
                          style={{
                            backgroundColor:
                              "color-mix(in srgb, var(--primary) 12%, transparent)",
                            color: "var(--primary)",
                          }}
                        >
                          SEM{" "}
                          {String(item.semester).padStart(2, "0")}
                        </span>

                        <h2
                          className="
                            mt-4
                            break-words
                            text-xl
                            font-bold
                            sm:text-2xl
                          "
                          style={{
                            color: "var(--text)",
                          }}
                        >
                          {item.subject}
                        </h2>

                      </div>

                      <motion.div
                        whileHover={{
                          x: 6,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="ml-4 shrink-0"
                      >
                        <ArrowRight
                          size={22}
                          style={{
                            color: "var(--primary)",
                          }}
                        />
                      </motion.div>

                    </Link>
                  </motion.div>

                </ScrollResult>

              ))

            )}

          </div>

        )}

      </div>
    </main>
  );
}

export default SearchPage;