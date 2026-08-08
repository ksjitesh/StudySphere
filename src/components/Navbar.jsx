import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  Search,
  Moon,
  Sun,
  Settings,
} from "lucide-react";

import logo from "../assets/logo.svg";

import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        backdrop-blur-md
        transition-colors
        duration-300
      "
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--surface) 90%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <nav
        className="
          mx-auto
          flex
          h-16
          w-full
          max-w-7xl
          items-center
          justify-between
          gap-3
          px-4
          sm:h-20
          sm:px-6
        "
      >
        {/* Logo */}

        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
        >
          <img
            src={logo}
            alt="StudySphere"
            className="h-9 w-9 object-contain sm:h-11 sm:w-11"
          />

          <span
            className="
              text-xl
              font-bold
              tracking-tight
              sm:text-2xl
            "
            style={{
              color: "var(--text)",
            }}
          >
            Study
            <span
              style={{
                color: "var(--primary)",
              }}
            >
              Sphere
            </span>
          </span>
        </Link>

        {/* Right Side */}

        <div className="flex min-w-0 items-center gap-2 sm:gap-4 lg:gap-8">

          {/* Home */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              `hidden text-sm font-semibold transition-all duration-300 hover:scale-105 sm:block ${
                isActive ? "" : "hover:text-[#2F6F4F]"
              }`
            }
            style={({ isActive }) => ({
              color: isActive
                ? "var(--primary)"
                : "var(--text-secondary)",
              textShadow: isActive
                ? "0 0 12px color-mix(in srgb, var(--primary) 45%, transparent)"
                : "none",
            })}
          >
            Home
          </NavLink>

          {/* Syllabus */}

          <NavLink
            to="/syllabus"
            className={({ isActive }) =>
              `hidden text-sm font-semibold transition-all duration-300 hover:scale-105 sm:block ${
                isActive ? "" : "hover:text-[#2F6F4F]"
              }`
            }
            style={({ isActive }) => ({
              color: isActive
                ? "var(--primary)"
                : "var(--text-secondary)",
              textShadow: isActive
                ? "0 0 12px color-mix(in srgb, var(--primary) 45%, transparent)"
                : "none",
            })}
          >
            Syllabus
          </NavLink>

          {/* Search */}

          {location.pathname !== "/search" && (
            <Link
              to="/search"
              aria-label="Search"
              className="
                group
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
                sm:h-11
                sm:w-auto
                sm:justify-start
                sm:gap-3
                sm:px-4
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <Search
                size={18}
                className="
                  shrink-0
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
                style={{
                  color: "var(--text-secondary)",
                }}
              />

              <span
                className="
                  hidden
                  text-sm
                  transition-colors
                  duration-300
                  group-hover:text-[#2F6F4F]
                  sm:block
                  sm:w-56
                  lg:w-72
                "
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Search notes, PYQs...
              </span>
            </Link>
          )}

          {/* Dark Mode */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
              sm:h-11
              sm:w-11
            "
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            {theme === "light" ? (
              <Moon
                size={19}
                style={{
                  color: "var(--text)",
                }}
              />
            ) : (
              <Sun
                size={19}
                className="text-yellow-400"
              />
            )}
          </button>

          {/* Settings */}

          <Link
            to="/settings"
            aria-label="Settings"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
              sm:h-11
              sm:w-auto
              sm:gap-2
              sm:px-5
            "
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <Settings size={18} />

            <span className="hidden text-sm font-semibold sm:block">
              Settings
            </span>
          </Link>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;