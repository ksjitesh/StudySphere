import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Menu,
  X,
  BookOpen,
  FileText,
  ClipboardList,
  FolderKanban,
  Home,
  ArrowUpRight,
} from "lucide-react";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Syllabus", path: "/syllabus", icon: BookOpen },
    { name: "Notes", path: "/semester/1", icon: FileText },
    { name: "PYQs", path: "/semester/1", icon: ClipboardList },
    { name: "Assignments", path: "/semester/1", icon: ClipboardList },
    { name: "Projects", path: "/semester/1", icon: FolderKanban },
    { name: "Search", path: "/search", icon: Search },
  ];

  const isHome = location.pathname === "/";

  return (
    <>
      {/* Floating Hero Controls */}
      <div
        className={`absolute left-0 right-0 top-0 z-50 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-10 ${
          isHome ? "" : "sticky"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-xl transition-all duration-300 group-hover:scale-105"
              style={{
                backgroundColor: "color-mix(in srgb, var(--surface) 65%, transparent)",
                borderColor: "color-mix(in srgb, var(--border) 70%, transparent)",
              }}
            >
              <span
                className="text-sm font-black"
                style={{ color: "var(--primary)" }}
              >
                S
              </span>
            </div>

            <span
              className="hidden text-sm font-semibold tracking-tight sm:block"
              style={{ color: "var(--text)" }}
            >
              StudySphere
            </span>
          </Link>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Link
              to="/search"
              aria-label="Search"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--surface) 65%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--border) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <Search
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Link>

            {/* Menu */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Open menu"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--surface) 65%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--border) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={18} strokeWidth={1.8} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={18} strokeWidth={1.8} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Menu Panel */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 -z-10"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--bg) 35%, transparent)",
                  backdropFilter: "blur(6px)",
                }}
              />

              {/* Panel */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: -12,
                  scale: 0.96,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.97,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute right-5 top-[70px] w-[calc(100vw-40px)] max-w-sm overflow-hidden rounded-3xl border p-3 shadow-2xl backdrop-blur-2xl sm:right-8 sm:w-96 lg:right-10"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--surface) 88%, transparent)",
                  borderColor: "var(--border)",
                }}
              >
                {/* Panel Header */}
                <div className="px-3 pb-3 pt-2">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.25em]"
                    style={{ color: "var(--primary)" }}
                  >
                    Explore
                  </p>

                  <p
                    className="mt-1 text-lg font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    Your learning space
                  </p>
                </div>

                {/* Links */}
                <div className="space-y-1">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.035,
                          duration: 0.3,
                        }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center justify-between rounded-2xl px-3 py-3 transition-all duration-200"
                          style={{
                            backgroundColor: active
                              ? "color-mix(in srgb, var(--primary) 10%, transparent)"
                              : "transparent",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-9 w-9 items-center justify-center rounded-xl"
                              style={{
                                backgroundColor:
                                  "color-mix(in srgb, var(--primary) 8%, transparent)",
                                color: "var(--primary)",
                              }}
                            >
                              <Icon size={16} strokeWidth={1.8} />
                            </div>

                            <span
                              className="text-sm font-medium"
                              style={{ color: "var(--text)" }}
                            >
                              {item.name}
                            </span>
                          </div>

                          <ArrowUpRight
                            size={15}
                            className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
                            style={{ color: "var(--text-secondary)" }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom line */}
                <div
                  className="mt-2 border-t px-3 pt-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <p
                    className="text-[10px] leading-5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Learn • Explore • Evolve
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;