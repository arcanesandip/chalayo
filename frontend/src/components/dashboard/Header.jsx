export default function Header({ menuItems, activeTab, setSidebarOpen }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 shadow-sm md:px-6">
      {/* Left - Hamburger + Title */}
      <div className="flex flex-1 items-center space-x-3">
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-slate-100 lg:hidden"
        >
          <svg
            className="h-6 w-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
          {menuItems.find((item) => item.id === activeTab)?.label ||
            'Dashboard'}
        </h2>
      </div>

      {/* Center - Time and Date */}
      <div className="hidden flex-1 items-center justify-center space-x-3 lg:flex">
        <div className="flex items-center space-x-2 rounded-xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
          <i className="fas fa-clock text-slate-400"></i>
          <span className="font-mono font-medium">10:01 AM</span>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600">
          Today: February 14, 2026
        </div>
      </div>

      {/* Right - Profile only */}
      <div className="flex flex-1 items-center justify-end">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-lg md:h-10 md:w-10 md:text-base">
          S
        </div>
      </div>
    </div>
  );
}
