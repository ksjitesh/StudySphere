import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLink,
}) {
  const hour = new Date().getHours();

  let quote = "";
  let author = "";
  let tip = "";

  if (hour >= 5 && hour < 12) {
    quote =
      "Every morning is a new opportunity to become a better version of yourself.";
    author = "StudySphere";
    tip = "☀️ Start fresh.\n📚 Learn.\n🚀 Stay consistent.";
  } else if (hour >= 12 && hour < 17) {
    quote =
      "Small progress made every day leads to big achievements tomorrow.";
    author = "StudySphere";
    tip = "🌤️ Keep moving.\n📖 One chapter.\n🎯 Build your future.";
  } else if (hour >= 17 && hour < 21) {
    quote =
      "Don't stop when you're tired. Stop when you're proud.";
    author = "StudySphere";
    tip = "🌇 Revise today.\n💪 Stay focused.\n⭐ Finish strong.";
  } else {
    quote =
      "Dream big tonight, because tomorrow is another chance.";
    author = "StudySphere";
    tip = "🌙 Rest well.\n🧠 Recharge.\n✨ Come back stronger.";
  }

  return (
    <main
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        px-3
        py-4
        transition-colors
        duration-300
        sm:px-6
        sm:py-8
        lg:px-8
      "
      style={{
        backgroundColor: "var(--bg)",
      }}
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          min-w-0
          overflow-hidden
          rounded-[24px]
          border
          shadow-xl
          lg:grid-cols-2
          lg:rounded-[32px]
        "
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* =========================
            LEFT SIDE
        ========================== */}

        <div
          className="
            flex
            min-w-0
            w-full
            flex-col
            justify-center
            px-4
            py-6
            sm:px-8
            sm:py-8
            lg:px-12
            lg:py-12
          "
        >
          {/* Logo */}

          <Link
            to="/"
            className="
              mb-7
              flex
              min-w-0
              items-center
              gap-3
              sm:mb-10
            "
          >
            <img
              src={logo}
              alt="StudySphere"
              className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
            />

            <h1
              className="
                min-w-0
                truncate
                text-xl
                font-bold
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
            </h1>
          </Link>

          {/* Title */}

          <h2
            className="
              break-words
              text-3xl
              font-extrabold
              leading-tight
              sm:text-4xl
            "
            style={{
              color: "var(--text)",
            }}
          >
            {title}
          </h2>

          {/* Subtitle */}

          <p
            className="
              mt-3
              max-w-xl
              break-words
              text-base
              leading-7
              sm:mt-4
              sm:text-lg
              sm:leading-8
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {subtitle}
          </p>

          {/* Form */}

          <div className="mt-8 min-w-0 w-full sm:mt-10">
            {children}
          </div>

          {/* Footer */}

          <p
            className="
              mt-7
              break-words
              text-sm
              sm:mt-8
              sm:text-base
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {footerText}{" "}

            <Link
              to={footerLink}
              className="
                font-semibold
                transition
                hover:underline
              "
              style={{
                color: "var(--primary)",
              }}
            >
              {footerLinkText}
            </Link>
          </p>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================== */}

        <div
          className="
            min-w-0
            w-full
            overflow-hidden
            px-4
            py-7
            sm:px-8
            sm:py-10
            lg:px-12
            lg:py-14
          "
          style={{
            background:
              "linear-gradient(135deg, #1E3A5F 0%, #2F6F4F 100%)",
          }}
        >
          <div
            className="
              mx-auto
              flex
              w-full
              min-w-0
              max-w-xl
              flex-col
              justify-center
            "
          >
            {/* Small Heading */}

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-white/80
                sm:text-sm
                sm:tracking-[0.25em]
              "
            >
              StudySphere
            </p>

            {/* Main Heading */}

            <h2
              className="
                mt-5
                break-words
                text-4xl
                font-extrabold
                leading-tight
                text-white
                sm:mt-6
                sm:text-5xl
              "
            >
              Learn.
              <br />
              Practice.
              <br />
              Succeed.
            </h2>

            {/* =========================
                QUOTE
            ========================== */}

            <div
              className="
                mt-8
                w-full
                min-w-0
                overflow-hidden
                rounded-3xl
                bg-white/10
                p-4
                backdrop-blur-md
                sm:mt-12
                sm:p-8
              "
            >
              <p
                className="
                  break-words
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-green-200
                  sm:text-sm
                  sm:tracking-[0.2em]
                "
              >
                💡 Quote of the Day
              </p>

              <h3
                className="
                  mt-4
                  break-words
                  text-xl
                  font-bold
                  leading-8
                  text-white
                  sm:mt-5
                  sm:text-3xl
                  sm:leading-relaxed
                "
              >
                "{quote}"
              </h3>

              <p
                className="
                  mt-4
                  break-words
                  text-sm
                  font-semibold
                  text-green-200
                  sm:mt-5
                  sm:text-lg
                "
              >
                — {author}
              </p>
            </div>

            {/* =========================
                TIP
            ========================== */}

            <div
              className="
                mt-5
                w-full
                min-w-0
                overflow-hidden
                rounded-3xl
                border
                border-white/20
                bg-white/5
                p-4
                sm:mt-8
                sm:p-6
              "
            >
              <p
                className="
                  whitespace-pre-line
                  break-words
                  text-sm
                  leading-7
                  text-white/90
                  sm:text-lg
                  sm:leading-8
                "
              >
                {tip}
              </p>
            </div>

            {/* =========================
                FEATURE CARDS
            ========================== */}

            <div
              className="
                mt-6
                grid
                w-full
                min-w-0
                grid-cols-3
                gap-2
                sm:mt-12
                sm:gap-5
              "
            >
              {/* Learn */}

              <div
                className="
                  min-w-0
                  w-full
                  overflow-hidden
                  rounded-2xl
                  bg-white/10
                  p-2.5
                  text-center
                  backdrop-blur-md
                  sm:p-5
                "
              >
                <p
                  className="
                    text-xl
                    leading-none
                    sm:text-3xl
                  "
                >
                  📚
                </p>

                <p
                  className="
                    mt-2
                    break-words
                    text-[11px]
                    font-semibold
                    text-white
                    sm:mt-3
                    sm:text-sm
                  "
                >
                  Learn
                </p>
              </div>

              {/* Practice */}

              <div
                className="
                  min-w-0
                  w-full
                  overflow-hidden
                  rounded-2xl
                  bg-white/10
                  p-2.5
                  text-center
                  backdrop-blur-md
                  sm:p-5
                "
              >
                <p
                  className="
                    text-xl
                    leading-none
                    sm:text-3xl
                  "
                >
                  📝
                </p>

                <p
                  className="
                    mt-2
                    break-words
                    text-[11px]
                    font-semibold
                    text-white
                    sm:mt-3
                    sm:text-sm
                  "
                >
                  Practice
                </p>
              </div>

              {/* Achieve */}

              <div
                className="
                  min-w-0
                  w-full
                  overflow-hidden
                  rounded-2xl
                  bg-white/10
                  p-2.5
                  text-center
                  backdrop-blur-md
                  sm:p-5
                "
              >
                <p
                  className="
                    text-xl
                    leading-none
                    sm:text-3xl
                  "
                >
                  🎯
                </p>

                <p
                  className="
                    mt-2
                    break-words
                    text-[11px]
                    font-semibold
                    text-white
                    sm:mt-3
                    sm:text-sm
                  "
                >
                  Achieve
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;