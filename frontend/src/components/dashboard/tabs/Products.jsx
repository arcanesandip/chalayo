import { useState } from 'react';
// The modal component lives in `models/Models.jsx` (filename is Models.jsx),
// so import from the correct path/filename. Previously the import targeted
// '../models/Modal' which does not exist and caused import resolution errors.
import Modal from '../models/Models';

export default function Products() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [lowStockAlert, setLowStockAlert] = useState(false);

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

  return (
    <>
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
                    <th className="px-4 py-3 text-left font-semibold">Cost</th>
                    <th className="px-4 py-3 text-left font-semibold">Price</th>
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
                Showing <span className="font-medium">{products.length}</span>{' '}
                of <span className="font-medium">{products.length}</span>{' '}
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
    </>
  );
}
