import { useState } from 'react';
// Fixed import path: the modal component file is named Models.jsx in the
// models folder. Previous import targeted '../models/Modal' which doesn't
// exist and caused the dev server to fail resolving imports.
import Modal from '../models/Models';

export default function Expenses() {
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <>
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
    </>
  );
}
