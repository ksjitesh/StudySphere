import SubjectGrid from "../components/SubjectGrid";

function Subjects() {
  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <SubjectGrid />
      </div>
    </main>
  );
}

export default Subjects;