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

  const { theme, toggleTheme } =
    useTheme();

  const location = useLocation();

  return (

    <header
      className="
        sticky
        top-0
        z-50
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
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <img
            src={logo}
            alt="StudySphere"
            className="h-11 w-11 object-contain"
          />

          <span
            className="
              text-2xl
              font-bold
              tracking-tight
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

        <div className="flex items-center gap-8">
                  {/* Home */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold transition-all duration-300 hover:scale-105 ${
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
              `text-sm font-semibold transition-all duration-300 hover:scale-105 ${
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

            <Link to="/search">

              <div
                className="
                  group
                  flex
                  h-11
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >

                <Search
                  size={18}
                  className="
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
                    w-72
                    text-sm
                    transition-colors
                    duration-300
                    group-hover:text-[#2F6F4F]
                  "
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Search notes, PYQs...
                </span>

              </div>

            </Link>

          )}
                    {/* Dark Mode */}

          <button
            onClick={toggleTheme}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
            "
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >

            {theme === "light" ? (

              <Moon
                size={20}
                style={{
                  color: "var(--text)",
                }}
              />

            ) : (

              <Sun
                size={20}
                className="text-yellow-400"
              />

            )}

          </button>

          {/* Settings */}

          <Link
            to="/settings"
            className="
              flex
              h-11
              items-center
              gap-2
              rounded-xl
              border
              px-5
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
            "
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >

            <Settings size={18} />

            <span className="text-sm font-semibold">
              Settings
            </span>

          </Link>

        </div>

      </nav>
          </header>

  );

}

export default Navbar;