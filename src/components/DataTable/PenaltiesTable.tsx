//types
// export interface PenaltyRow {
//   id: string;
//   studentName: string;
//   billableItem: string;
//   outstanding: string;
//   penaltyImposed: string;
//   penaltyStartDate: string;
//   /* Only present on rows in the "closed" tab */
//   closedDate?: string;
//   closedBy?: string;
// }

import { useState } from "react";
import type { ChangeEvent } from "react";

interface PenaltyRow {
  id: number;
  name: string;
  item: string;
  amount: string;
  penalty: string;
  startDate: string;
  closedDate?: string;
  closedBy?: string;
}

type Tab = "Active" | "Closed";
type ModalType = "lift" | "Revert";

const initialActiveData = [
  {
    id: 1,
    name: "Adebayo Oluwaseun",
    item: "Tuition Fee",
    amount: "500,000.00",
    penalty: "Access Restricted",
    startDate: "Aug 1, 2024",
  },
  {
    id: 2,
    name: "Chioma Nwosu",
    item: "Lab Fee",
    amount: "500,000.00",
    penalty: "Attendance",
    startDate: "Jul 15, 2024",
  },
  {
    id: 3,
    name: "Emeka Okafor",
    item: "Sports Fee",
    amount: "500,000.00",
    penalty: "Access Restricted",
    startDate: "Jun 20, 2024",
  },
  {
    id: 4,
    name: "Fatima Ibrahim",
    item: "Transport Fee",
    amount: "500,000.00",
    penalty: "Attendance",
    startDate: "Aug 5, 2024",
  },
  {
    id: 5,
    name: "Gbenga Adeyemi",
    item: "Consultation Fee",
    amount: "500,000.00",
    penalty: "Access Restricted",
    startDate: "Jul 28, 2024",
  },
];

const initialClosedData = [
  {
    id: 101,
    name: "Adebayomi Oluwaseun",
    item: "Tuition Fee",
    amount: "500,000.00",
    penalty: "Access Restricted",
    startDate: "Aug 1, 2024",
    closedDate: "Aug 1, 2024",
    closedBy: "John Jones",
  },
];

const PenaltiesTable = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [activeList, setActiveList] = useState<PenaltyRow[]>(initialActiveData);
  const [closedList, setClosedList] = useState<PenaltyRow[]>(initialClosedData);
  //checkboxes
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  //modal state
  const [selectedStudent, setSelectedStudent] = useState<PenaltyRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("lift");

  const FilterIcon = () => (
    <svg
      className="w-3.5 h-3.5 text-gray-400 inline ml-1 cursor-pointer hover:text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );

  //toggle selection
  function handleSelectAll(
    e: ChangeEvent<HTMLInputElement>,
    currentData: PenaltyRow[],
  ) {
    if (e.target.checked) {
      setSelectedIds(currentData.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  }
  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // functions to set modal for lifting/ reverting penalties
  const handleOpenLiftModal = (student: PenaltyRow) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    setModalType("lift");
  };

  const handleClosedActionModal = (student: PenaltyRow) => {
    setSelectedStudent(student);
    setModalType("Revert");
    setIsModalOpen(true);
  };

  //confirm lifting penalty
  const handleConfirmAction = () => {
    if (!selectedStudent) return;

    if (modalType === "lift") {
      // Remove from active list
      setActiveList((prev) =>
        prev.filter((item) => item.id !== selectedStudent.id),
      );

      // Add to closed list
      const newClosedEntry = {
        ...selectedStudent,
        closedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        closedBy: "Current User",
      };
      setClosedList((prev) => [newClosedEntry, ...prev]);
    } else {
      // Remove from closed list
      setClosedList((prev) =>
        prev.filter((item) => item.id !== selectedStudent.id),
      );

      // Add back to active list
      const { closedDate, closedBy, ...activeEntry } = selectedStudent;
      setActiveList((prev) => [activeEntry, ...prev]);
    }
    // Reset modal state
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // current data is what switches the data presented in the table, if active it shows active list
  const currentData = activeTab === "Active" ? activeList : closedList;

  return (
    <div className="min-h-screen px-4 py-4 font-sans sm:px-6">
      <div className="mx-auto max-w-7xl border border-gray-100 bg-white p-4 pb-20 shadow-sm sm:p-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab("Active");
                setSelectedIds([]);
              }}
              className={`pb-3 px-7 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "Active"
                  ? "border-emerald-700 text-emerald-800"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => {
                setActiveTab("Closed");
                setSelectedIds([]);
              }}
              className={`pb-3 px-6 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "Closed"
                  ? "border-emerald-700 text-emerald-800"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Closed
            </button>
          </nav>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-245 border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 text-[#737373] text-sm font-semibold tracking-wider">
                <th className="py-3 px-4 w-10 border-b border-gray-200">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    onChange={(e) => handleSelectAll(e, currentData)}
                    checked={
                      currentData.length > 0 &&
                      selectedIds.length === currentData.length
                    }
                  />
                </th>
                <th className="py-3 px-4 border-b border-gray-200">
                  Student Name <FilterIcon />
                </th>
                <th className="py-3 px-4 border-b border-gray-200">
                  Billable Item <FilterIcon />
                </th>
                <th className="py-3 px-4 border-b border-gray-200">
                  Outstanding (&#8358;) <FilterIcon />
                </th>
                <th className="py-3 px-4 border-b border-gray-200">
                  Penalty Imposed <FilterIcon />
                </th>
                <th className="py-3 px-4 border-b  border-gray-200">
                  Penalty start date <FilterIcon />
                </th>
                {activeTab === "Closed" && (
                  <>
                    <th className="py-3 px-4 border-b border-gray-200">
                      Closed Date <FilterIcon />
                    </th>
                    <th className="py-3 px-4 border-b border-gray-200">
                      Closed By <FilterIcon />
                    </th>
                  </>
                )}
                <th className="py-3 px-4 text-left border-b border-gray-200">
                  Actions <FilterIcon />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan={activeTab === "Active" ? 7 : 9}
                    className="py-8 text-center text-gray-400"
                  >
                    No items found.
                  </td>
                </tr>
              ) : (
                currentData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-200"
                  >
                    <td className="py-3 px-4 border-b border-l border-gray-200">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => handleSelectOne(row.id)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900 border-b border-gray-200 ">
                      {row.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.item}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.amount}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.penalty}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.startDate}
                    </td>
                    {activeTab === "Closed" && (
                      <>
                        <td className="py-3 px-4 border-b border-gray-200">
                          {row.closedDate}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          {row.closedBy}
                        </td>
                      </>
                    )}
                    <td className="py-3 px-4 border-b border-r border-gray-200">
                      {activeTab === "Active" ? (
                        <button
                          onClick={() => handleOpenLiftModal(row)}
                          title="Lift Penalty"
                          className="text-emerald-700 hover:text-emerald-900 transition-colors"
                        >
                          {/* Cancel / Lift Penalty Icon */}
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                            <line
                              x1="5.6"
                              y1="18.4"
                              x2="18.4"
                              y2="5.6"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleClosedActionModal(row)}
                          title="Closed"
                          className="text-emerald-700 inline-block"
                        >
                          {/* Checkmark Circle Icon */}
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M9 12l2 2 4-4"
                            />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-xl transform transition-all">
              {/* Warning Icon Container */}
              <div className="mx-auto w-16 h-16 rounded-full bg-amber-100/70 flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              {modalType === "lift" ? (
                <>
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Lift Penalty
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Are you sure you want to lift penalty on{" "}
                    <strong className="text-gray-900 font-semibold">
                      {selectedStudent?.name}
                    </strong>
                    ?<br />
                    This action will immediately restore their standard
                    permissions and access.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Revert Lift
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Are you sure you want to revert penalty lift on{" "}
                    <strong className="text-gray-900 font-semibold">
                      {selectedStudent?.name}
                    </strong>
                    ?<br />
                    This action will immediately restrict their standard
                    permissions and access.
                  </p>
                </>
              )}

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAction}
                  className="w-1/2 py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium transition-colors focus:outline-none shadow-sm"
                >
                  {modalType === "lift" ? "Yes, lift Penalty" : "Yes Revert"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PenaltiesTable;
