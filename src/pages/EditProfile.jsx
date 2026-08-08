import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function EditProfile() {

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");

  const [course, setCourse] = useState("");

  const [semester, setSemester] = useState("");

  useEffect(() => {

    async function loadProfile() {

      try {

        const docRef = doc(
          db,
          "users",
          currentUser.uid
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

          const data = docSnap.data();

          setFullName(data.fullName || "");

          setCourse(data.course || "");

          setSemester(data.semester || "");

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    if (currentUser) {

      loadProfile();

    }

  }, [currentUser]);

  const handleSave = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateDoc(

        doc(db, "users", currentUser.uid),

        {

          fullName,

          course,

          semester,

        }

      );

      navigate("/profile");

    } catch (error) {

      console.error(error);

    } finally {

      setSaving(false);

    }

  };

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

      <div className="mx-auto max-w-2xl">

        <h1
          className="text-4xl font-bold"
          style={{
            color: "var(--text)",
          }}
        >
          Edit Profile
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Update your StudySphere profile information.
        </p>

        <form
          onSubmit={handleSave}
          className="mt-10 space-y-6"
        >
                      {/* Full Name */}

          <div>

            <label
              className="mb-2 block text-sm font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              placeholder="Enter your full name"
              className="
                w-full
                rounded-2xl
                border
                px-5
                py-4
                outline-none
                transition-all
                duration-300
                focus:shadow-lg
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />

          </div>

          {/* Course */}

          <div>

            <label
              className="mb-2 block text-sm font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Course
            </label>

            <select
              value={course}
              onChange={(e) =>
                setCourse(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                px-5
                py-4
                outline-none
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >

              <option value="">
                Select Course
              </option>

              <option value="BCA">
                BCA
              </option>

              <option value="B.Tech">
                B.Tech
              </option>

              <option value="B.Sc">
                B.Sc
              </option>

              <option value="B.Com">
                B.Com
              </option>

              <option value="BA">
                BA
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* Semester */}

          <div>

            <label
              className="mb-2 block text-sm font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Semester
            </label>

            <select
              value={semester}
              onChange={(e) =>
                setSemester(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                px-5
                py-4
                outline-none
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >

              <option value="">
                Select Semester
              </option>

              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 5">Semester 5</option>
              <option value="Semester 6">Semester 6</option>
              <option value="Semester 7">Semester 7</option>
              <option value="Semester 8">Semester 8</option>

            </select>

          </div>
                    {/* Buttons */}

          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="
                flex-1
                rounded-2xl
                border
                py-4
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                flex-1
                rounded-2xl
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
              style={{
                backgroundColor: "var(--primary)",
              }}
            >

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

          {/* Information */}

          <div
            className="mt-6 rounded-2xl border p-5"
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
              Profile Information
            </h3>

            <p
              className="mt-2 text-sm leading-6"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Changes are saved directly to your StudySphere account.
              Once you save, your Profile page will immediately display
              the updated information.
            </p>

          </div>
                  </form>

      </div>

    </div>

  );

}

export default EditProfile;