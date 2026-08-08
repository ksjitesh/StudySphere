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
        rounded-3xl
        border
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Top */}

      <div className="flex items-center justify-between">

        <div
          className="rounded-2xl p-4"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--primary) 12%, transparent)",
          }}
        >
          <Icon
            size={28}
            style={{ color: "var(--primary)" }}
          />
        </div>

        <ArrowRight
          size={22}
          style={{ color: "var(--primary)" }}
          className="transition-transform duration-300 group-hover:translate-x-2"
        />

      </div>

      {/* Title */}

      <h2
        className="mt-8 text-3xl font-bold transition-colors duration-300"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h2>

      {/* Description */}

      <p
        className="mt-3 leading-7 transition-colors duration-300"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>

    </Link>
  );
}

export default ResourceCard;