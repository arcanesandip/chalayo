import { useState } from 'react';
// Fixed import: modal component is exported from Models.jsx (filename Models.jsx)
// so import from '../models/Models'. Previous incorrect path caused runtime
// resolution errors.
import Modal from '../models/Models';

export default function Clients() {
  const [showClientModal, setShowClientModal] = useState(false);
  const [clientTab, setClientTab] = useState('client-info');
  const [clientType, setClientType] = useState('CUSTOMER');
  const [balanceType, setBalanceType] = useState('TORECEIVE');

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

  return (
    <>
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
                    <p className="mb-1 text-xs text-slate-600">{stat.label}</p>
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
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone</th>
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
    </>
  );
}
