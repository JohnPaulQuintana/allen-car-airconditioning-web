import { FiSearch, FiTruck, FiFileText, FiSmartphone, FiClock } from "react-icons/fi";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

import { useVehicle } from "../hooks/useVehicle";
import { type VehicleDashboardStat } from "../services/vehicleService";
import { useEffect, useState } from "react";

export default function DashboardPage() {
 
  const [stats, setStats] = useState<VehicleDashboardStat | null>(null);
  const { fetchDashboardStats } = useVehicle();

  useEffect(() => {
    const loadStats = async () => {
      const response = await fetchDashboardStats();
      setStats(response.data);
      // console.log(response.data)
    };

    loadStats();
  }, []);
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero */}
        <div className="bg-primary rounded-[22px] p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-white/60 text-sm">
                Allen Car Air Conditioning
              </p>

              <h1 className="text-3xl font-bold mt-2">
                Vehicle Service Dashboard
              </h1>

              <p className="text-white/70 mt-3 max-w-xl">
                Search vehicle history, manage service records and monitor daily
                workshop activity.
              </p>
            </div>

            <button
              onClick={() => navigate("/vehicle")}
              className="bg-white text-primary px-6 py-3 rounded-2xl font-semibold flex items-center gap-2"
            >
              <FiSearch />
              Search Vehicle
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Registered Vehicles</p>

                <h2 className="text-2xl font-bold text-primary mt-2">
                  {stats?.total_vehicles}
                </h2>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FiTruck className="text-primary" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Service Records</p>

                <h2 className="text-2xl font-bold text-primary mt-2">
                  {stats?.service_records}
                </h2>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FiFileText className="text-primary" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Connected Device</p>

                <h2 className="text-2xl font-bold text-primary mt-2">
                  {stats?.total_technicians}
                </h2>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FiSmartphone className="text-primary" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-primary">Today's Activity</h2>

            <span className="text-sm text-slate-500">
              {stats?.today_activities.length ?? 0} Activities
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {stats?.today_activities.length ? (
              stats.today_activities.map((activity, index) => (
                <div
                  key={index}
                  className="px-6 py-5 flex items-center gap-4 hover:bg-slate-50 transition"
                >
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                    {activity.type === "device_invited" && (
                      <FiSmartphone className="text-primary" />
                    )}

                    {activity.type === "vehicle_added" && (
                      <FiTruck className="text-primary" />
                    )}

                    {activity.type === "service_record" && (
                      <FiFileText className="text-primary" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800">
                      {activity.label}
                    </p>

                    <p className="text-sm text-slate-500">
                      {activity.title}

                      {activity.total_parts && (
                        <span className="ml-2 text-primary font-medium">
                          • {activity.total_parts} Parts
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <FiClock size={14} />
                    {activity.time}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <FiClock className="mx-auto text-slate-300" size={42} />

                <p className="mt-4 font-medium text-slate-500">
                  No activity today
                </p>

                <p className="text-sm text-slate-400">
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
