import {
  FileText,
  FileQuestion,
  FolderOpen,
  ArrowRight,
} from "lucide-react";

const uploads = [
  {
    title: "Operating System Notes",
    type: "Notes",
    icon: FileText,
  },
  {
    title: "Java Programming PYQ",
    type: "PYQ",
    icon: FileQuestion,
  },
  {
    title: "DBMS Assignment",
    type: "Assignment",
    icon: FolderOpen,
  },
];

function RecentUploads() {
  return (
    <section className="mt-20">

      {/* Heading */}

      <div className="mb-8">

        <h2
          className="text-4xl font-extrabold transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Recent Uploads
        </h2>

        <p
          className="mt-3 text-lg transition-colors duration-300"
          style={{ color: "var(--text-secondary)" }}
        >
          Newly added study resources.
        </p>

      </div>

      {/* Upload List */}

      <div className="space-y-5">

        {uploads.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                group
                flex
                items-center
                justify-between
                rounded-3xl
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

              <div className="flex items-center gap-5">

                <div
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--primary) 12%, transparent)",
                  }}
                >

                  <Icon
                    size={26}
                    style={{ color: "var(--primary)" }}
                  />

                </div>

                <div>

                  <h3
                    className="text-xl font-bold transition-colors duration-300"
                    style={{ color: "var(--text)" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-1 text-sm transition-colors duration-300"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.type}
                  </p>

                </div>

              </div>

              <ArrowRight
                size={22}
                style={{ color: "var(--primary)" }}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default RecentUploads;