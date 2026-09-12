import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerReveal = {
    hidden: {
      opacity: 0,
      y: 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const columnReveal = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.footer
      className="
        mt-24
        border-t
        transition-colors
        duration-300
      "
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      variants={footerReveal}
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">

        {/* =====================================
            MAIN FOOTER
        ===================================== */}

        <div className="grid gap-12 md:grid-cols-4">

          {/* =====================================
              BRAND
          ===================================== */}

          <motion.div variants={columnReveal}>
            <div className="flex items-center gap-3">

              <motion.div
                className="
                  rounded-xl
                  p-3
                  text-white
                  shadow-lg
                "
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow:
                    "0 12px 28px color-mix(in srgb, var(--primary) 16%, transparent)",
                }}
                whileHover={{
                  y: -3,
                  rotate: -2,
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <GraduationCap size={26} />
              </motion.div>

              <div>
                <motion.h2
                  className="
                    text-2xl
                    font-bold
                    transition-colors
                    duration-300
                  "
                  style={{
                    color: "var(--text)",
                  }}
                  whileHover={{
                    x: 2,
                  }}
                >
                  StudySphere
                </motion.h2>

                <p
                  className="
                    text-sm
                    transition-colors
                    duration-300
                  "
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Learn • Practice • Succeed
                </p>
              </div>

            </div>

            <p
              className="
                mt-6
                max-w-sm
                leading-7
                transition-colors
                duration-300
              "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Your complete BCA learning platform for Notes,
              Previous Year Question Papers, Assignments,
              Projects and Official Syllabus.
            </p>
          </motion.div>

          {/* =====================================
              QUICK LINKS
          ===================================== */}

          <motion.div variants={columnReveal}>
            <h3
              className="
                mb-5
                text-lg
                font-bold
              "
              style={{
                color: "var(--text)",
              }}
            >
              Quick Links
            </h3>

            <div className="space-y-3">

              <FooterLink to="/" label="Home" />

              <FooterLink
                to="/syllabus"
                label="Syllabus"
              />

              <FooterLink
                to="/search"
                label="Search"
              />

            </div>
          </motion.div>

          {/* =====================================
              RESOURCES
          ===================================== */}

          <motion.div variants={columnReveal}>
            <h3
              className="
                mb-5
                text-lg
                font-bold
              "
              style={{
                color: "var(--text)",
              }}
            >
              Resources
            </h3>

            <div className="space-y-3">

              <ResourceItem
                icon="📚"
                label="Notes"
              />

              <ResourceItem
                icon="📝"
                label="PYQs"
              />

              <ResourceItem
                icon="📄"
                label="Assignments"
              />

              <ResourceItem
                icon="💻"
                label="Projects"
              />

            </div>
          </motion.div>

          {/* =====================================
              CONTACT
          ===================================== */}

          <motion.div variants={columnReveal}>
            <h3
              className="
                mb-5
                text-lg
                font-bold
              "
              style={{
                color: "var(--text)",
              }}
            >
              Contact
            </h3>

            <div className="space-y-4">

              {/* Email */}

              <motion.div
                className="flex items-center gap-3"
                whileHover={{
                  x: 3,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <Mail
                  size={18}
                  style={{
                    color: "var(--primary)",
                  }}
                />

                <a
                  href="mailto:ksjitesh17@gmail.com"
                  className="
                    transition-colors
                    duration-300
                  "
                  style={{
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      "var(--text-secondary)";
                  }}
                >
                  ksjitesh17@gmail.com
                </a>
              </motion.div>

              {/* Instagram */}

              <motion.div
                className="flex items-center gap-3"
                whileHover={{
                  x: 3,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <span>📷</span>

                <a
                  href="https://instagram.com/k.s.jitesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    transition-colors
                    duration-300
                  "
                  style={{
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      "var(--text-secondary)";
                  }}
                >
                  @k.s.jitesh
                </a>
              </motion.div>

              {/* Back To Top */}

              <motion.button
                type="button"
                onClick={scrollToTop}
                className="
                  group
                  mt-4
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  font-semibold
                  text-white
                "
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow:
                    "0 10px 24px color-mix(in srgb, var(--primary) 15%, transparent)",
                }}
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <motion.span
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowUp size={18} />
                </motion.span>

                Back to Top
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* =====================================
            BOTTOM BAR
        ===================================== */}

        <motion.div
          className="
            mt-12
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            pt-6
            transition-colors
            duration-300
            md:flex-row
          "
          style={{
            borderColor: "var(--border)",
          }}
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            © {year} StudySphere. All Rights Reserved.
          </p>

          <motion.p
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
            whileHover={{
              y: -1,
            }}
          >
            Made with ❤️ by Jitesh
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

/* =====================================
   QUICK LINK COMPONENT
===================================== */

function FooterLink({ to, label }) {
  return (
    <motion.div
      whileHover={{
        x: 5,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <Link
        to={to}
        className="
          group
          flex
          items-center
          gap-1
          transition-colors
          duration-300
        "
        style={{
          color: "var(--text-secondary)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color =
            "var(--primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color =
            "var(--text-secondary)";
        }}
      >
        <span>{label}</span>

        <ArrowUpRight
          size={14}
          className="
            opacity-0
            -translate-x-1
            transition-all
            duration-300
            group-hover:translate-x-0
            group-hover:opacity-100
          "
        />
      </Link>
    </motion.div>
  );
}

/* =====================================
   RESOURCE ITEM
===================================== */

function ResourceItem({ icon, label }) {
  return (
    <motion.div
      className="
        flex
        items-center
        gap-3
        rounded-lg
        py-1
      "
      style={{
        color: "var(--text-secondary)",
      }}
      whileHover={{
        x: 5,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <motion.span
        whileHover={{
          scale: 1.12,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        {icon}
      </motion.span>

      <span>{label}</span>
    </motion.div>
  );
}

export default Footer;