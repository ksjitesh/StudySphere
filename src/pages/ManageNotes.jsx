import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  BookOpen,
  Loader2,
  Trash2,
} from "lucide-react";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function ManageNotes() {

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");

  const [semester, setSemester] = useState("");

  const [subject, setSubject] = useState("");

  const [noteLink, setNoteLink] = useState("");

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // Load Notes

  const loadNotes = async () => {

    try {

      setLoading(true);

      const querySnapshot = await getDocs(
        collection(db, "notes")
      );

      const notesData = querySnapshot.docs.map(
        (noteDoc) => ({
          id: noteDoc.id,
          ...noteDoc.data(),
        })
      );

      setNotes(notesData);

    } catch (error) {

      console.error(
        "Error loading notes:",
        error
      );

      setError(
        "Unable to load notes."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadNotes();

  }, []);

  // Add Note

  const handleAddNote = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    const cleanTitle = title.trim();

    const cleanSubject = subject.trim();

    const cleanLink = noteLink.trim();

    if (!cleanTitle) {

      setError(
        "Please enter the note title."
      );

      return;

    }

    if (!semester) {

      setError(
        "Please select a semester."
      );

      return;

    }

    if (!cleanSubject) {

      setError(
        "Please enter the subject."
      );

      return;

    }

    if (!cleanLink) {

      setError(
        "Please enter the note link."
      );

      return;

    }

    try {

      setSaving(true);

      await addDoc(
        collection(db, "notes"),
        {
          title: cleanTitle,

          semester,

          subject: cleanSubject,

          noteLink: cleanLink,

          createdAt: serverTimestamp(),
        }
      );

      setTitle("");

      setSemester("");

      setSubject("");

      setNoteLink("");

      setSuccess(
        "Note added successfully."
      );

      await loadNotes();

    } catch (error) {

      console.error(
        "Error adding note:",
        error
      );

      setError(
        "Unable to add note. Please try again."
      );

    } finally {

      setSaving(false);

    }

  };

  // Delete Note

  const handleDeleteNote = async (noteId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    try {

      setDeletingId(noteId);

      setError("");

      setSuccess("");

      await deleteDoc(
        doc(db, "notes", noteId)
      );

      setNotes((previousNotes) =>
        previousNotes.filter(
          (note) => note.id !== noteId
        )
      );

      setSuccess(
        "Note deleted successfully."
      );

    } catch (error) {

      console.error(
        "Error deleting note:",
        error
      );

      setError(
        "Unable to delete note."
      );

    } finally {

      setDeletingId(null);

    }

  };

  return (

    <div
      className="min-h-screen px-6 py-10"
      style={{
        backgroundColor: "var(--bg)",
      }}
    >

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10">

          <Link
            to="/admin"
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
            "
            style={{
              color: "var(--primary)",
            }}
          >

            <ArrowLeft size={18} />

            Back to Dashboard

          </Link>

          <div className="
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          ">

            <div>

              <h1
                className="text-4xl font-bold"
                style={{
                  color: "var(--text)",
                }}
              >
                Manage Notes
              </h1>

              <p
                className="mt-2"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Add, view and delete study notes.
              </p>

            </div>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                px-5
                py-3
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >

              <BookOpen
                size={20}
                style={{
                  color: "var(--primary)",
                }}
              />

              <span
                className="font-semibold"
                style={{
                  color: "var(--text)",
                }}
              >
                {notes.length} Notes
              </span>

            </div>

          </div>

        </div>
                {/* Messages */}

        {error && (

          <div
            className="
              mb-6
              rounded-2xl
              border
              px-5
              py-4
            "
            style={{
              backgroundColor:
                "rgba(239, 68, 68, 0.08)",
              borderColor:
                "rgba(239, 68, 68, 0.30)",
            }}
          >

            <p className="text-sm font-medium text-red-500">
              {error}
            </p>

          </div>

        )}

        {success && (

          <div
            className="
              mb-6
              rounded-2xl
              border
              px-5
              py-4
            "
            style={{
              backgroundColor:
                "rgba(34, 197, 94, 0.08)",
              borderColor:
                "rgba(34, 197, 94, 0.30)",
            }}
          >

            <p className="text-sm font-medium text-green-600">
              {success}
            </p>

          </div>

        )}

        {/* Add Note Form */}

        <form
          onSubmit={handleAddNote}
          className="
            rounded-3xl
            border
            p-6
            md:p-8
          "
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >

          <div className="mb-7">

            <h2
              className="text-2xl font-bold"
              style={{
                color: "var(--text)",
              }}
            >
              Add New Note
            </h2>

            <p
              className="mt-2 text-sm"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Add the information students will use to find
              this note.
            </p>

          </div>

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
            "
          >

            {/* Note Title */}

            <div>

              <label
                className="mb-2 block text-sm font-semibold"
                style={{
                  color: "var(--text)",
                }}
              >
                Note Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g. C Programming Unit 1"
                className="
                  w-full
                  rounded-2xl
                  border
                  px-5
                  py-3.5
                  outline-none
                  transition-all
                  duration-300
                  focus:shadow-lg
                "
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />

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
                  py-3.5
                  outline-none
                "
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >

                <option value="">
                  Select Semester
                </option>

                <option value="Semester 1">
                  Semester 1
                </option>

                <option value="Semester 2">
                  Semester 2
                </option>

                <option value="Semester 3">
                  Semester 3
                </option>

                <option value="Semester 4">
                  Semester 4
                </option>

                <option value="Semester 5">
                  Semester 5
                </option>

                <option value="Semester 6">
                  Semester 6
                </option>

                <option value="Semester 7">
                  Semester 7
                </option>

                <option value="Semester 8">
                  Semester 8
                </option>

              </select>

            </div>

            {/* Subject */}

            <div>

              <label
                className="mb-2 block text-sm font-semibold"
                style={{
                  color: "var(--text)",
                }}
              >
                Subject
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="e.g. C Programming"
                className="
                  w-full
                  rounded-2xl
                  border
                  px-5
                  py-3.5
                  outline-none
                  transition-all
                  duration-300
                  focus:shadow-lg
                "
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />

            </div>

            {/* Note Link */}

            <div>

              <label
                className="mb-2 block text-sm font-semibold"
                style={{
                  color: "var(--text)",
                }}
              >
                Note Link
              </label>

              <input
                type="url"
                value={noteLink}
                onChange={(e) =>
                  setNoteLink(e.target.value)
                }
                placeholder="Paste public PDF / Note URL"
                className="
                  w-full
                  rounded-2xl
                  border
                  px-5
                  py-3.5
                  outline-none
                  transition-all
                  duration-300
                  focus:shadow-lg
                "
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />

            </div>

          </div>
                    {/* Form Actions */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:justify-end
            "
          >

            {/* Clear Button */}

            <button
              type="button"
              onClick={() => {

                setTitle("");
                setSemester("");
                setSubject("");
                setNoteLink("");
                setError("");
                setSuccess("");

              }}
              disabled={saving}
              className="
                rounded-2xl
                border
                px-6
                py-3.5
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              Clear
            </button>

            {/* Save Button */}

            <button
              type="submit"
              disabled={saving}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                px-7
                py-3.5
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
              style={{
                backgroundColor: "var(--primary)",
              }}
            >

              {saving ? (

                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Saving Note...
                </>

              ) : (

                <>
                  <Plus size={20} />

                  Save Note
                </>

              )}

            </button>

          </div>

        </form>
                {/* Notes List */}

        <div className="mt-10">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2
                className="text-2xl font-bold"
                style={{
                  color: "var(--text)",
                }}
              >
                All Notes
              </h2>

              <p
                className="mt-1 text-sm"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Notes currently available in your database.
              </p>

            </div>

          </div>

          {loading ? (

            <div
              className="
                flex
                min-h-[250px]
                items-center
                justify-center
                rounded-3xl
                border
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >

              <div className="flex items-center gap-3">

                <Loader2
                  size={22}
                  className="animate-spin"
                  style={{
                    color: "var(--primary)",
                  }}
                />

                <span
                  className="text-sm font-medium"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Loading notes...
                </span>

              </div>

            </div>

          ) : notes.length === 0 ? (

            <div
              className="
                flex
                min-h-[280px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                px-6
                text-center
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >

              <div
                className="
                  mb-5
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

                <BookOpen
                  size={30}
                  style={{
                    color: "var(--primary)",
                  }}
                />

              </div>

              <h3
                className="text-xl font-bold"
                style={{
                  color: "var(--text)",
                }}
              >
                No Notes Added Yet
              </h3>

              <p
                className="mt-2 max-w-md text-sm"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Add your first study note using the form above.
              </p>

            </div>

          ) : (

            <div
              className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
              "
            >

              {notes.map((note) => (

                <div
                  key={note.id}
                  className="
                    rounded-3xl
                    border
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >

                  <div
                    className="
                      mb-5
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

                    <BookOpen
                      size={23}
                      style={{
                        color: "var(--primary)",
                      }}
                    />

                  </div>

                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: "var(--text)",
                    }}
                  >
                    {note.title || "Untitled Note"}
                  </h3>

                  <div className="mt-4 space-y-2">

                    <p
                      className="text-sm"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      <strong>Semester:</strong>{" "}
                      {note.semester || "Not specified"}
                    </p>

                    <p
                      className="text-sm"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      <strong>Subject:</strong>{" "}
                      {note.subject || "Not specified"}
                    </p>

                  </div>

                  <div
                    className="
                      mt-6
                      flex
                      gap-3
                    "
                  >

                    {/* Open Note */}

                    <a
                      href={note.noteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex-1
                        rounded-xl
                        px-4
                        py-3
                        text-center
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-lg
                      "
                      style={{
                        backgroundColor: "var(--primary)",
                      }}
                    >
                      Open Note
                    </a>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteNote(note.id)
                      }
                      disabled={
                        deletingId === note.id
                      }
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        border
                        px-4
                        py-3
                        transition-all
                        duration-300
                        hover:bg-red-50
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                      style={{
                        borderColor:
                          "rgba(239,68,68,0.30)",
                        color: "#ef4444",
                      }}
                      title="Delete note"
                    >

                      {deletingId === note.id ? (

                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                      ) : (

                        <Trash2 size={18} />

                      )}

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default ManageNotes;