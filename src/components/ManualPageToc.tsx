import { ManualPage } from '../types';

interface ManualPageTocProps {
  isOpen: boolean;
  tocSpreads: ManualPage[][];
  collectedPageIds: Record<string, boolean>;
  onToggleSpread: (spread: ManualPage[]) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onClose: () => void;
}

export default function ManualPageToc({
  isOpen,
  tocSpreads,
  collectedPageIds,
  onToggleSpread,
  onSelectAll,
  onClearAll,
  onClose,
}: ManualPageTocProps) {
  if (!isOpen) {
    return null;
  }

  const spreadColumns = [tocSpreads.slice(0, 9), tocSpreads.slice(9, 18), tocSpreads.slice(18)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="border-b border-slate-700 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-yellow-300">Table of Contents</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onSelectAll}
                className="rounded bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={onClearAll}
                className="rounded bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-yellow-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-3 p-4 md:grid-cols-3">
          {spreadColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-2">
              {column.map((spread) => {
                const isSelected = spread.every((page) => collectedPageIds[page.id]);
                const label = spread.map((page) => page.pageNumber).join('/');

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onToggleSpread(spread)}
                    aria-pressed={isSelected}
                    className={`w-full rounded border px-3 py-2 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                      isSelected
                        ? 'border-yellow-300 bg-yellow-400 text-slate-950 shadow'
                        : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    Page {label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
