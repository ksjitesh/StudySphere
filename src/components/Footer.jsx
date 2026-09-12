import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, ArrowUp } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="relative w-full overflow-hidden border-t"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Soft ambient depth — CSS only, does not affect page scrolling */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--primary)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--primary)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 sm:py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 900 }}
          >
            <motion.div
              className="flex w-fit items-center gap-3"
              whileHover={{ y: -4, rotateX: 3 }}
              transition={{ duration: 0.25 }}
              style={{ transformPerspective: 700 }}
            >
              <motion.div
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow:
                    "0 14px 35px color-mix(in srgb, var(--primary) 18%, transparent)",
                }}
                whileHover={{
                  scale: 1.08,
                  rotateY: -10,
                  rotateZ: -2,
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <GraduationCap size={23} />
              </motion.div>

              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  StudySphere
                </h2>

                <p
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Learn • Practice • Succeed
                </p>
              </div>
            </motion.div>

            <p
              className="mt-5 max-w-sm text-sm leading-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Your complete BCA learning platform for Notes, Previous Year
              Question Papers, Assignments, Projects and Official Syllabus.
            </p>
          </motion.div>

          {/* QUICK LINKS */}
          <FooterColumn title="Quick Links">
            <FooterLink to="/" label="Home" />
            <FooterLink to="/syllabus" label="Syllabus" />
            <FooterLink to="/search" label="Search" />
          </FooterColumn>

          {/* RESOURCES */}
          <FooterColumn title="Resources">
            <FooterItem icon="📚" label="Notes" />
            <FooterItem icon="📝" label="PYQs" />
            <FooterItem icon="📄" label="Assignments" />
            <FooterItem icon="💻" label="Projects" />
          </FooterColumn>

          {/* CONTACT */}
          <FooterColumn title="Contact">
            <motion.a
              href="mailto:ksjitesh17@gmail.com"
              className="flex items-center gap-3 text-sm"
              style={{ color: "var(--text-secondary)" }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Mail size={17} style={{ color: "var(--primary)" }} />
              <span className="transition-colors duration-200 hover:text-[#71d69a]">
                ksjitesh17@gmail.com
              </span>
            </motion.a>

            <motion.a
              href="https://instagram.com/k.s.jitesh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm"
              style={{ color: "var(--text-secondary)" }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span>📷</span>
              <span className="transition-colors duration-200 hover:text-[#71d69a]">
                @k.s.jitesh
              </span>
            </motion.a>

            <motion.button
              type="button"
              onClick={scrollToTop}
              className="mt-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow:
                  "0 12px 28px color-mix(in srgb, var(--primary) 16%, transparent)",
              }}
              whileHover={{
                y: -3,
                scale: 1.03,
                rotateX: 4,
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowUp size={16} />
              </motion.span>
              Back to Top
            </motion.button>
          </FooterColumn>
        </div>

        {/* BOTTOM BAR */}
        <motion.div
          className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <p>© {year} StudySphere. All Rights Reserved.</p>

          <motion.p
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Made with ❤️ by Jitesh
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: 7 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 900 }}
    >
      <h3
        className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h3>

      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}

function FooterLink({ to, label }) {
  return (
    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
      <Link
        to={to}
        className="block text-sm transition-colors duration-200 hover:text-[#71d69a]"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </Link>
    </motion.div>
  );
}

function FooterItem({ icon, label }) {
  return (
    <motion.div
      className="flex items-center gap-3 text-sm"
      style={{ color: "var(--text-secondary)" }}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        whileHover={{ scale: 1.12, rotateY: 12 }}
        transition={{ duration: 0.2 }}
        style={{ transformPerspective: 500 }}
      >
        {icon}
      </motion.span>

      <span>{label}</span>
    </motion.div>
  );
}

export default Footer;
