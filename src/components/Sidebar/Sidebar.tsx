import home from "../../assets/home.svg";
import clannitLogo from "../../assets/clannit-logo.png";
import { useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const menuItems = [
    {
      name: "Dashboard",
      icon: home,
    },
    {
      name: "School",
      icon: home,
      expandable: true,
    },
    {
      name: "User Groups",
      icon: home,
    },
    {
      name: "Communities",
      icon: home,
    },
    {
      name: "Collections",
      icon: home,
      expandable: true,
    },
    {
      name: "Communications",
      icon: home,
      expandable: true,
    },
    {
      name: "Events",
      icon: home,
    },
    {
      name: "Emergency",
      icon: home,
      expandable: true,
    },
    {
      name: "Setup",
      icon: home,
      expandable: true,
    },
    {
      name: "Reports",
      icon: home,
      expandable: true,
    },
    {
      name: "Configurations",
      icon: home,
      expandable: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center">
        <img src={clannitLogo} alt="Logo" className="w-23 m-7" />
      </div>

      <nav className="flex-1">
        <ul className="space-y-1 px-6">
          {menuItems.map((menuItem) => (
            <li key={menuItem.name}>
              <button
                onClick={() => setActiveItem(menuItem.name)}
                type="button"
                className={`${activeItem === menuItem.name ? "bg-[#272E46] text-white" : "text-gray-700"} flex w-full items-center gap-3 rounded-md py-3 px-3 text-left transition-colors hover:bg-[#272E46] hover:text-white`}
              >
                <img
                  src={menuItem.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-5 "
                />
                <span className="flex-1 ">{menuItem.name}</span>
                {menuItem.expandable && (
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rotate-45 border-r border-b border-gray-500"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-gray-200 pt-5">
          <div className="space-y-4 px-6">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md px-2 pt-5 text-left text-[16px] text-gray-700 transition-colors hover:text-gray-900"
            >
              <img
                src={home}
                alt=""
                aria-hidden="true"
                className="h-4 w-5 object-contain"
              />

              <span>System Settings</span>
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md px-2 py-2 pb-10 text-left text-[16px] text-red-500 transition-colors hover:text-red-600"
            >
              <img
                src={home}
                alt=""
                aria-hidden="true"
                className="h-4 w-5 object-contain"
              />

              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
