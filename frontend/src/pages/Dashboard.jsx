import { useState } from 'react';

// Modal Component - Defined outside to prevent re-creation on every render
const Modal = ({ isOpen, onClose, title, children, footer, tabs }) => {
  if (!isOpen) return null;

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="animate-slideUp max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 md:px-6">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
          >
            <i className="fas fa-times text-slate-500"></i>
          </button>
        </div>

        {tabs && (
          <div className="flex overflow-x-auto border-b border-slate-200 px-4 md:px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => tab.onClick()}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  tab.active
                    ? 'text-emerald-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {tab.active && (
                  <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-emerald-600"></div>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="max-h-[calc(90vh-200px)] overflow-y-auto p-4 md:p-6">
          {children}
        </div>

        {footer && (
          <div className="flex flex-col items-stretch justify-end gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center md:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
export default function InvoiceProApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showClientModal, setShowClientModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [clientTab, setClientTab] = useState('client-info');
  const [lowStockAlert, setLowStockAlert] = useState(false);
  const [clientType, setClientType] = useState('CUSTOMER');
  const [balanceType, setBalanceType] = useState('TORECEIVE');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile overlay
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop collapse

  const products = [
    {
      id: 1,
      name: 'Product A',
      category: 'Electronics',
      cost: 100,
      price: 150,
      quantity: 50,
      status: 'In Stock',
    },
    {
      id: 2,
      name: 'Product B',
      category: 'Clothing',
      cost: 50,
      price: 80,
      quantity: 30,
      status: 'Low Stock',
    },
    {
      id: 3,
      name: 'Product C',
      category: 'Electronics',
      cost: 200,
      price: 300,
      quantity: 20,
      status: 'In Stock',
    },
  ];

  const clients = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      invoices: 5,
      totalSpent: 5000,
    },
  ];

  const menuItems = [
    { id: 'dashboard', icon: 'fa-home', label: 'Dashboard' },
    { id: 'clients', icon: 'fa-users', label: 'Customers' },
    { id: 'products', icon: 'fa-box', label: 'Products' },
    { id: 'invoices', icon: 'fa-receipt', label: 'Sales' },
    { id: 'expenses', icon: 'fa-money-bill-wave', label: 'Expenses' },
    { id: 'purchase', icon: 'fa-tags', label: 'Purchase' },
    { id: 'stock', icon: 'fa-warehouse', label: 'Stock / Inventory' },
    { id: 'suppliers', icon: 'fa-truck', label: 'Suppliers' },
    { id: 'reports', icon: 'fa-chart-bar', label: 'Reports' },
    { id: 'returns', icon: 'fa-undo-alt', label: 'Returns' },
    { id: 'trash', icon: 'fa-trash-arrow-up', label: 'Trash Recover' },
    { id: 'ai-assistant', icon: 'fa-robot', label: 'AI Assistant' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        body {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out;
        }

        .thin-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .thin-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Tooltip animation */
        @keyframes tooltipFade {
          from {
            opacity: 0;
            transform: translateX(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

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

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
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

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="thin-scrollbar flex-1 overflow-auto p-4 md:p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column */}
              <div className="space-y-6 lg:col-span-2">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    {
                      label: 'To Receive',
                      value: '0',
                      icon: 'fa-arrow-down',
                      color: 'emerald',
                      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
                      iconBg: 'bg-emerald-500',
                      textColor: 'text-emerald-600',
                    },
                    {
                      label: 'To Give',
                      value: '0',
                      icon: 'fa-arrow-up',
                      color: 'rose',
                      bg: 'bg-gradient-to-br from-rose-50 to-rose-100',
                      iconBg: 'bg-rose-500',
                      textColor: 'text-rose-600',
                    },
                    {
                      label: 'Sales',
                      value: '0',
                      icon: 'fa-cart-shopping',
                      color: 'blue',
                      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
                      iconBg: 'bg-blue-500',
                      textColor: 'text-blue-600',
                    },
                    {
                      label: 'Expense',
                      value: '0',
                      icon: 'fa-wallet',
                      color: 'amber',
                      bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
                      iconBg: 'bg-amber-500',
                      textColor: 'text-amber-600',
                    },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`${stat.bg} animate-slideInLeft cursor-pointer rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-xl`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-600">
                          {stat.label}
                        </p>
                        <div
                          className={`h-8 w-8 ${stat.iconBg} flex items-center justify-center rounded-xl shadow-lg`}
                        >
                          <i
                            className={`fas ${stat.icon} text-xs text-white`}
                          ></i>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {stat.value}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Income vs Expense Chart */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Income vs Expense
                    </h3>
                    <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                      <option>This Week</option>
                      <option>This Month</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div className="flex h-48 items-end space-x-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                      const heights = [80, 70, 90, 75, 85, 65, 50];
                      const expenseHeights = [40, 45, 35, 50, 30, 55, 40];
                      return (
                        <div
                          key={idx}
                          className="flex flex-1 flex-col items-center gap-1"
                        >
                          <div className="flex w-full justify-center gap-1">
                            <div
                              className="w-3 rounded-t bg-linear-to-t from-emerald-400 to-emerald-500 transition-all duration-500 hover:from-emerald-500 hover:to-emerald-600"
                              style={{ height: `${heights[idx]}%` }}
                            ></div>
                            <div
                              className="w-3 rounded-t bg-linear-to-t from-rose-400 to-rose-500 transition-all duration-500 hover:from-rose-500 hover:to-rose-600"
                              style={{ height: `${expenseHeights[idx]}%` }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium text-slate-500">
                            {day}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-6 border-t border-slate-200 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-slate-600">Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                      <span className="text-sm text-slate-600">Expense</span>
                    </div>
                  </div>
                </div>

                {/* Recent Bills Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Recent Bills
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <i className="fas fa-search absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-slate-400"></i>
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-40 rounded-lg border border-slate-300 py-2 pr-3 pl-9 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <button className="px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr className="text-slate-600">
                          <th className="px-4 py-3 text-left font-semibold">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            Total
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            Rec/Paid
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td
                            colSpan="6"
                            className="py-8 text-center text-slate-500"
                          >
                            No recent bills to display
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Quick Actions */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h4 className="mb-3 text-sm font-semibold text-slate-900">
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Add Product', icon: 'fa-plus', primary: true },
                      { label: 'View Stock', icon: 'fa-box' },
                      { label: 'Categories', icon: 'fa-tags' },
                      { label: 'Analytics', icon: 'fa-chart-line' },
                    ].map((action) => (
                      <button
                        key={action.label}
                        className={`text-xs ${
                          action.primary
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        } flex items-center justify-center gap-2 rounded-xl p-3 font-medium transition-all duration-200`}
                      >
                        <i className={`fas ${action.icon}`}></i>
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Today's Summary */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Today's Summary
                    </h4>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                      +12%
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: 'Revenue',
                        value: '$4,850',
                        color: 'text-emerald-600',
                      },
                      {
                        label: 'Expenses',
                        value: '$1,230',
                        color: 'text-rose-600',
                      },
                      {
                        label: 'Profit',
                        value: '$3,620',
                        color: 'text-emerald-600',
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-slate-600">
                          {item.label}
                        </span>
                        <span className={`text-sm font-semibold ${item.color}`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 p-4">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Recent Activity
                    </h3>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                      Live
                    </span>
                  </div>
                  <div className="p-4 text-center text-sm text-slate-500">
                    No recent activity
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="border-b border-slate-200 bg-white px-4 py-4 md:px-6">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => setShowProductModal(true)}
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:bg-emerald-600 sm:w-auto sm:justify-start"
                >
                  <i className="fas fa-plus mr-2 text-xs"></i>
                  Add New
                </button>
                <button className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:justify-start">
                  <i className="fas fa-file-import mr-2 text-xs"></i>
                  Import
                </button>
                <button className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:justify-start">
                  <i className="fas fa-file-export mr-2 text-xs"></i>
                  Export
                </button>

                <div className="flex w-full flex-col items-stretch gap-3 sm:ml-auto sm:w-auto sm:flex-row sm:items-center">
                  <div className="relative">
                    <i className="fas fa-search absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-slate-400"></i>
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full rounded-xl border border-slate-300 py-2 pr-3 pl-9 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none sm:w-48"
                    />
                  </div>
                  <select className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="thin-scrollbar flex-1 overflow-auto p-4 md:p-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 md:px-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Products List
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                      <i className="fas fa-sync-alt mr-2"></i>
                      Refresh
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="text-slate-600">
                        <th className="px-4 py-3 text-left font-semibold">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500"
                          />
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Cost
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="transition-colors hover:bg-slate-50"
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            />
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {product.name}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {product.category}
                          </td>
                          <td className="px-4 py-3 font-mono text-slate-600">
                            ${product.cost}
                          </td>
                          <td className="px-4 py-3 font-mono font-semibold text-slate-900">
                            ${product.price}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {product.quantity}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                product.status === 'In Stock'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row md:px-6">
                  <div className="text-center text-sm text-slate-600 sm:text-left">
                    Showing{' '}
                    <span className="font-medium">{products.length}</span> of{' '}
                    <span className="font-medium">{products.length}</span>{' '}
                    products
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-slate-300 px-2 py-2 text-xs transition-colors hover:bg-slate-50 sm:px-3 sm:text-sm">
                      Previous
                    </button>
                    <button className="rounded-lg bg-emerald-500 px-2 py-2 text-xs text-white transition-colors hover:bg-emerald-600 sm:px-3 sm:text-sm">
                      1
                    </button>
                    <button className="rounded-lg border border-slate-300 px-2 py-2 text-xs transition-colors hover:bg-slate-50 sm:px-3 sm:text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="border-b border-slate-200 bg-white px-4 py-4 md:px-6">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => setShowClientModal(true)}
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:bg-emerald-600 sm:w-auto sm:justify-start"
                >
                  <i className="fas fa-plus mr-2 text-xs"></i>
                  Add New
                </button>
                <button className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:justify-start">
                  <i className="fas fa-file-import mr-2 text-xs"></i>
                  Import
                </button>
                <button className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:justify-start">
                  <i className="fas fa-file-export mr-2 text-xs"></i>
                  Export
                </button>

                <div className="w-full sm:ml-auto sm:w-auto">
                  <div className="relative">
                    <i className="fas fa-search absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-slate-400"></i>
                    <input
                      type="text"
                      placeholder="Search clients..."
                      className="w-full rounded-xl border border-slate-300 py-2 pr-3 pl-9 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none sm:w-48"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-5 md:px-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: 'Total Clients',
                    value: clients.length,
                    icon: 'fa-users',
                    color: 'blue',
                  },
                  {
                    label: 'Active Clients',
                    value: clients.length,
                    icon: 'fa-star',
                    color: 'emerald',
                  },
                  {
                    label: 'Total Invoices',
                    value: '0',
                    icon: 'fa-file-invoice',
                    color: 'purple',
                  },
                  {
                    label: 'Total Revenue',
                    value: '$0',
                    icon: 'fa-dollar-sign',
                    color: 'emerald',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="mb-1 text-xs text-slate-600">
                          {stat.label}
                        </p>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {stat.value}
                        </h3>
                      </div>
                      <div
                        className={`h-10 w-10 bg-${stat.color}-50 flex items-center justify-center rounded-xl`}
                      >
                        <i
                          className={`fas ${stat.icon} text-${stat.color}-500`}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="thin-scrollbar flex-1 overflow-auto p-4 md:p-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-4 py-4 md:px-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    All Clients
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="text-slate-600">
                        <th className="px-4 py-3 text-left font-semibold">
                          Client ID
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Phone
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Total Invoices
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Total Spent
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {clients.map((client) => (
                        <tr
                          key={client.id}
                          className="transition-colors hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 font-mono text-slate-600">
                            #{client.id}
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {client.name}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {client.email}
                          </td>
                          <td className="px-4 py-3 font-mono text-slate-600">
                            {client.phone}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {client.invoices}
                          </td>
                          <td className="px-4 py-3 font-mono font-semibold text-slate-900">
                            ${client.totalSpent}
                          </td>
                          <td className="px-4 py-3">
                            <button className="mr-2 text-emerald-600 hover:text-emerald-700">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="text-rose-600 hover:text-rose-700">
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="mx-auto h-56 w-48">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-44 w-44 rounded-full bg-slate-100"></div>
                  </div>
                  <div className="relative mx-auto h-40 w-32 rounded-2xl bg-white shadow-sm">
                    <div className="h-10 space-y-1 rounded-t-2xl bg-slate-400 px-3 py-2">
                      <div className="h-1.5 w-8 rounded bg-white"></div>
                      <div className="h-1.5 w-12 rounded bg-white/80"></div>
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="h-1.5 w-20 rounded bg-slate-300"></div>
                      <div className="h-1.5 w-24 rounded bg-slate-300"></div>
                      <div className="h-1.5 w-16 rounded bg-slate-300"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Create Expense
              </h2>
              <button
                onClick={() => setShowExpenseModal(true)}
                className="rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-teal-700"
              >
                + Add New Expense
              </button>
            </div>
          </div>
        )}

        {/* Purchase Tab */}
        {activeTab === 'purchase' && (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="mx-auto h-56 w-48">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-44 w-44 rounded-full bg-slate-100"></div>
                  </div>
                  <div className="relative mx-auto h-40 w-32 rounded-2xl bg-white shadow-sm">
                    <div className="h-10 space-y-1 rounded-t-2xl bg-slate-400 px-3 py-2">
                      <div className="h-1.5 w-8 rounded bg-white"></div>
                      <div className="h-1.5 w-12 rounded bg-white/80"></div>
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="h-1.5 w-20 rounded bg-slate-300"></div>
                      <div className="h-1.5 w-24 rounded bg-slate-300"></div>
                      <div className="h-1.5 w-16 rounded bg-slate-300"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Create Purchase
              </h2>
              <button className="rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-teal-700">
                + Add New Purchase
              </button>
            </div>
          </div>
        )}

        {/* Other tabs - placeholder */}
        {!['dashboard', 'products', 'clients', 'expenses', 'purchase'].includes(
          activeTab
        ) && (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                <i
                  className={`fas ${menuItems.find((item) => item.id === activeTab)?.icon} text-3xl text-slate-400`}
                ></i>
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-slate-900">
                {menuItems.find((item) => item.id === activeTab)?.label}
              </h2>
              <p className="text-slate-600">
                This section is under construction
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={showClientModal}
        onClose={() => setShowClientModal(false)}
        title="Add New Client"
        tabs={[
          {
            id: 'client-info',
            label: 'Client Info',
            active: clientTab === 'client-info',
            onClick: () => setClientTab('client-info'),
          },
          {
            id: 'additional-info',
            label: 'Additional Info',
            active: clientTab === 'additional-info',
            onClick: () => setClientTab('additional-info'),
          },
        ]}
        footer={
          <>
            <button
              onClick={() => setShowClientModal(false)}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-600">
              Save Client
            </button>
          </>
        }
      >
        {clientTab === 'client-info' && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Client Name *
              </label>
              <input
                type="text"
                placeholder="Enter client name"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Client Type
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setClientType('CUSTOMER')}
                  className={`rounded-xl border px-4 py-2.5 font-medium transition-all ${
                    clientType === 'CUSTOMER'
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Customer
                </button>
                <button
                  onClick={() => setClientType('SUPPLIER')}
                  className={`rounded-xl border px-4 py-2.5 font-medium transition-all ${
                    clientType === 'SUPPLIER'
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Supplier
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Opening Balance
              </label>
              <input
                type="number"
                placeholder="Rs. 0"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setBalanceType('TORECEIVE')}
                className={`rounded-xl border px-4 py-2.5 font-medium transition-all ${
                  balanceType === 'TORECEIVE'
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                To Receive
              </button>
              <button
                onClick={() => setBalanceType('TOGIVE')}
                className={`rounded-xl border px-4 py-2.5 font-medium transition-all ${
                  balanceType === 'TOGIVE'
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                To Give
              </button>
            </div>
          </div>
        )}

        {clientTab === 'additional-info' && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Address
              </label>
              <textarea
                rows="3"
                placeholder="Enter address"
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  PAN Number
                </label>
                <input
                  type="text"
                  placeholder="Enter PAN Number"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Product Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title="Add New Product"
        footer={
          <>
            <button
              onClick={() => setShowProductModal(false)}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-600">
              Save Product
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Product Name *
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Product Quantity
            </label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Cost Price ($) *
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Selling Price ($) *
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>
              <input
                type="text"
                placeholder="Type category"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-slate-900">
                Low Stock Alert
              </h3>
              <i className="fas fa-info-circle text-xs text-slate-400"></i>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={lowStockAlert}
                onChange={(e) => setLowStockAlert(e.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-300 peer-checked:bg-emerald-500 peer-focus:ring-2 peer-focus:ring-emerald-500 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>

          {lowStockAlert && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Low Stock Quantity
              </label>
              <input
                type="number"
                placeholder="Enter stock quantity"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          )}
        </div>
      </Modal>

      {/* Add Expense Modal */}
      <Modal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        title="Add Expense"
        footer={
          <button className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-600">
            Save Expense
          </button>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Expense No
              </label>
              <input
                type="text"
                readOnly
                value="#EXP001"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Expense Category
            </label>
            <input
              type="text"
              placeholder="Select or type category"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Total Amount
              </label>
              <input
                type="number"
                placeholder="Rs. 0"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Payment Method
              </label>
              <input
                type="text"
                placeholder="Cash"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Remarks
            </label>
            <textarea
              rows="3"
              placeholder="Enter remarks"
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}
