import Greeting from "../components/Greeting";
import SemesterGrid from "../components/SemesterGrid";
import LatestNotice from "../components/LatestNotice";
import RecentUploads from "../components/RecentUploads";
import UpcomingExams from "../components/UpcomingExams";

function Home() {
  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Main Dashboard Container */}

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-10">

        {/* Greeting */}

        <Greeting />

        {/* Semester Grid */}

        <SemesterGrid />

        {/* Latest Notice */}

        <LatestNotice />

        {/* Recent Uploads */}

        <RecentUploads />

        {/* Upcoming Exams */}

        <UpcomingExams />

      </div>
    </main>
  );
}

export default Home;