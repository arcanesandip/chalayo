export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  tabs,
}) {
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
}
