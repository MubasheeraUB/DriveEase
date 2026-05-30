import {
  FaBars,
  FaBell,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="h-24 border-b border-white/5 px-8 flex items-center justify-between">

      <div className="flex items-center gap-6">
        <button className="text-2xl text-slate-300">
          <FaBars />
        </button>

        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-400">
            Welcome back, Admin!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative">
          <FaSearch className="absolute right-4 top-4 text-slate-400" />

          <input
            placeholder="Search anything..."
            className="
              bg-white/5
              border
              border-white/5
              rounded-2xl
              h-14
              w-80
              px-5
              outline-none
            "
          />
        </div>

        <button className="relative h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center">
          <FaBell />

          <span className="absolute -top-1 -right-1 bg-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        <div className="bg-white/5 rounded-2xl px-5 py-3">
          <div className="font-semibold">
            21 May 2025
          </div>

          <div className="text-xs text-slate-400">
            Wednesday
          </div>
        </div>
      </div>
    </header>
  );
}