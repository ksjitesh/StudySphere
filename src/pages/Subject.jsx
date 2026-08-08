import ResourceHub from "../components/ResourceHub";

function Subject() {
  return (
    <main
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <ResourceHub />
      </div>
    </main>
  );
}

export default Subject;