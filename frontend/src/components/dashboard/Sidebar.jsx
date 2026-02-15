export default function Sidebar({
  menuItems,
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 lg:static ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} thin-scrollbar h-screen shrink-0 transform overflow-y-auto bg-linear-to-b from-slate-900 to-slate-800 text-white shadow-xl transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} `}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-6">
          {/* Logo - clickable to expand when collapsed */}
          <button
            onClick={() => sidebarCollapsed && setSidebarCollapsed(false)}
            className={`flex items-center ${sidebarCollapsed ? 'cursor-pointer transition-opacity hover:opacity-80' : 'cursor-default'}`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <i className="fas fa-receipt text-sm text-white"></i>
            </div>
            <h1
              className={`ml-3 text-xl font-bold tracking-tight ${sidebarCollapsed ? 'lg:hidden' : ''}`}
            >
              CHALAYO
            </h1>
          </button>

          <div className="flex items-center gap-2">
            {/* Desktop Toggle - Only show when NOT collapsed */}
            {!sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="hidden h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10 lg:flex"
                title="Collapse sidebar"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10 lg:hidden"
            >
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <ul className="space-y-1 p-3">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className={`flex cursor-pointer items-center rounded-xl px-4 py-3 transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              } ${sidebarCollapsed ? 'lg:group lg:relative lg:justify-center lg:px-0' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <i
                className={`fas ${item.icon} mr-3 w-5 text-center ${sidebarCollapsed ? 'lg:mr-0 lg:text-lg' : ''}`}
              ></i>
              <span
                className={`text-sm font-medium ${sidebarCollapsed ? 'lg:hidden' : ''}`}
              >
                {item.label}
              </span>

              {/* Tooltip for collapsed state - Desktop only */}
              {sidebarCollapsed && (
                <div className="pointer-events-none invisible absolute left-full z-50 ml-3 hidden rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:block">
                  {item.label}
                  <div className="absolute top-1/2 right-full mr-0 h-0 w-0 -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
