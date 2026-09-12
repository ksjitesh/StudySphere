import FantasyHero from "../components/FantasyHero";
import CinematicJourney from "../components/CinematicJourney";
import LatestNotice from "../components/LatestNotice";

function Home() {
  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <FantasyHero />

      <CinematicJourney />

      <section
        className="relative w-full px-5 py-8 sm:px-8 sm:py-10 lg:px-12 xl:px-16"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <LatestNotice />
        </div>
      </section>
    </main>
  );
}

export default Home;