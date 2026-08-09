import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Mail,
  Loader2,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";

import { resetPassword } from "../Firebase/auth";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleResetPassword = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {

      setLoading(true);

      await resetPassword(normalizedEmail);

      setSuccess(
        "If an account exists with this email, a password reset email has been sent. Please check your inbox and spam folder."
      );

      setEmail("");

    } catch (err) {

      console.error("Password reset error:", err);

      switch (err.code) {

        case "auth/invalid-email":
          setError("Invalid email address.");
          break;

        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many reset attempts. Please try again later."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        case "auth/operation-not-allowed":
          setError(
            "Email/password authentication is not enabled in Firebase."
          );
          break;

        default:
          setError(
            err.message || "Unable to send reset email."
          );

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout
      title="Forgot Password 🔑"
      subtitle="Enter your registered email address to receive a password reset link."
      footerText="Remember your password?"
      footerLinkText="Back to Login"
      footerLink="/login"
    >

      <form
        onSubmit={handleResetPassword}
        className="space-y-6"
      >

        {/* Error */}

        {error && (

          <div
            className="rounded-2xl border border-red-300 bg-red-50 px-5 py-4"
          >

            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

          </div>

        )}

        {/* Success */}

        {success && (

          <div
            className="rounded-2xl border border-green-300 bg-green-50 px-5 py-4"
          >

            <p className="text-sm font-medium text-green-700">
              {success}
            </p>

          </div>

        )}

        {/* Email */}

        <div>

          <label
            className="mb-2 block text-sm font-semibold"
            style={{
              color: "var(--text)",
            }}
          >
            Email Address
          </label>

          <div className="relative">

            <Mail
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2"
              style={{
                color: "var(--text-secondary)",
              }}
            />

            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                py-3.5
                pl-14
                pr-5
                outline-none
                transition-all
                duration-300
                focus:scale-[1.01]
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

        {/* Reset Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-2xl
            py-3.5
            text-lg
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
          style={{
            backgroundColor: "var(--primary)",
          }}
        >

          {loading ? (

            <>
              <Loader2
                size={20}
                className="mr-2 animate-spin"
              />

              Sending Link...
            </>

          ) : (

            "Send Reset Link"

          )}

        </button>

        {/* Information */}

        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--primary) 8%, transparent)",
            borderColor: "var(--border)",
          }}
        >

          <h3
            className="text-base font-semibold"
            style={{
              color: "var(--text)",
            }}
          >
            Need Help?
          </h3>

          <p
            className="mt-2 text-sm leading-6"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Enter the email address you used to create your
            StudySphere account. If the account exists, Firebase
            will send instructions to reset your password.
          </p>

        </div>

        {/* Divider */}

        <div className="flex items-center gap-4">

          <div
            className="h-px flex-1"
            style={{
              backgroundColor: "var(--border)",
            }}
          />

          <span
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            OR
          </span>

          <div
            className="h-px flex-1"
            style={{
              backgroundColor: "var(--border)",
            }}
          />

        </div>

        {/* Back to Login */}

        <Link
          to="/login"
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-2xl
            border
            py-3.5
            font-semibold
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          Back to Login
        </Link>

      </form>

    </AuthLayout>

  );

}

export default ForgotPassword;