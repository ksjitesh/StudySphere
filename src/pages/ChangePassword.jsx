import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { auth } from "../Firebase/firebase";

function ChangePassword() {

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleChangePassword = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    if (!currentPassword) {

      setError("Please enter your current password.");

      return;

    }

    if (newPassword.length < 6) {

      setError("New password must be at least 6 characters.");

      return;

    }

    if (newPassword !== confirmPassword) {

      setError("Passwords do not match.");

      return;

    }

    try {

      setLoading(true);

      const user = auth.currentUser;

      const credential =
        EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

      await reauthenticateWithCredential(
        user,
        credential
      );

      await updatePassword(
        user,
        newPassword
      );

      setSuccess(
        "Password updated successfully."
      );

      setCurrentPassword("");

      setNewPassword("");

      setConfirmPassword("");

    } catch (err) {

      switch (err.code) {

        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Current password is incorrect.");
          break;

        case "auth/weak-password":
          setError("Choose a stronger password.");
          break;

        default:
          setError("Unable to change password.");
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="min-h-screen px-6 py-10"
      style={{
        backgroundColor: "var(--bg)",
      }}
    >

      <div className="mx-auto max-w-xl">

        <h1
          className="text-4xl font-bold"
          style={{
            color: "var(--text)",
          }}
        >
          Change Password
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Keep your StudySphere account secure.
        </p>

        <form
          onSubmit={handleChangePassword}
          className="mt-10 space-y-6"
        >
                      {/* Error */}

          {error && (

            <div
              className="rounded-2xl border p-4"
              style={{
                backgroundColor:
                  "rgba(239,68,68,0.08)",
                borderColor:
                  "rgba(239,68,68,0.35)",
              }}
            >

              <p className="text-red-500 text-sm font-medium">
                {error}
              </p>

            </div>

          )}

          {/* Success */}

          {success && (

            <div
              className="rounded-2xl border p-4"
              style={{
                backgroundColor:
                  "rgba(34,197,94,0.08)",
                borderColor:
                  "rgba(34,197,94,0.35)",
              }}
            >

              <p className="text-green-600 text-sm font-medium">
                {success}
              </p>

            </div>

          )}

          {/* Current Password */}

          <div>

            <label
              className="mb-2 block text-sm font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Current Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2"
                style={{
                  color: "var(--text-secondary)",
                }}
              />

              <input
                type={
                  showCurrent
                    ? "text"
                    : "password"
                }
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
                placeholder="Enter current password"
                className="
                  w-full
                  rounded-2xl
                  border
                  py-4
                  pl-14
                  pr-14
                  outline-none
                "
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2"
              >

                {showCurrent ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}

              </button>

            </div>

          </div>

          {/* New Password */}

          <div>

            <label
              className="mb-2 block text-sm font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              New Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2"
                style={{
                  color: "var(--text-secondary)",
                }}
              />

              <input
                type={
                  showNew
                    ? "text"
                    : "password"
                }
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                placeholder="Enter new password"
                className="
                  w-full
                  rounded-2xl
                  border
                  py-4
                  pl-14
                  pr-14
                  outline-none
                "
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(
                    !showNew
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2"
              >

                {showNew ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}

              </button>

            </div>

          </div>
                    {/* Confirm Password */}

          <div>

            <label
              className="mb-2 block text-sm font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Confirm New Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2"
                style={{
                  color: "var(--text-secondary)",
                }}
              />

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm new password"
                className="
                  w-full
                  rounded-2xl
                  border
                  py-4
                  pl-14
                  pr-14
                  outline-none
                "
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2"
              >

                {showConfirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}

              </button>

            </div>

          </div>

          {/* Action Buttons */}

          <div className="flex gap-4 pt-2">

            <button
              type="button"
              onClick={() => navigate("/settings")}
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
              disabled={loading}
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
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
              style={{
                backgroundColor: "var(--primary)",
              }}
            >

              {loading
                ? "Updating..."
                : "Update Password"}

            </button>

          </div>

          {/* Security Notice */}

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
              Security Notice
            </h3>

            <p
              className="mt-2 text-sm leading-6"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Use a strong password with at least 8 characters,
              including uppercase letters, lowercase letters,
              numbers and special characters for better security.
            </p>

          </div>
                  </form>

      </div>

    </div>

  );

}

export default ChangePassword;