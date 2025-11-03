import { LayoutDashboard, Users } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 grid place-items-center text-white">
            <LayoutDashboard size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Task Manager Dashboard</h1>
            <p className="text-xs text-gray-500">Real-time ready • Clean and responsive</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={18} />
          <span className="text-sm">Multi-user</span>
        </div>
      </div>
    </header>
  );
}
