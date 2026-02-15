export default function Overview() {
  return (
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
                    <i className={`fas ${stat.icon} text-xs text-white`}></i>
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
                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Total</th>
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
                  <span className="text-sm text-slate-600">{item.label}</span>
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
  );
}
