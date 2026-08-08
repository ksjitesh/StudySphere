import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ResourceCard({
  title,
  description,
  icon: Icon,
  link,
}) {
  return (
    <Link
      to={link}
      className="
        group
        block
        w-full
        min-w-0
        rounded-2xl
        border
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        sm:rounded-3xl
        sm:p-7
        lg:p-8
      "
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Top */}

      <div className="flex items-center justify-between gap-4">
        <div
          className="shrink-0 rounded-xl p-3 sm:rounded-2xl sm:p-4"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--primary) 12%, transparent)",
          }}
        >
          <Icon
            size={24}
            className="sm:h-7 sm:w-7"
            style={{ color: "var(--primary)" }}
          />
        </div>

        <ArrowRight
          size={20}
          className="
            shrink-0
            transition-transform
            duration-300
            group-hover:translate-x-2
            sm:h-[22px]
            sm:w-[22px]
          "
          style={{ color: "var(--primary)" }}
        />
      </div>

      {/* Title */}

      <h2
        className="
          mt-6
          break-words
          text-2xl
          font-bold
          leading-tight
          transition-colors
          duration-300
          sm:mt-8
          sm:text-3xl
        "
        style={{ color: "var(--text)" }}
      >
        {title}
      </h2>

      {/* Description */}

      <p
        className="
          mt-2
          break-words
          text-sm
          leading-6
          transition-colors
          duration-300
          sm:mt-3
          sm:text-base
          sm:leading-7
        "
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>
    </Link>
  );
}

export default ResourceCard;