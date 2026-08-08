import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";

import {
  loginUser,
  googleLogin,
} from "../firebase/auth";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {

      setLoading(true);

      await loginUser(
        email,
        password
      );

      navigate("/");

    } catch (err) {

      switch (err.code) {

        case "auth/invalid-email":
          setError("Invalid email address.");
          break;

        case "auth/user-not-found":
          setError("No account found.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        case "auth/invalid-credential":
          setError("Incorrect email or password.");
          break;

        default:
          setError("Unable to login.");
      }

    } finally {

      setLoading(false);

    }

  };

  const handleGoogleLogin = async () => {

    try {

      setLoading(true);

      setError("");

      await googleLogin();

      navigate("/");

    } catch {

      setError("Google Sign In failed.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue your learning journey with StudySphere."
      footerText="Don't have an account?"
      footerLinkText="Create Account"
      footerLink="/signup"
    >

      <form
        onSubmit={handleLogin}
        className="space-y-6"
      >
              {/* Error */}

        {error && (

          <div className="rounded-2xl border border-red-300 bg-red-50 px-5 py-4">

            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

          </div>

        )}

        {/* Email */}

        <div>

          <label
            className="mb-2 block text-sm font-semibold"
            style={{ color: "var(--text)" }}
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
              placeholder="Enter your email"
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

        {/* Password */}

        <div>

          <label
            className="mb-2 block text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            Password
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
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                py-3.5
                pl-14
                pr-14
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

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
              "
            >

              {showPassword ? (                <EyeOff
                  size={20}
                  style={{
                    color: "var(--text-secondary)",
                  }}
                />

              ) : (

                <Eye
                  size={20}
                  style={{
                    color: "var(--text-secondary)",
                  }}
                />

              )}

            </button>

          </div>

        </div>

        {/* Remember Me + Forgot Password */}

        <div className="flex items-center justify-between">

          <label
            className="flex cursor-pointer items-center gap-3 text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >

            <input
              type="checkbox"
              checked={remember}
              onChange={(e) =>
                setRemember(e.target.checked)
              }
              className="h-4 w-4 rounded accent-green-600"
            />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-semibold transition-all duration-300 hover:underline"
            style={{
              color: "var(--primary)",
            }}
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login Button */}

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

              Logging In...

            </>

          ) : (

            "Login"

          )}

        </button>

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

        {/* Google Login */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
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
                  <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="22"
            height="22"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 15.5 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2c-2.1 1.6-4.7 2.4-7.3 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.4-6.5 6.7l6.3 5.2C39.9 36.2 44 30.7 44 24c0-1.3-.1-2.3-.4-3.5z"
            />
          </svg>

          Continue with Google

          </button>

      </form>

    </AuthLayout>

        );
    
}

export default Login;