import { Link } from "react-router-dom";
import { GraduationCap, Mail, ArrowUp } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="mt-24 border-t transition-colors duration-300"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div
                className="rounded-xl p-3 text-white"
                style={{
                  backgroundColor: "var(--primary)",
                }}
              >
                <GraduationCap size={26} />
              </div>

              <div>

                <h2
                  className="text-2xl font-bold transition-colors duration-300"
                  style={{ color: "var(--text)" }}
                >
                  StudySphere
                </h2>

                <p
                  className="text-sm transition-colors duration-300"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Learn • Practice • Succeed
                </p>

              </div>

            </div>

            <p
              className="mt-6 leading-7 transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              Your complete BCA learning platform for Notes,
              Previous Year Question Papers, Assignments,
              Projects and Official Syllabus.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3
              className="mb-5 text-lg font-bold"
              style={{ color: "var(--text)" }}
            >
              Quick Links
            </h3>

            <div className="space-y-3">

              <Link
                to="/"
                className="block transition-all duration-300 hover:translate-x-1"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
              >
                Home
              </Link>

              <Link
                to="/syllabus"
                className="block transition-all duration-300 hover:translate-x-1"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
              >
                Syllabus
              </Link>

              <Link
                to="/search"
                className="block transition-all duration-300 hover:translate-x-1"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
              >
                Search
              </Link>

            </div>

          </div>

          {/* Resources */}

          <div>

            <h3
              className="mb-5 text-lg font-bold"
              style={{ color: "var(--text)" }}
            >
              Resources
            </h3>

            <div
              className="space-y-3 transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>📚 Notes</p>
              <p>📝 PYQs</p>
              <p>📄 Assignments</p>
              <p>💻 Projects</p>
            </div>

          </div>

          {/* Contact */}

          <div>

            <h3
              className="mb-5 text-lg font-bold"
              style={{ color: "var(--text)" }}
            >
              Contact
            </h3>

            <div className="space-y-4">

              {/* Email */}

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  style={{ color: "var(--primary)" }}
                />

                <a
                  href="mailto:ksjitesh17@gmail.com"
                  className="transition-all duration-300 hover:translate-x-1"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
                >
                  ksjitesh17@gmail.com
                </a>

              </div>

              {/* Instagram */}

              <div className="flex items-center gap-3">

                <span>📷</span>

                <a
                  href="https://instagram.com/k.s.jitesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:translate-x-1"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
                >
                  @k.s.jitesh
                </a>

              </div>

              {/* Back To Top */}

              <button
                onClick={scrollToTop}
                className="mt-4 flex items-center gap-2 rounded-xl px-5 py-3 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  backgroundColor: "var(--primary)",
                }}
              >
                <ArrowUp size={18} />
                Back to Top
              </button>

            </div>

          </div>

        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 transition-colors duration-300 md:flex-row"
          style={{
            borderColor: "var(--border)",
          }}
        >

          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            © {year} StudySphere. All Rights Reserved.
          </p>

          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Made with ❤️ by Jitesh
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;