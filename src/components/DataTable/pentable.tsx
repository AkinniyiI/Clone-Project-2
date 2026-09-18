import { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type TabKey = "active" | "closed";

export interface PenaltyRow {
  id: string;
  studentName: string;
  billableItem: string;
  outstanding: string;
  penaltyImposed: string;
  penaltyStartDate: string;
  /* Only present on rows in the "closed" tab */
  closedDate?: string;
  closedBy?: string;
}

/* A column definition: what to show in the header, and how to pull the
   matching value out of a row. Defining columns as DATA (instead of
   hardcoding <th> and <td> tags) is what lets the two tabs share one table. */
interface Column {
  key: string;
  label: string;
  /* Given a row, return the text for this cell. */
  render: (row: PenaltyRow) => string;
}

interface PenaltiesTableProps {
  activeRows: PenaltyRow[];
  closedRows: PenaltyRow[];
  /* Called after the user confirms in the modal. The parent decides what
     "lifting a penalty" actually means (API call, state update, etc.). */
  onLiftPenalty?: (row: PenaltyRow) => void;
}

/* ------------------------------------------------------------------ */
/* Icons (inline SVG so there's no extra dependency to install)        */
/* ------------------------------------------------------------------ */

const FilterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5 text-gray-400"
    aria-hidden="true"
  >
    <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
  </svg>
);

const BanIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </svg>
);

const WarningIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-amber-500"
    aria-hidden="true"
  >
    <path d="M10.3 3.5L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.5a2 2 0 00-3.4 0z" />
    <line x1="12" y1="9.5" x2="12" y2="13.5" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ChevronLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Column definitions                                                  */
/* ------------------------------------------------------------------ */

const BASE_COLUMNS: Column[] = [
  { key: "studentName", label: "Student Name", render: (r) => r.studentName },
  { key: "billableItem", label: "Billable Item", render: (r) => r.billableItem },
  { key: "outstanding", label: "Outstanding (N)", render: (r) => r.outstanding },
  { key: "penaltyImposed", label: "Penalty Imposed", render: (r) => r.penaltyImposed },
  { key: "penaltyStartDate", label: "Penalty start date", render: (r) => r.penaltyStartDate },
];

const CLOSED_EXTRA_COLUMNS: Column[] = [
  { key: "closedDate", label: "Closed Date", render: (r) => r.closedDate ?? "—" },
  { key: "closedBy", label: "Closed By", render: (r) => r.closedBy ?? "—" },
];

/* ------------------------------------------------------------------ */
/* Confirmation modal                                                  */
/* ------------------------------------------------------------------ */

interface ConfirmModalProps {
  studentName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ studentName, onCancel, onConfirm }: ConfirmModalProps) => {
  /* Close on Escape, and stop the page behind from scrolling while open. */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lift-penalty-title"
    >
      {/* stopPropagation keeps a click INSIDE the card from closing the modal */}
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
          <WarningIcon />
        </div>

        <h2 id="lift-penalty-title" className="text-base font-semibold text-gray-900">
          Lift Penalty
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Are you sure you want to lift penalty on{" "}
          <span className="font-semibold text-gray-900">{studentName}</span>? This action
          will immediately restore their standard permissions and access.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 flex-1 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 flex-1 rounded-lg bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Yes, Lift Penalty
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main table component                                                */
/* ------------------------------------------------------------------ */

const PenaltiesTable = ({
  activeRows,
  closedRows,
  onLiftPenalty,
}: PenaltiesTableProps) => {
  const [tab, setTab] = useState<TabKey>("active");
  const [selectedRow, setSelectedRow] = useState<PenaltyRow | null>(null);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const rows = tab === "active" ? activeRows : closedRows;
  const columns =
    tab === "active" ? BASE_COLUMNS : [...BASE_COLUMNS, ...CLOSED_EXTRA_COLUMNS];

  const allChecked = rows.length > 0 && checkedIds.length === rows.length;

  const toggleAll = () => {
    setCheckedIds(allChecked ? [] : rows.map((r) => r.id));
  };

  const toggleOne = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const switchTab = (next: TabKey) => {
    setTab(next);
    setCheckedIds([]); // selections don't carry across tabs
  };

  const handleConfirm = () => {
    if (selectedRow) onLiftPenalty?.(selectedRow);
    setSelectedRow(null); // closing the modal returns you to the table
  };

  return (
    <div className="w-full rounded-xl bg-white shadow-sm">
      {/* ---------------- Tabs ---------------- */}
      <div className="border-b border-gray-200 px-8 pt-4">
        <div className="flex gap-8" role="tablist">
          {(["active", "closed"] as const).map((key) => {
            const isActive = tab === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => switchTab(key)}
                className={`-mb-px border-b-2 pb-3 text-sm font-medium capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive
                    ? "border-emerald-700 text-emerald-700"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------- Horizontal scroll container -------
          overflow-x-auto makes THIS div scroll instead of the page.
          min-w-full + whitespace-nowrap on cells lets the table grow
          wider than its parent, which is what triggers the scrollbar. */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th scope="col" className="w-12 px-4 py-4">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                  className="h-4 w-4 rounded border-gray-300 accent-emerald-700"
                />
              </th>

              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="whitespace-nowrap px-4 py-4 font-medium text-gray-700"
                >
                  <span className="flex items-center gap-8">
                    {col.label}
                    <FilterIcon />
                  </span>
                </th>
              ))}

              <th scope="col" className="whitespace-nowrap px-4 py-4 font-medium text-gray-700">
                <span className="flex items-center gap-8">
                  Actions
                  <FilterIcon />
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  No {tab} penalties to show.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={checkedIds.includes(row.id)}
                      onChange={() => toggleOne(row.id)}
                      aria-label={`Select ${row.studentName}`}
                      className="h-4 w-4 rounded border-gray-300 accent-emerald-700"
                    />
                  </td>

                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="whitespace-nowrap px-4 py-4 text-gray-700"
                    >
                      {col.render(row)}
                    </td>
                  ))}

                  <td className="px-4 py-4">
                    {tab === "active" ? (
                      <button
                        type="button"
                        onClick={() => setSelectedRow(row)}
                        aria-label={`Lift penalty on ${row.studentName}`}
                        className="rounded-full text-emerald-700 transition-colors hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <BanIcon />
                      </button>
                    ) : (
                      <span className="text-emerald-700" title="Penalty lifted">
                        <CheckCircleIcon />
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- Pagination ---------------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>View</span>
          <select
            defaultValue="10"
            aria-label="Rows per page"
            className="h-9 rounded-lg border border-gray-200 px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>per page</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            className="rounded-lg p-1 text-gray-300 hover:text-gray-500"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-current="page"
            className="h-9 w-9 rounded-lg bg-emerald-700 text-sm font-medium text-white"
          >
            1
          </button>
          <button
            type="button"
            className="h-9 w-9 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100"
          >
            2
          </button>
          <button
            type="button"
            aria-label="Next page"
            className="rounded-lg p-1 text-gray-600 hover:text-gray-900"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Conditional rendering: the modal only exists in the DOM when a
          row is selected. Setting selectedRow back to null removes it. */}
      {selectedRow && (
        <ConfirmModal
          studentName={selectedRow.studentName}
          onCancel={() => setSelectedRow(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default PenaltiesTable;