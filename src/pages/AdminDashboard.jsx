import { Link } from "react-router-dom";

import {
  BookOpen,
  FileText,
  ClipboardList,
  FolderKanban,
  LogOut,
} from "lucide-react";

import { logoutUser } from "../Firebase/auth";

function AdminDashboard() {

  const handleLogout = async () => {

    try {

      await logoutUser();

    } catch (error) {

      console.error(error);

    }

  };

  const cards = [

    {
      title: "Manage Notes",
      subtitle: "Add, edit or delete notes",
      icon: BookOpen,
      link: "/admin/notes",
    },

    {
      title: "Manage PYQs",
      subtitle: "Manage previous year papers",
      icon: FileText,
      link: "/admin/pyqs",
    },

    {
      title: "Manage Assignments",
      subtitle: "Manage assignments",
      icon: ClipboardList,
      link: "/admin/assignments",
    },

    {
      title: "Manage Projects",
      subtitle: "Manage projects",
      icon: FolderKanban,
      link: "/admin/projects",
    },

  ];

  return (

    <div
      className="min-h-screen px-6 py-10"
      style={{
        backgroundColor: "var(--bg)",
      }}
    >

      <div className="mx-auto max-w-6xl">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1
              className="text-4xl font-bold"
              style={{
                color: "var(--text)",
              }}
            >
              Admin Dashboard
            </h1>

            <p
              className="mt-2"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Welcome back, Admin.
            </p>

          </div>
                    <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              px-5
              py-3
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
            style={{
              backgroundColor: "#ef4444",
            }}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
          "
        >

          {cards.map((card) => {

            const Icon = card.icon;

            return (

              <Link
                key={card.title}
                to={card.link}
                className="
                  rounded-3xl
                  border
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >

                <div
                  className="
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                  "
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--primary) 12%, transparent)",
                  }}
                >

                  <Icon
                    size={30}
                    style={{
                      color: "var(--primary)",
                    }}
                  />

                </div>

                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {card.title}
                </h2>

                <p
                  className="mt-3 leading-6"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {card.subtitle}
                </p>

              </Link>

            );

          })}
                  </div>

      </div>

    </div>

  );

}

export default AdminDashboard;