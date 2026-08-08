import Greeting from "../components/Greeting";
import SemesterGrid from "../components/SemesterGrid";
import LatestNotice from "../components/LatestNotice";

function Home() {
  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Main Dashboard Container */}

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-8 lg:px-10 lg:py-12">

        {/* Greeting */}

        <Greeting />

        {/* Semester Grid */}

        <SemesterGrid />

        {/* Latest Notice */}

        <LatestNotice />

      </div>
    </main>
  );
}

export default Home;