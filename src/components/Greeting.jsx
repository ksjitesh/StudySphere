function Greeting() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";
  let emoji = "🌇";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
    emoji = "☀️";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
    emoji = "🌤️";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
    emoji = "🌇";
  } else {
    greeting = "Feeling Sleepy?";
    emoji = "🌙";
  }

  // Dynamic Quote

  let quote = "";
  let author = "";
  let motivation = "";

  if (hour >= 5 && hour < 12) {
    quote =
      "Every morning is a new opportunity to become a better version of yourself.";
    author = "StudySphere";
    motivation =
      "☀️ Start fresh.\n📚 Learn something new.\n🚀 Stay consistent.";
  } else if (hour >= 12 && hour < 17) {
    quote =
      "Small progress made every day leads to big achievements tomorrow.";
    author = "StudySphere";
    motivation =
      "🌤️ Keep moving.\n📖 One chapter at a time.\n🎯 Success is built daily.";
  } else if (hour >= 17 && hour < 21) {
    quote =
      "Don't stop when you're tired. Stop when you're proud of what you've achieved.";
    author = "StudySphere";
    motivation =
      "🌇 Finish strong.\n💪 Revise today's topics.\n⭐ Build your future.";
  } else {
    quote =
      "Dream big tonight, because tomorrow is another chance to make those dreams real.";
    author = "StudySphere";
    motivation =
      "🌙 Rest well.\n🧠 Recharge your mind.\n✨ Come back stronger tomorrow.";
  }

  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="w-full">
      <div className="grid w-full min-w-0 grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">

        {/* Left Side */}

        <div className="min-w-0">
          <p
            className="text-xs font-medium uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.25em]"
            style={{ color: "var(--primary)" }}
          >
            StudySphere Dashboard
          </p>

          <h1
            className="mt-3 break-words text-4xl font-extrabold tracking-tight transition-colors duration-300 sm:text-5xl lg:text-6xl"
            style={{ color: "var(--text)" }}
          >
            {greeting} {emoji}
          </h1>

          <p
            className="mt-4 max-w-2xl text-base leading-7 transition-colors duration-300 sm:mt-5 sm:text-xl sm:leading-9"
            style={{ color: "var(--text-secondary)" }}
          >
            Ready to continue your learning?
          </p>

          <p
            className="mt-2 text-sm transition-colors duration-300 sm:mt-3 sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            {date}
          </p>
        </div>

        {/* Right Side Quote */}

        <div
          className="w-full min-w-0 rounded-3xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 lg:p-8"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.15em] sm:text-sm sm:tracking-[0.2em]"
            style={{ color: "var(--primary)" }}
          >
            💡 Quote of the Day
          </p>

          <h2
            className="mt-4 break-words text-2xl font-bold leading-relaxed transition-colors duration-300 sm:mt-6 sm:text-3xl"
            style={{ color: "var(--text)" }}
          >
            "{quote}"
          </h2>

          <p
            className="mt-4 text-base font-semibold sm:mt-6 sm:text-lg"
            style={{ color: "var(--primary)" }}
          >
            — {author}
          </p>

          <div
            className="mt-6 rounded-2xl p-4 sm:mt-8 sm:p-5"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--primary) 10%, transparent)",
            }}
          >
            <p
              className="whitespace-pre-line text-sm leading-6 sm:text-base sm:leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              {motivation}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Greeting;