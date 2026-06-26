import {
  FiHome,
  FiTruck,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const tabs = [
  {
    name: "Home",
    icon: FiHome,
    path: "/dashboard",
  },
  {
    name: "Vehicles",
    icon: FiTruck,
    path: "/vehicle",
  },
  {
    name: "Techs",
    icon: FiUsers,
    path: "/technician",
  },
  // {
  //   name: "Settings",
  //   icon: FiSettings,
  //   path: "/setting",
  // },
];

export default function MobileTabs() {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center lg:hidden">
      <div
        className="
          w-[92%]
          max-w-md
          bg-[#001845]
          rounded-[28px]
          p-3
          shadow-[0_12px_40px_rgba(0,24,69,0.18)]
        "
      >
        <div className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `
                  flex
                  flex-col
                  items-center
                  justify-center
                  h-16
                  rounded-2xl
                  transition-all
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-white/70 hover:bg-white/10"
                  }
                `
                }
              >
                <Icon size={22} />

                <span className="text-xs mt-1 font-medium">
                  {tab.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}