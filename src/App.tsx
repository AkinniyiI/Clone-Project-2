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
  return (
    <div className="flex min-h-screen w-full">
      <aside className="flex min-h-screen w-63 shrink-0 flex-col border-r border-gray-200 bg-white">
        <Sidebar />
      </aside>

      <section className="min-h-screen flex-1 bg-gray-100 text-black">
        <Topbar />

        {/* page title - penalties*/}
        <div className="flex justify-between px-6 pt-10">
          <span className=" text-2xl font-semibold flex items-center justify-center">
            Penalties Report
          </span>
          <div className="flex flec-col gap-2 ">
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

        <div className="flex gap-4 p-6">
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
