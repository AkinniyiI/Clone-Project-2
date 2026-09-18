import { useState } from "react";
import ButtonWithIcon from "./components/Button/ButtonWithIcon.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import StatCard from "./components/StatCard/StatCard.tsx";
import Topbar from "./components/Topbar/Topbar.tsx";
import { calender, downloadIcon } from "./assets/";
import PenaltiesTable from "./components/DataTable/PenaltiesTable.tsx";

const cardData = [
  {
    title: "Total Defaulters",
    value: "12",
    description: "total number of defaulters",
    valueColor: "text-black",
  },
  {
    title: "Total Amount due",
    value: "£1200",
    description: "across all payments",
    valueColor: "text-[#258265]",
  },
];

// const INITIAL_ACTIVE: PenaltyRow[] = [
//   {
//     id: "1",
//     studentName: "Adebayo Oluwaseun",
//     billableItem: "Tuition Fee",
//     outstanding: "500,000.00",
//     penaltyImposed: "Access Restricted",
//     penaltyStartDate: "Aug 1, 2024",
//   },
//   {
//     id: "2",
//     studentName: "Chioma Nwosu",
//     billableItem: "Lab Fee",
//     outstanding: "500,000.00",
//     penaltyImposed: "Attendance",
//     penaltyStartDate: "Jul 15, 2024",
//   },
//   {
//     id: "3",
//     studentName: "Emeka Okafor",
//     billableItem: "Sports Fee",
//     outstanding: "500,000.00",
//     penaltyImposed: "Access Restricted",
//     penaltyStartDate: "Jun 20, 2024",
//   },
//   {
//     id: "4",
//     studentName: "Fatima Ibrahim",
//     billableItem: "Transport Fee",
//     outstanding: "500,000.00",
//     penaltyImposed: "Attendance",
//     penaltyStartDate: "Aug 5, 2024",
//   },
//   {
//     id: "5",
//     studentName: "Gbenga Adeyemi",
//     billableItem: "Consultation Fee",
//     outstanding: "500,000.00",
//     penaltyImposed: "Access Restricted",
//     penaltyStartDate: "Jul 28, 2024",
//   },
// ];

// const INITIAL_CLOSED: PenaltyRow[] = [
//   {
//     id: "6",
//     studentName: "Adebayo Oluwaseun",
//     billableItem: "Tuition Fee",
//     outstanding: "500,000.00",
//     penaltyImposed: "Access Restricted",
//     penaltyStartDate: "Aug 1, 2024",
//     closedDate: "Aug 1, 2024",
//     closedBy: "John Jones",
//   },
// ];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 -translate-x-full flex-col border-r border-gray-200 bg-white transition-transform lg:static lg:min-h-screen lg:w-63 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : ""}`}
      >
        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
      </aside>

      <section className="min-h-screen min-w-0 flex-1 bg-gray-100 text-black">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* page title - penalties*/}
        <div className="flex flex-col gap-4 px-4 pt-6 sm:px-6 sm:pt-10 lg:flex-row lg:items-center lg:justify-between">
          <span className="flex items-center text-2xl font-semibold">
            Penalties Report
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex">
            <ButtonWithIcon
              icon={calender}
              text="May 01 - May 31,2025"
              textColor="text-black"
              color="bg-white"
              hover="hover:bg-gray-200"
            />
            <ButtonWithIcon
              icon={downloadIcon}
              text="Export Report"
              textColor="text-white"
              color="bg-[#258265]"
              hover="hover:bg-teal-800"
            />
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              description={card.description}
              valueColor={card.valueColor}
            />
          ))}
        </div>

        <div>
          <PenaltiesTable />
        </div>
      </section>
    </div>
  );
}

export default App;
