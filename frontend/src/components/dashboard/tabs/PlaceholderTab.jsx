import React from 'react';

// Generic placeholder tab component used when a specific tab is not
// implemented. Dashboard previously referenced PlaceholderTab while its
// import was commented-out / file missing which caused runtime errors.
export default function PlaceholderTab({ menuItems = [], activeTab }) {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h3 className="mb-2 text-lg font-semibold text-slate-900">{`No view for "${activeTab}"`}</h3>
        <p className="text-sm text-slate-600">Select one of the menu items to view its content.</p>
      </div>
    </div>
  );
}
