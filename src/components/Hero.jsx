import HeroLeft from "./HeroLeft";
import HeroLaptop from "./HeroLaptop";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0">

        <div className="absolute top-[-200px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[170px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[150px]" />

      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Content */}

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8">

        <HeroLeft />

        <HeroLaptop />

      </div>

    </section>
  );
}

export default Hero;