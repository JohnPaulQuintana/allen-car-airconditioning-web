import { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import logo from "../../assets/images/logo-white.png";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <header className="sticky top-0 z-50 bg-[#001845] border-b border-white/10">
      <div className="h-20 px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            className="w-10 h-10"
            alt="Logo"
          />

          <div>
            <h1 className="text-white font-bold">
              Allen Car Aircon
            </h1>

            <p className="text-white/50 text-xs">
              Management System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* <button className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
            <FiBell />
          </button> */}

          <div className="relative">
            <button
              onClick={() =>
                setOpen(!open)
              }
              className="flex items-center gap-3 px-3 h-10 rounded-xl bg-white/10 text-white"
            >
              <FiUser />

              <div className="text-left hidden md:block">
                <p className="text-sm font-medium">
                  {user.name || "User"}
                </p>

                <p className="text-xs text-white/60">
                  {user.role || "Unknown"}
                </p>
              </div>
            </button>

            {open && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">
                    {user.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                >
                  <FiLogOut />

                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}