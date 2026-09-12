import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, ArrowUpRight } from "lucide-react";

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

  if (!announcement.active) {
    return null;
  }

  // ==============================
  // POPUP
  // ==============================

  return (
    <AnimatePresence>
      {showNotice && (
        <motion.div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/55
            px-4
            py-6
            backdrop-blur-md
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="announcement-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {/* ==============================
              POPUP CARD
          ============================== */}

          <motion.div
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
              transformPerspective: 1200,
            }}
            initial={{
              opacity: 0,
              y: 28,
              scale: 0.94,
              rotateX: 7,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
            }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.96,
              rotateX: -4,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* ==============================
                TOP ACCENT
            ============================== */}

            <motion.div
              className="absolute left-0 right-0 top-0 h-[2px]"
              style={{
                backgroundColor: "var(--primary)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.65,
                delay: 0.15,
                ease: "easeOut",
              }}
            />

            {/* ==============================
                CLOSE BUTTON
            ============================== */}

            <motion.button
              type="button"
              onClick={closeNotice}
              aria-label="Close announcement"
              className="
                absolute
                right-4
                top-4
                z-10
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
              "
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.25,
              }}
              whileHover={{
                scale: 1.08,
                rotate: 4,
              }}
              whileTap={{
                scale: 0.92,
              }}
            >
              <X size={19} />
            </motion.button>

            {/* ==============================
                CONTENT
            ============================== */}

            <div className="p-6 sm:p-8">
              {/* ==============================
                  ICON
              ============================== */}

              <motion.div
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
                  boxShadow:
                    "0 12px 30px color-mix(in srgb, var(--primary) 10%, transparent)",
                }}
                initial={{
                  opacity: 0,
                  y: 14,
                  scale: 0.8,
                  rotate: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0.65,
                    ease: "easeInOut",
                  }}
                >
                  <Bell
                    size={27}
                    style={{
                      color: "var(--primary)",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* ==============================
                  LABEL
              ============================== */}

              <motion.p
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
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                }}
              >
                Important Announcement
              </motion.p>

              {/* ==============================
                  TITLE
              ============================== */}

              <motion.h2
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
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay: 0.26,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {announcement.title}
              </motion.h2>

              {/* ==============================
                  MESSAGE
              ============================== */}

              <motion.p
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
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {announcement.message}
              </motion.p>

              {/* ==============================
                  DATE
              ============================== */}

              <motion.p
                className="
                  mt-5
                  text-sm
                  font-medium
                "
                style={{
                  color: "var(--text-secondary)",
                }}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.38,
                }}
              >
                {announcement.date}
              </motion.p>

              {/* ==============================
                  GOT IT
              ============================== */}

              <motion.button
                type="button"
                onClick={closeNotice}
                className="
                  group
                  mt-7
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  font-semibold
                  text-white
                "
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow:
                    "0 10px 25px color-mix(in srgb, var(--primary) 18%, transparent)",
                }}
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay: 0.44,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -2,
                  scale: 1.01,
                }}
                whileTap={{
                  y: 0,
                  scale: 0.98,
                }}
              >
                <span>Got it</span>

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LatestNotice;