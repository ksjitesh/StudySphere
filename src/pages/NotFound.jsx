import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {

  return (

    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        px-6
      "
      style={{
        backgroundColor: "var(--bg)",
      }}
    >

      <div className="w-full max-w-2xl text-center">

        <p
          className="
            text-8xl
            font-black
            tracking-tight
          "
          style={{
            color: "var(--primary)",
          }}
        >
          404
        </p>

        <h1
          className="
            mt-6
            text-4xl
            font-bold
          "
          style={{
            color: "var(--text)",
          }}
        >
          Page Not Found
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-lg
            text-lg
            leading-7
          "
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Sorry, the page you're looking for doesn't
          exist or may have been moved.
        </p>
                <div
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-center
            gap-4
            sm:flex-row
          "
        >

          {/* Go Home */}

          <Link
            to="/"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              px-6
              py-3.5
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
            style={{
              backgroundColor: "var(--primary)",
            }}
          >

            <Home size={19} />

            Back to Home

          </Link>

          {/* Go Back */}

          <button
            type="button"
            onClick={() => window.history.back()}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              px-6
              py-3.5
              font-semibold
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >

            <ArrowLeft size={19} />

            Go Back

          </button>

        </div>

      </div>

    </main>

  );

}

export default NotFound;