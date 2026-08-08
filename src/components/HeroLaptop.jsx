import {
  Bell,
  CalendarDays,
  FileText,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

function HeroLaptop() {
  return (
    <div className="relative hidden lg:flex items-center justify-center w-[620px] h-[620px]">

      {/* Glow */}

      <div className="absolute w-[520px] h-[520px] rounded-full bg-cyan-500/10 blur-[140px]" />

      {/* Laptop Screen */}

      <div
        className="relative w-[480px] rounded-[28px] border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden"
        style={{
          transform:
            "perspective(1500px) rotateY(-12deg) rotateX(8deg)",
        }}
      >
        {/* Top Bar */}

        <div className="h-10 bg-slate-800 flex items-center px-5 gap-2">

          <div className="w-3 h-3 rounded-full bg-red-400" />

          <div className="w-3 h-3 rounded-full bg-yellow-400" />

          <div className="w-3 h-3 rounded-full bg-green-400" />

        </div>

        {/* Screen */}

        <div className="p-8">

          <h2 className="text-3xl font-black text-cyan-400">
            StudySphere
          </h2>

          <p className="text-slate-400 mt-1">
            Latest Updates
          </p>

          <div className="mt-8 space-y-5">

            <div className="flex items-start gap-4">

              <Bell className="text-cyan-400 mt-1" />

              <div>

                <h3 className="font-semibold">
                  Important Notice
                </h3>

                <p className="text-slate-400 text-sm">
                  Semester examination schedule will be updated here.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <CalendarDays className="text-cyan-400 mt-1" />

              <div>

                <h3 className="font-semibold">
                  Upcoming Events
                </h3>

                <p className="text-slate-400 text-sm">
                  Internal tests, practicals and workshops.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <FileText className="text-cyan-400 mt-1" />

              <div>

                <h3 className="font-semibold">
                  Latest Notes
                </h3>

                <p className="text-slate-400 text-sm">
                  Newly uploaded notes will appear here.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <ClipboardList className="text-cyan-400 mt-1" />

              <div>

                <h3 className="font-semibold">
                  Assignments
                </h3>

                <p className="text-slate-400 text-sm">
                  Track assignment deadlines easily.
                </p>

              </div>

            </div>

          </div>

          <div className="mt-10 flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 p-4">

            <CheckCircle2 className="text-green-400" />

            <span className="text-green-300 font-medium">
              System Online
            </span>

          </div>

        </div>

      </div>


    </div>
  );
}

export default HeroLaptop;