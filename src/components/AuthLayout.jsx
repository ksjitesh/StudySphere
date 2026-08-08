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
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
      }}
    >
     <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-6">

        <div
  className="grid w-full overflow-hidden rounded-[32px] border shadow-xl lg:grid-cols-2"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
                     {/* Left Side */}

          <div className="flex flex-col justify-center px-8 py-8 lg:px-12">

            <Link
              to="/"
              className="mb-10 flex items-center gap-3"
            >
              <img
                src={logo}
                alt="StudySphere"
                className="h-10 w-10"
              />

              <h1
               className="text-2xl font-bold"
                style={{ color: "var(--text)" }}
              >
                Study
                <span style={{ color: "var(--primary)" }}>
                  Sphere
                </span>
              </h1>

            </Link>

            <h2
              className="text-4xl font-extrabold"
              style={{ color: "var(--text)" }}
            >
              {title}
            </h2>

            <p
              className="mt-4 text-lg leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {subtitle}
            </p>

            <div className="mt-10">

              {children}

            </div>

            <p
              className="mt-8 text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {footerText}{" "}

              <Link
                to={footerLink}
                className="font-semibold transition hover:underline"
                style={{ color: "var(--primary)" }}
              >
                {footerLinkText}
              </Link>

            </p>

          </div>

          {/* Right Side */}

          <div
            className="flex flex-col justify-center px-12 py-14"
            style={{
              background:
                "linear-gradient(135deg, #1E3A5F 0%, #2F6F4F 100%)",
            }}
          >
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/80">
              StudySphere
            </p>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight text-white">
              Learn.
              <br />
              Practice.
              <br />
              Succeed.
            </h2>

            <div className="mt-12 rounded-3xl bg-white/10 p-8 backdrop-blur-md">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
                💡 Quote of the Day
              </p>

              <h3 className="mt-5 text-3xl font-bold leading-relaxed text-white">
                "{quote}"
              </h3>

              <p className="mt-5 text-lg font-semibold text-green-200">
                — {author}
              </p>

            </div>

            <div className="mt-8 rounded-3xl border border-white/20 bg-white/5 p-6">

              <p className="whitespace-pre-line text-lg leading-8 text-white/90">
                {tip}
              </p>

            </div>

            <div className="mt-12 grid grid-cols-3 gap-5">

              <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-md">

                <p className="text-3xl">📚</p>

                <p className="mt-3 text-sm font-semibold text-white">
                  Learn
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-md">

                <p className="text-3xl">📝</p>

                <p className="mt-3 text-sm font-semibold text-white">
                  Practice
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-md">

                <p className="text-3xl">🎯</p>

                <p className="mt-3 text-sm font-semibold text-white">
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