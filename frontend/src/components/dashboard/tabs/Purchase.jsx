import React from 'react';

// Placeholder Purchase tab component — added because Dashboard imported it
// but the file was missing which caused import resolution errors.
export default function Purchase() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold text-slate-900">Purchase</h2>
        <p className="text-sm text-slate-600">Purchase module coming soon.</p>
      </div>
    </div>
  );
}
