import clannitLogo from "../../assets/clannit-logo.png";
import calendar from "../../assets/calendar.png";

const Topbar = () => {
  return (
    <div className="h-18 bg-white flex items-center justify-between px-6 text-black">
      <div className="flex items-center gap-2">
        {" "}
        <img src={calendar} alt="Calendar" className="h-5 w-5" /> Today's Date:{" "}
        {new Date().toLocaleDateString()}{" "}
      </div>
      <div>
        {" "}
        <button
          type="button"
          className="text-black  flex items-center gap-3 rounded border border-gray-300 px-6 py-2"
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
