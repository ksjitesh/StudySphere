import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import searchData from "../data/searchData";

function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    return searchData.filter((item) =>
      item.subject.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* Header */}

        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: "var(--primary)" }}
        >
          StudySphere Search
        </p>

        <h1
          className="mt-3 text-5xl font-extrabold transition-colors duration-300"
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

        {/* Search Box */}

        <div className="relative mt-12">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-secondary)" }}
          />

          <input
            type="text"
            placeholder="Search subjects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border py-5 pl-14 pr-6 text-lg outline-none transition-all duration-300"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />

        </div>

        {/* Popular Searches */}

        {query.trim() === "" && (

          <div className="mt-10">

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
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="rounded-full border px-5 py-3 transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

        )}

        {/* Results */}

        {query.trim() !== "" && (

          <div className="mt-10 space-y-5">

            {results.length === 0 ? (

              <div
                className="rounded-2xl border border-dashed p-10 text-center transition-colors duration-300"
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

              </div>

            ) : (

              results.map((item) => (

                <Link
                  key={`${item.semester}-${item.slug}`}
                  to={`/semester/${item.semester}/subject/${item.slug}`}
                  className="group flex items-center justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >

                  <div>

                    <span
                      className="rounded-full px-3 py-1 text-sm font-semibold"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--primary) 12%, transparent)",
                        color: "var(--primary)",
                      }}
                    >
                      SEM {String(item.semester).padStart(2, "0")}
                    </span>

                    <h2
                      className="mt-4 text-2xl font-bold"
                      style={{ color: "var(--text)" }}
                    >
                      {item.subject}
                    </h2>

                  </div>

                  <ArrowRight
                    size={22}
                    style={{ color: "var(--primary)" }}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />

                </Link>

              ))

            )}

          </div>

        )}

      </div>

    </main>
  );
}

export default SearchPage;