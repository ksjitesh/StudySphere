import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

function LatestNotice() {

  // ==============================
  // IMPORTANT ANNOUNCEMENT
  // ==============================

  const announcement = {
    id: "announcement-002",
    active: true,

    title: "StudySphere is Now Free for Everyone! 🎉",

    message:
      "No login or signup is required anymore. StudySphere is now completely open and free for everyone. You can directly access Notes, PYQs, Assignments, Projects and Syllabus without creating an account. Just open the website and start learning. 📚🚀",

    date: "12 August 2026",
  };

  const [showNotice, setShowNotice] = useState(false);

  // ==============================
  // SHOW NOTICE
  // ==============================

  useEffect(() => {

    if (!announcement.active) {
      return;
    }

    const closedAnnouncement = localStorage.getItem(
      "studysphere_closed_announcement"
    );

    if (closedAnnouncement !== announcement.id) {
      setShowNotice(true);
    }

  }, [announcement.id, announcement.active]);

  // ==============================
  // CLOSE NOTICE
  // ==============================

  const closeNotice = () => {

    localStorage.setItem(
      "studysphere_closed_announcement",
      announcement.id
    );

    setShowNotice(false);
  };

  // ==============================
  // DO NOT SHOW
  // ==============================

  if (!showNotice || !announcement.active) {
    return null;
  }

  // ==============================
  // POPUP
  // ==============================

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/50
        px-4
        py-6
        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
    >

      <div
        className="
          relative
          w-full
          max-w-lg
          overflow-hidden
          rounded-3xl
          border
          shadow-2xl
        "
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >

        {/* Close Button */}

        <button
          type="button"
          onClick={closeNotice}
          aria-label="Close announcement"
          className="
            absolute
            right-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-200
            hover:scale-105
          "
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          <X size={20} />
        </button>

        {/* Content */}

        <div className="p-6 sm:p-8">

          {/* Icon */}

          <div
            className="
              mb-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
            "
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--primary) 12%, transparent)",
            }}
          >
            <Bell
              size={28}
              style={{
                color: "var(--primary)",
              }}
            />
          </div>

          {/* Label */}

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              sm:text-sm
            "
            style={{
              color: "var(--primary)",
            }}
          >
            Important Announcement
          </p>

          {/* Title */}

          <h2
            id="announcement-title"
            className="
              mt-3
              pr-10
              text-2xl
              font-extrabold
              leading-tight
              sm:text-3xl
            "
            style={{
              color: "var(--text)",
            }}
          >
            {announcement.title}
          </h2>

          {/* Message */}

          <p
            className="
              mt-5
              text-base
              leading-7
              sm:text-lg
              sm:leading-8
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {announcement.message}
          </p>

          {/* Date */}

          <p
            className="
              mt-5
              text-sm
              font-medium
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {announcement.date}
          </p>

          {/* Got It */}

          <button
            type="button"
            onClick={closeNotice}
            className="
              mt-7
              w-full
              rounded-xl
              px-5
              py-3
              font-semibold
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-lg
            "
            style={{
              backgroundColor: "var(--primary)",
            }}
          >
            Got it
          </button>

        </div>

      </div>

    </div>
  );
}

export default LatestNotice;