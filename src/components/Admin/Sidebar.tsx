import {
  FiHome,
  FiTruck,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const menus = [
  {
    name: "Dashboard",
    icon: FiHome,
    path: "/dashboard",
  },
  {
    name: "Vehicles",
    icon: FiTruck,
    path: "/vehicle",
  },
  {
    name: "Technicians",
    icon: FiUsers,
    path: "/technician",
  },
  // {
  //   name: "Settings",
  //   icon: FiSettings,
  //   path: "/setting",
  // },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-72 h-[calc(100vh-80px)] sticky top-20 bg-white border-r border-slate-100 flex flex-col">
      <div className="p-5 flex-1">
        <p className="text-xs uppercase text-slate-400 mb-4">
          Navigation
        </p>

        <nav className="space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  w-full
                  flex
                  items-center
                  gap-3
                  p-4
                  rounded-2xl
                  transition
                  ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `
                }
              >
                <Icon size={18} />

                <span className="font-medium">
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-5 border-t border-slate-100">
        <button
          onClick={logout}
          className="
            w-full
            flex
            items-center
            gap-3
            p-4
            rounded-2xl
            text-red-600
            hover:bg-red-50
            transition
          "
        >
          <FiLogOut size={18} />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}