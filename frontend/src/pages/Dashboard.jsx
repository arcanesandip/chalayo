import { useState } from 'react';

// Modal Component - Defined outside to prevent re-creation on every render
const Modal = ({ isOpen, onClose, title, children, footer, tabs }) => {
    if (!isOpen) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              <i className="fas fa-times text-slate-500"></i>
            </button>
          </div>

          {tabs && (
            <div className="flex border-b border-slate-200 px-4 md:px-6 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => tab.onClick()}
                  className={`px-4 py-3 text-sm font-medium relative transition-colors ${
                    tab.active 
                      ? 'text-emerald-600' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                  {tab.active && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {children}
          </div>

          {footer && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 px-4 md:px-6 py-4 border-t border-slate-200">
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
    { id: 1, name: 'Product A', category: 'Electronics', cost: 100, price: 150, quantity: 50, status: 'In Stock' },
    { id: 2, name: 'Product B', category: 'Clothing', cost: 50, price: 80, quantity: 30, status: 'Low Stock' },
    { id: 3, name: 'Product C', category: 'Electronics', cost: 200, price: 300, quantity: 20, status: 'In Stock' }
  ];

  const clients = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', invoices: 5, totalSpent: 5000 }
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
    { id: 'settings', icon: 'fa-cog', label: 'Settings' }
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} bg-gradient-to-b from-slate-900 to-slate-800 text-white 
        flex-shrink-0 h-screen overflow-y-auto thin-scrollbar shadow-xl
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
          {/* Logo - clickable to expand when collapsed */}
          <button
            onClick={() => sidebarCollapsed && setSidebarCollapsed(false)}
            className={`flex items-center ${sidebarCollapsed ? 'cursor-pointer hover:opacity-80 transition-opacity' : 'cursor-default'}`}
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-receipt text-white text-sm"></i>
            </div>
            <h1 className={`text-xl font-bold tracking-tight ml-3 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>CHALAYO</h1>
          </button>
          
          <div className="flex items-center gap-2">
            {/* Desktop Toggle - Only show when NOT collapsed */}
            {!sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                title="Collapse sidebar"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <ul className="p-3 space-y-1">
          {menuItems.map((item, index) => (
            <li 
              key={item.id}
              className={`flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'hover:bg-white/5 text-slate-300 hover:text-white'
              } ${sidebarCollapsed ? 'lg:justify-center lg:px-0 lg:group lg:relative' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <i className={`fas ${item.icon} w-5 text-center mr-3 ${sidebarCollapsed ? 'lg:text-lg lg:mr-0' : ''}`}></i>
              <span className={`font-medium text-sm ${sidebarCollapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
              
              {/* Tooltip for collapsed state - Desktop only */}
              {sidebarCollapsed && (
                <div className="hidden lg:block absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-slate-700">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 mr-0 w-0 h-0 border-4 border-transparent border-r-slate-800"></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm">
          {/* Left - Hamburger + Title */}
          <div className="flex items-center space-x-3 flex-1">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>

          {/* Center - Time and Date */}
          <div className="hidden lg:flex items-center space-x-3 flex-1 justify-center">
            <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-xl">
              <i className="fas fa-clock text-slate-400"></i>
              <span className="font-mono font-medium">10:01 AM</span>
            </div>
            <div className="text-xs bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl font-medium border border-emerald-100">
              Today: February 14, 2026
            </div>
          </div>

          {/* Right - Profile only */}
          <div className="flex items-center justify-end flex-1">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg text-sm md:text-base">
              S
            </div>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="flex-1 overflow-auto p-4 md:p-6 thin-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { label: 'To Receive', value: '0', icon: 'fa-arrow-down', color: 'emerald', bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100', iconBg: 'bg-emerald-500', textColor: 'text-emerald-600' },
                    { label: 'To Give', value: '0', icon: 'fa-arrow-up', color: 'rose', bg: 'bg-gradient-to-br from-rose-50 to-rose-100', iconBg: 'bg-rose-500', textColor: 'text-rose-600' },
                    { label: 'Sales', value: '0', icon: 'fa-cart-shopping', color: 'blue', bg: 'bg-gradient-to-br from-blue-50 to-blue-100', iconBg: 'bg-blue-500', textColor: 'text-blue-600' },
                    { label: 'Expense', value: '0', icon: 'fa-wallet', color: 'amber', bg: 'bg-gradient-to-br from-amber-50 to-amber-100', iconBg: 'bg-amber-500', textColor: 'text-amber-600' }
                  ].map((stat, index) => (
                    <div 
                      key={stat.label}
                      className={`${stat.bg} rounded-2xl p-4 hover:shadow-xl transition-all duration-300 cursor-pointer animate-slideInLeft shadow-sm`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-slate-600 font-medium">{stat.label}</p>
                        <div className={`w-8 h-8 ${stat.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                          <i className={`fas ${stat.icon} text-xs text-white`}></i>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                    </div>
                  ))}
                </div>

                {/* Income vs Expense Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-slate-900">Income vs Expense</h3>
                    <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option>This Week</option>
                      <option>This Month</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div className="h-48 flex items-end space-x-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                      const heights = [80, 70, 90, 75, 85, 65, 50];
                      const expenseHeights = [40, 45, 35, 50, 30, 55, 40];
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full flex justify-center gap-1">
                            <div 
                              className="w-3 bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-t transition-all duration-500 hover:from-emerald-500 hover:to-emerald-600" 
                              style={{ height: `${heights[idx]}%` }}
                            ></div>
                            <div 
                              className="w-3 bg-gradient-to-t from-rose-400 to-rose-500 rounded-t transition-all duration-500 hover:from-rose-500 hover:to-rose-600" 
                              style={{ height: `${expenseHeights[idx]}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-500 font-medium">{day}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-slate-600">Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <span className="text-sm text-slate-600">Expense</span>
                    </div>
                  </div>
                </div>

                {/* Recent Bills Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Recent Bills</h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input 
                          type="text" 
                          placeholder="Search..." 
                          className="pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-40"
                        />
                      </div>
                      <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium px-3 py-2">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr className="text-slate-600">
                          <th className="py-3 px-4 text-left font-semibold">Date</th>
                          <th className="py-3 px-4 text-left font-semibold">Type</th>
                          <th className="py-3 px-4 text-left font-semibold">Name</th>
                          <th className="py-3 px-4 text-left font-semibold">Total</th>
                          <th className="py-3 px-4 text-left font-semibold">Rec/Paid</th>
                          <th className="py-3 px-4 text-left font-semibold">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td colSpan="6" className="py-8 text-center text-slate-500">
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
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Add Product', icon: 'fa-plus', primary: true },
                      { label: 'View Stock', icon: 'fa-box' },
                      { label: 'Categories', icon: 'fa-tags' },
                      { label: 'Analytics', icon: 'fa-chart-line' }
                    ].map((action) => (
                      <button 
                        key={action.label}
                        className={`text-xs ${
                          action.primary 
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        } p-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 font-medium`}
                      >
                        <i className={`fas ${action.icon}`}></i>
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Today's Summary */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-slate-900">Today's Summary</h4>
                    <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Revenue', value: '$4,850', color: 'text-emerald-600' },
                      { label: 'Expenses', value: '$1,230', color: 'text-rose-600' },
                      { label: 'Profit', value: '$3,620', color: 'text-emerald-600' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{item.label}</span>
                        <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
                    <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">Live</span>
                  </div>
                  <div className="p-4 text-center text-slate-500 text-sm">
                    No recent activity
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button 
                  onClick={() => setShowProductModal(true)}
                  className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium flex items-center transition-all duration-200 shadow-lg shadow-emerald-500/30 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <i className="fas fa-plus text-xs mr-2"></i>
                  Add New
                </button>
                <button className="text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-medium flex items-center transition-colors w-full sm:w-auto justify-center sm:justify-start">
                  <i className="fas fa-file-import text-xs mr-2"></i>
                  Import
                </button>
                <button className="text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-medium flex items-center transition-colors w-full sm:w-auto justify-center sm:justify-start">
                  <i className="fas fa-file-export text-xs mr-2"></i>
                  Export
                </button>

                <div className="w-full sm:w-auto sm:ml-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      className="pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-48"
                    />
                  </div>
                  <select className="text-sm border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 md:p-6 thin-scrollbar">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-4 md:px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Products List</h3>
                  <div className="flex items-center gap-2">
                    <button className="text-sm text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <i className="fas fa-sync-alt mr-2"></i>
                      Refresh
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="text-slate-600">
                        <th className="py-3 px-4 text-left font-semibold">
                          <input type="checkbox" className="rounded border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500" />
                        </th>
                        <th className="py-3 px-4 text-left font-semibold">Product</th>
                        <th className="py-3 px-4 text-left font-semibold">Category</th>
                        <th className="py-3 px-4 text-left font-semibold">Cost</th>
                        <th className="py-3 px-4 text-left font-semibold">Price</th>
                        <th className="py-3 px-4 text-left font-semibold">Quantity</th>
                        <th className="py-3 px-4 text-left font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4">
                            <input type="checkbox" className="rounded border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500" />
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-900">{product.name}</td>
                          <td className="py-3 px-4 text-slate-600">{product.category}</td>
                          <td className="py-3 px-4 text-slate-600 font-mono">${product.cost}</td>
                          <td className="py-3 px-4 text-slate-900 font-mono font-semibold">${product.price}</td>
                          <td className="py-3 px-4 text-slate-600">{product.quantity}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === 'In Stock' 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 md:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-sm text-slate-600 text-center sm:text-left">
                    Showing <span className="font-medium">{products.length}</span> of <span className="font-medium">{products.length}</span> products
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs sm:text-sm border border-slate-300 rounded-lg px-2 sm:px-3 py-2 hover:bg-slate-50 transition-colors">
                      Previous
                    </button>
                    <button className="text-xs sm:text-sm bg-emerald-500 text-white rounded-lg px-2 sm:px-3 py-2 hover:bg-emerald-600 transition-colors">
                      1
                    </button>
                    <button className="text-xs sm:text-sm border border-slate-300 rounded-lg px-2 sm:px-3 py-2 hover:bg-slate-50 transition-colors">
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
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button 
                  onClick={() => setShowClientModal(true)}
                  className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium flex items-center transition-all duration-200 shadow-lg shadow-emerald-500/30 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <i className="fas fa-plus text-xs mr-2"></i>
                  Add New
                </button>
                <button className="text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-medium flex items-center transition-colors w-full sm:w-auto justify-center sm:justify-start">
                  <i className="fas fa-file-import text-xs mr-2"></i>
                  Import
                </button>
                <button className="text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-medium flex items-center transition-colors w-full sm:w-auto justify-center sm:justify-start">
                  <i className="fas fa-file-export text-xs mr-2"></i>
                  Export
                </button>

                <div className="w-full sm:w-auto sm:ml-auto">
                  <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input 
                      type="text" 
                      placeholder="Search clients..." 
                      className="pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-48"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 md:px-6 py-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Clients', value: clients.length, icon: 'fa-users', color: 'blue' },
                  { label: 'Active Clients', value: clients.length, icon: 'fa-star', color: 'emerald' },
                  { label: 'Total Invoices', value: '0', icon: 'fa-file-invoice', color: 'purple' },
                  { label: 'Total Revenue', value: '$0', icon: 'fa-dollar-sign', color: 'emerald' }
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                      </div>
                      <div className={`w-10 h-10 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}>
                        <i className={`fas ${stat.icon} text-${stat.color}-500`}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 md:p-6 thin-scrollbar">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-4 md:px-6 py-4 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">All Clients</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="text-slate-600">
                        <th className="py-3 px-4 text-left font-semibold">Client ID</th>
                        <th className="py-3 px-4 text-left font-semibold">Name</th>
                        <th className="py-3 px-4 text-left font-semibold">Email</th>
                        <th className="py-3 px-4 text-left font-semibold">Phone</th>
                        <th className="py-3 px-4 text-left font-semibold">Total Invoices</th>
                        <th className="py-3 px-4 text-left font-semibold">Total Spent</th>
                        <th className="py-3 px-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {clients.map((client) => (
                        <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-mono text-slate-600">#{client.id}</td>
                          <td className="py-3 px-4 font-medium text-slate-900">{client.name}</td>
                          <td className="py-3 px-4 text-slate-600">{client.email}</td>
                          <td className="py-3 px-4 font-mono text-slate-600">{client.phone}</td>
                          <td className="py-3 px-4 text-slate-600">{client.invoices}</td>
                          <td className="py-3 px-4 text-slate-900 font-mono font-semibold">${client.totalSpent}</td>
                          <td className="py-3 px-4">
                            <button className="text-emerald-600 hover:text-emerald-700 mr-2">
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
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-6 relative">
                <div className="w-48 h-56 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 rounded-full bg-slate-100"></div>
                  </div>
                  <div className="relative w-32 h-40 mx-auto bg-white rounded-2xl shadow-sm">
                    <div className="h-10 bg-slate-400 rounded-t-2xl px-3 py-2 space-y-1">
                      <div className="w-8 h-1.5 bg-white rounded"></div>
                      <div className="w-12 h-1.5 bg-white/80 rounded"></div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="w-20 h-1.5 bg-slate-300 rounded"></div>
                      <div className="w-24 h-1.5 bg-slate-300 rounded"></div>
                      <div className="w-16 h-1.5 bg-slate-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Create Expense</h2>
              <button 
                onClick={() => setShowExpenseModal(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
              >
                + Add New Expense
              </button>
            </div>
          </div>
        )}

        {/* Purchase Tab */}
        {activeTab === 'purchase' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-6 relative">
                <div className="w-48 h-56 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 rounded-full bg-slate-100"></div>
                  </div>
                  <div className="relative w-32 h-40 mx-auto bg-white rounded-2xl shadow-sm">
                    <div className="h-10 bg-slate-400 rounded-t-2xl px-3 py-2 space-y-1">
                      <div className="w-8 h-1.5 bg-white rounded"></div>
                      <div className="w-12 h-1.5 bg-white/80 rounded"></div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="w-20 h-1.5 bg-slate-300 rounded"></div>
                      <div className="w-24 h-1.5 bg-slate-300 rounded"></div>
                      <div className="w-16 h-1.5 bg-slate-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Create Purchase</h2>
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-all duration-200">
                + Add New Purchase
              </button>
            </div>
          </div>
        )}

        {/* Other tabs - placeholder */}
        {!['dashboard', 'products', 'clients', 'expenses', 'purchase'].includes(activeTab) && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${menuItems.find(item => item.id === activeTab)?.icon} text-3xl text-slate-400`}></i>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className="text-slate-600">This section is under construction</p>
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
          { id: 'client-info', label: 'Client Info', active: clientTab === 'client-info', onClick: () => setClientTab('client-info') },
          { id: 'additional-info', label: 'Additional Info', active: clientTab === 'additional-info', onClick: () => setClientTab('additional-info') }
        ]}
        footer={
          <>
            <button 
              onClick={() => setShowClientModal(false)}
              className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
              Save Client
            </button>
          </>
        }
      >
        {clientTab === 'client-info' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Client Name *</label>
              <input 
                type="text" 
                placeholder="Enter client name" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
              <input 
                type="tel" 
                placeholder="Enter phone number" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Client Type</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setClientType('CUSTOMER')}
                  className={`px-4 py-2.5 rounded-xl border font-medium transition-all ${
                    clientType === 'CUSTOMER'
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Customer
                </button>
                <button
                  onClick={() => setClientType('SUPPLIER')}
                  className={`px-4 py-2.5 rounded-xl border font-medium transition-all ${
                    clientType === 'SUPPLIER'
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Supplier
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Opening Balance</label>
              <input 
                type="number" 
                placeholder="Rs. 0" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setBalanceType('TORECEIVE')}
                className={`px-4 py-2.5 rounded-xl border font-medium transition-all ${
                  balanceType === 'TORECEIVE'
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                To Receive
              </button>
              <button
                onClick={() => setBalanceType('TOGIVE')}
                className={`px-4 py-2.5 rounded-xl border font-medium transition-all ${
                  balanceType === 'TOGIVE'
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
              <textarea 
                rows="3" 
                placeholder="Enter address" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">PAN Number</label>
                <input 
                  type="text" 
                  placeholder="Enter PAN Number" 
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
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
              className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
              Save Product
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Product Name *</label>
            <input 
              type="text" 
              placeholder="Enter product name" 
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Product Quantity</label>
            <input 
              type="number" 
              placeholder="0.00" 
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Cost Price ($) *</label>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Selling Price ($) *</label>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <input 
                type="text" 
                placeholder="Type category" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-slate-900">Low Stock Alert</h3>
              <i className="fas fa-info-circle text-slate-400 text-xs"></i>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={lowStockAlert}
                onChange={(e) => setLowStockAlert(e.target.checked)}
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {lowStockAlert && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Low Stock Quantity</label>
              <input 
                type="number" 
                placeholder="Enter stock quantity" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
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
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
            Save Expense
          </button>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Expense No</label>
              <input 
                type="text" 
                readOnly 
                value="#EXP001"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Expense Category</label>
            <input 
              type="text" 
              placeholder="Select or type category" 
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Total Amount</label>
              <input 
                type="number" 
                placeholder="Rs. 0"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
              <input 
                type="text" 
                placeholder="Cash" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Remarks</label>
            <textarea 
              rows="3" 
              placeholder="Enter remarks" 
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}