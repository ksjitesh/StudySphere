import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Pencil,
  Lock,
  Moon,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { logoutUser } from "../firebase/auth";

function Settings() {

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      await logoutUser();

      navigate("/login");

    } catch (error) {

      console.error(error);

    }

  };

  const settings = [

    {
      icon: User,
      title: "Profile",
      subtitle: "View your account information",
      link: "/profile",
    },

    {
      icon: Pencil,
      title: "Edit Profile",
      subtitle: "Update your personal details",
      link: "/profile",
    },

    {
      icon: Lock,
      title: "Change Password",
      subtitle: "Update your account password",
      link: "/change-password",
    },

    {
      icon: Moon,
      title: "Theme",
      subtitle: "Light / Dark Mode",
      comingSoon: true,
    },

  ];

  return (

    <div
      className="min-h-screen px-6 py-10"
      style={{
        backgroundColor: "var(--bg)",
      }}
    >

      <div className="mx-auto max-w-3xl">

        <h1
          className="text-4xl font-bold"
          style={{
            color: "var(--text)",
          }}
        >
          Settings
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Manage your StudySphere account.
        </p>

        <div className="mt-10 space-y-4">
                    {settings.map((item) => {

            const Icon = item.icon;

            if (item.comingSoon) {

              return (

                <div
                  key={item.title}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    p-5
                  "
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                      "
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--primary) 12%, transparent)",
                      }}
                    >

                      <Icon
                        size={22}
                        style={{
                          color: "var(--primary)",
                        }}
                      />

                    </div>

                    <div>

                      <h3
                        className="font-semibold"
                        style={{
                          color: "var(--text)",
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="text-sm"
                        style={{
                          color: "var(--text-secondary)",
                        }}
                      >
                        {item.subtitle}
                      </p>

                    </div>

                  </div>

                  <span
                    className="
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                    "
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--primary) 15%, transparent)",
                      color: "var(--primary)",
                    }}
                  >
                    Coming Soon
                  </span>

                </div>

              );

            }

            return (

              <Link
                key={item.title}
                to={item.link}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  p-5
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

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                    "
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--primary) 12%, transparent)",
                    }}
                  >

                    <Icon
                      size={22}
                      style={{
                        color: "var(--primary)",
                      }}
                    />

                  </div>

                  <div>

                    <h3
                      className="font-semibold"
                      style={{
                        color: "var(--text)",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="text-sm"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item.subtitle}
                    </p>

                  </div>

                </div>

                <ChevronRight
                  size={20}
                  style={{
                    color: "var(--text-secondary)",
                  }}
                />

              </Link>

            );

          })}
                  {/* Logout */}

        <div className="mt-8">

          <button
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              py-4
              text-base
              font-semibold
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
            style={{
              backgroundColor:
                "color-mix(in srgb, #ef4444 10%, var(--surface))",
              borderColor:
                "color-mix(in srgb, #ef4444 30%, var(--border))",
              color: "#ef4444",
            }}
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* Security Info */}

        <div
          className="mt-10 rounded-2xl border p-5"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >

          <h3
            className="text-lg font-semibold"
            style={{
              color: "var(--text)",
            }}
          >
            Account Security
          </h3>

          <p
            className="mt-2 text-sm leading-6"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Your StudySphere account is secured using Firebase
            Authentication. Never share your password with anyone.
            If you think your account has been compromised,
            change your password immediately.
          </p>

        </div>
                </div>

      </div>

    </div>

  );

}

export default Settings;