import clannitLogo from "../../assets/clannit-logo.png";
import calendar from "../../assets/calendar.png";

interface TopbarProps {
  onMenuClick?: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <div className="flex min-h-18 items-center justify-between gap-3 bg-white px-4 text-black sm:px-6">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onMenuClick}
        className="rounded border border-gray-300 p-2 lg:hidden"
      >
        <span aria-hidden="true" className="block h-4 w-5 border-y-2 border-gray-700 relative before:absolute before:left-0 before:right-0 before:top-1/2 before:border-t-2 before:border-gray-700" />
      </button>
      <div className="flex items-center gap-2">
        {" "}
        <img src={calendar} alt="Calendar" className="h-5 w-5" /> Today's Date:{" "}
        {new Date().toLocaleDateString()}{" "}
      </div>
      <div>
        {" "}
        <button
          type="button"
          className="flex items-center gap-2 rounded border border-gray-300 px-3 py-2 text-black sm:gap-3 sm:px-6"
        >
          <img
            src={clannitLogo}
            alt=""
            aria-hidden="true"
            className="h-5 w-5 object-contain"
          />
          Clannit
          <span
            aria-hidden="true"
            className="h-2 w-2 rotate-45 border-b border-r border-gray-500"
          />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
