import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function SemesterCard({
  id,
  semester,
  subjects,
}) {
  return (
    <Link
      to={`/semester/${id}`}
      className="
        group
        relative
        block
        min-h-[320px]
        w-full
        min-w-0
        overflow-hidden
        rounded-[24px]
        border
        p-6
        transition-all
        duration-500
        ease-out
        hover:-translate-y-2
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.18)]
        sm:p-7
        lg:min-h-[350px]
        lg:p-8
      "
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          opacity-20
          blur-3xl
          transition-all
          duration-700
          group-hover:scale-125
          group-hover:opacity-40
        "
        style={{
          backgroundColor: "var(--accent)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-20
          h-72
          w-72
          rounded-full
          opacity-10
          blur-3xl
          transition-all
          duration-700
          group-hover:scale-110
          group-hover:opacity-20
        "
        style={{
          backgroundColor: "var(--accent)",
        }}
      />

      {/* =====================================================
          GIANT SEMESTER WATERMARK
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-4
          top-[-30px]
          select-none
          text-[150px]
          font-black
          leading-none
          tracking-[-0.09em]
          opacity-[0.035]
          transition-all
          duration-700
          group-hover:translate-x-2
          group-hover:opacity-[0.07]
          sm:text-[180px]
        "
        style={{
          color: "var(--text)",
        }}
      >
        {String(id).padStart(2, "0")}
      </div>

      {/* =====================================================
          TOP ROW
      ===================================================== */}

      <div className="relative z-10 flex items-start justify-between gap-4">

        {/* Semester label */}

        <div>
          <div className="flex items-center gap-2">

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                transition-all
                duration-500
                group-hover:rotate-3
              "
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
              }}
            >
              <BookOpen
                size={16}
                strokeWidth={1.8}
                style={{
                  color: "var(--accent)",
                }}
              />
            </div>

            <p
              className="text-[10px] font-bold uppercase tracking-[0.25em] sm:text-xs"
              style={{
                color: "var(--accent)",
              }}
            >
              {semester}
            </p>
          </div>
        </div>

        {/* Small status */}

        <div
          className="
            flex
            items-center
            gap-1.5
            rounded-full
            border
            px-3
            py-1.5
          "
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          <Sparkles
            size={11}
            style={{
              color: "var(--accent)",
            }}
          />

          <span
            className="text-[9px] font-medium tracking-wide"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            BCA
          </span>
        </div>
      </div>

      {/* =====================================================
          SUBJECT PREVIEW
      ===================================================== */}

      <div className="relative z-10 mt-9 sm:mt-10">

        {subjects.slice(0, 3).map((subject, index) => (
          <div
            key={subject}
            className="
              group/subject
              flex
              items-start
              gap-3
              border-b
              py-3.5
              last:border-b-0
              transition-all
              duration-300
            "
            style={{
              borderColor: "var(--border)",
            }}
          >
            {/* Number */}

            <span
              className="
                mt-0.5
                w-5
                shrink-0
                text-[10px]
                font-semibold
              "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              0{index + 1}
            </span>

            {/* Subject */}

            <p
              className="
                min-w-0
                break-words
                text-sm
                font-semibold
                leading-6
                transition-all
                duration-300
                group-hover/subject:translate-x-1
                sm:text-base
              "
              style={{
                color: "var(--text)",
              }}
            >
              {subject}
            </p>
          </div>
        ))}
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="relative z-10 mt-7 flex items-end justify-between gap-4 sm:mt-8">

        <div>
          <p
            className="text-[11px] leading-5"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {subjects.length} Subjects Available
          </p>

          <div className="mt-1 flex items-center gap-2">

            <span
              className="text-sm font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
              Explore Semester
            </span>

            <span
              className="
                h-px
                w-0
                transition-all
                duration-500
                group-hover:w-8
              "
              style={{
                backgroundColor: "var(--accent)",
              }}
            />
          </div>
        </div>

        {/* Arrow */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-500
            group-hover:translate-x-1
            group-hover:scale-110
          "
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg)",
          }}
        >
          <ArrowRight
            size={18}
            strokeWidth={1.8}
            className="
              transition-transform
              duration-500
              group-hover:translate-x-0.5
            "
            style={{
              color: "var(--accent)",
            }}
          />
        </div>
      </div>

      {/* =====================================================
          BOTTOM ACCENT LINE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-8
          right-8
          h-px
          origin-left
          scale-x-0
          transition-transform
          duration-700
          group-hover:scale-x-100
        "
        style={{
          backgroundColor: "var(--accent)",
        }}
      />

      {/* =====================================================
          CORNER GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          right-5
          h-2
          w-2
          rounded-full
          opacity-30
          transition-all
          duration-500
          group-hover:scale-[2]
          group-hover:opacity-80
        "
        style={{
          backgroundColor: "var(--accent)",
          boxShadow:
            "0 0 20px var(--accent)",
        }}
      />
    </Link>
  );
}

export default SemesterCard;