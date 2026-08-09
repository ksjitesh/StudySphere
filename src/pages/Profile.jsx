import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Pencil,
} from "lucide-react";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../Firebase/firebase";

import { useAuth } from "../context/AuthContext";

function Profile() {

  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchProfile() {

      try {

        const docRef = doc(
          db,
          "users",
          currentUser.uid
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {

          setProfile(docSnap.data());

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    if (currentUser) {

      fetchProfile();

    }

  }, [currentUser]);

  if (loading) {

    return (

      <div
        className="flex min-h-screen items-center justify-center"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        }}
      >

        Loading...

      </div>

    );

  }

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
          My Profile
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Your StudySphere account information.
        </p>

        <div className="mt-10 space-y-5">
                    {/* Full Name */}

          <div
            className="flex items-center justify-between rounded-2xl border p-5"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >

            <div className="flex items-center gap-4">

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary) 12%, transparent)",
                }}
              >
                <User
                  size={22}
                  style={{
                    color: "var(--primary)",
                  }}
                />
              </div>

              <div>

                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Full Name
                </p>

                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {profile?.fullName || "Not Available"}
                </h3>

              </div>

            </div>

          </div>

          {/* Email */}

          <div
            className="flex items-center justify-between rounded-2xl border p-5"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >

            <div className="flex items-center gap-4">

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary) 12%, transparent)",
                }}
              >
                <Mail
                  size={22}
                  style={{
                    color: "var(--primary)",
                  }}
                />
              </div>

              <div>

                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Email
                </p>

                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {profile?.email}
                </h3>

              </div>

            </div>

          </div>

          {/* Course */}

          <div
            className="flex items-center justify-between rounded-2xl border p-5"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >

            <div className="flex items-center gap-4">

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary) 12%, transparent)",
                }}
              >
                <GraduationCap
                  size={22}
                  style={{
                    color: "var(--primary)",
                  }}
                />
              </div>

              <div>

                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Course
                </p>

                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {profile?.course || "Not Set"}
                </h3>

              </div>

            </div>

          </div>

          {/* Semester */}

          <div
            className="flex items-center justify-between rounded-2xl border p-5"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >

            <div className="flex items-center gap-4">

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary) 12%, transparent)",
                }}
              >
                <Calendar
                  size={22}
                  style={{
                    color: "var(--primary)",
                  }}
                />
              </div>

              <div>

                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Semester
                </p>

                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {profile?.semester || "Not Set"}
                </h3>

              </div>

            </div>

          </div>
                    {/* Joined Date */}

          <div
            className="flex items-center justify-between rounded-2xl border p-5"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >

            <div className="flex items-center gap-4">

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary) 12%, transparent)",
                }}
              >
                <Calendar
                  size={22}
                  style={{
                    color: "var(--primary)",
                  }}
                />
              </div>

              <div>

                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Joined
                </p>

                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {profile?.createdAt?.toDate
                    ? profile.createdAt
                        .toDate()
                        .toLocaleDateString()
                    : "Recently Joined"}
                </h3>

              </div>

            </div>

          </div>

          {/* Edit Profile */}

          <Link
            to="/edit-profile"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              py-4
              text-base
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
            style={{
              backgroundColor: "var(--primary)",
            }}
          >

            <Pencil size={20} />

            Edit Profile

          </Link>

          {/* Info Card */}

          <div
            className="rounded-2xl border p-5"
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
              StudySphere Account
            </h3>

            <p
              className="mt-2 text-sm leading-6"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Your account information is securely stored using
              Firebase Authentication and Cloud Firestore. You can
              update your personal details anytime from the Edit
              Profile page.
            </p>

          </div>
                  </div>

      </div>

    </div>

  );

}

export default Profile;