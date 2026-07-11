import {
  FiSearch,
  FiTruck,
  FiFileText,
  FiSmartphone,
  FiClock,
  FiUsers,
  FiClipboard,
} from "react-icons/fi";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import { type VehicleDashboardStat } from "../services/vehicleService";
import { useEffect, useState } from "react";
import mascot from "../assets/images/mascot-trans.png";
// import logo from "../assets/images/logo-transparent.png";

export default function DashboardPage() {
  const [stats, setStats] = useState<VehicleDashboardStat | null>(null);
  const { fetchDashboardStats } = useVehicle();
  const navigate = useNavigate();

  const mascotGreetings = [
    "Welcome back! Ready to work?",
    "Let's get today's work started!",
    "Ready to manage your workshop?",
    "Let's keep everything organized today.",
    "Time to deliver excellent service!",
    "Your workshop is ready today.",
    "Let's make today productive together.",
    "Ready to help your customers?",
    "Everything is ready to go!",
    "Let's keep vehicles moving safely.",
    "Search vehicles in just seconds.",
    "Manage your workshop with confidence.",
    "Another productive day awaits you.",
    "Let's get every job done.",
    "Your service dashboard is ready.",
    "Let's build customer satisfaction today.",
    "Ready for another busy day?",
    "Let's keep records up-to-date.",
    "Everything you need is here.",
    "Let's make every service count.",
  ];

  const [greeting] = useState(
    () => mascotGreetings[Math.floor(Math.random() * mascotGreetings.length)],
  );

  useEffect(() => {
    const loadStats = async () => {
      const response = await fetchDashboardStats();
      setStats(response.data);
    };
    loadStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
        {/* Hero Section */}
        <div className="bg-primary rounded-md text-white relative overflow-hidden isolate">
           {/* Background */}
        <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl" />
        </div>

          {/* ========================= */}
          {/* Desktop */}
          {/* ========================= */}
          <div className="hidden sm:flex items-center">
            {/* Mascot */}
            <div className="flex-shrink-0">
              <img
                src={mascot}
                alt="Mascot"
                className="w-60 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Content */}
            <div className="max-w-xl pb-2">
              <h1 className="mt-5 text-3xl font-bold leading-tight">
                Workshop Management System
              </h1>

              <p className="text-white/70 text-lg leading-8">
                Manage vehicle records, technicians, customer information and
                complete service history from one professional dashboard.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div
                  onClick={() => navigate("/vehicle")}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:cursor-pointer hover:bg-white/20 px-4 py-2 backdrop-blur"
                >
                  <FiSearch />
                  <span>Quick Search</span>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-4 py-2 backdrop-blur">
                  <FiUsers />
                  <span>Technicians</span>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-4 py-2 backdrop-blur">
                  <FiClipboard />
                  <span>Service Records</span>
                </div>
              </div>

              {/* <button
                onClick={() => navigate("/vehicle")}
                className="mt-8 bg-white text-primary px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-white/90 transition shadow-lg"
              >
                <FiSearch />
                Search Vehicle
              </button> */}
            </div>
          </div>

          {/* ========================= */}
          {/* Mobile */}
          {/* ========================= */}

          <div className="sm:hidden px-6 py-4">
            <div className="relative flex justify-center">
              {/* Bubble */}

              <div className="absolute -top-2 -right-4 w-24 rounded-2xl bg-white text-primary p-3 shadow-xl">
                <p className="text-xs font-medium leading-tight">{greeting}</p>

                <div className="absolute -left-2 bottom-6 w-4 h-4 bg-white rotate-45" />
              </div>

              <img src={mascot} alt="Mascot" className="w-40 object-contain" />
            </div>

            <button
              onClick={() => navigate("/vehicle")}
              className="w-full bg-white text-primary rounded-2xl py-3 font-semibold flex items-center justify-center gap-2"
            >
              <FiSearch />
              Search Vehicle
            </button>
          </div>
        </div>

        {/* Stats Grid - Mobile first */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="bg-white rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 border border-slate-100 shadow-card">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-slate-500 text-xs sm:text-sm truncate">
                  Registered Vehicles
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mt-1 sm:mt-2">
                  {stats?.total_vehicles || 0}
                </h2>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FiTruck className="text-primary" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 border border-slate-100 shadow-card">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-slate-500 text-xs sm:text-sm truncate">
                  Service Records
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mt-1 sm:mt-2">
                  {stats?.service_records || 0}
                </h2>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FiFileText className="text-primary" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 border border-slate-100 shadow-card">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-slate-500 text-xs sm:text-sm truncate">
                  Technicians
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mt-1 sm:mt-2">
                  {stats?.total_technicians || 0}
                </h2>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FiUsers className="text-primary" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 border border-slate-100 shadow-card">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-slate-500 text-xs sm:text-sm truncate">
                  Connected Devices
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mt-1 sm:mt-2">
                  {stats?.total_technicians || 0}
                </h2>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FiSmartphone className="text-primary" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          <button
            onClick={() => navigate("/vehicle")}
            className="bg-white rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 border border-slate-100 shadow-card hover:shadow-lg transition text-left"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FiSearch className="text-primary" size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-primary text-sm sm:text-base">
                  Search Vehicle
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 truncate">
                  Find vehicle history
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/vehicle")}
            className="bg-white rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 border border-slate-100 shadow-card hover:shadow-lg transition text-left"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <FiClipboard className="text-primary" size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-primary text-sm sm:text-base">
                  Service Records
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 truncate">
                  View all services
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/technician")}
            className="bg-white rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 border border-slate-100 shadow-card hover:shadow-lg transition text-left"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                <FiUsers className="text-primary" size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-primary text-sm sm:text-base">
                  Manage Staff
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 truncate">
                  Technician management
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Activity - Mobile optimized */}
        <div className="bg-white rounded-[20px] sm:rounded-[32px] border border-slate-100 overflow-hidden shadow-card">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <FiClock className="text-primary" size={16} />
              <h2 className="font-semibold text-primary text-sm sm:text-base">
                Today's Activity
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-slate-500">
              {stats?.today_activities?.length || 0} Activities
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {stats?.today_activities?.length ? (
              stats.today_activities.map((activity, index) => (
                <div
                  key={index}
                  className="px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 hover:bg-slate-50 transition"
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {activity.type === "device_invited" && (
                      <FiSmartphone className="text-primary" size={16} />
                    )}
                    {activity.type === "vehicle_added" && (
                      <FiTruck className="text-primary" size={16} />
                    )}
                    {activity.type === "service_record" && (
                      <FiFileText className="text-primary" size={16} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm sm:text-base">
                      {activity.label}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 truncate">
                      {activity.title}
                      {activity.total_parts && (
                        <span className="ml-2 text-primary font-medium">
                          • {activity.total_parts} Parts
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                    <FiClock size={12} />
                    <span className="hidden xs:inline">{activity.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 sm:py-16 text-center">
                <FiClock className="mx-auto text-slate-300" size={36} />
                <p className="mt-4 font-medium text-slate-500 text-sm sm:text-base">
                  No activity today
                </p>
                <p className="text-xs sm:text-sm text-slate-400">
                  Today's workshop activity will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
