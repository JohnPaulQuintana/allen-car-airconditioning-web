import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiTruck,
  FiTool,
  FiDollarSign,
  FiCalendar,
  FiArrowLeft,
  FiEdit2,
} from "react-icons/fi";
import DashboardLayout from "../layouts/DashboardLayout";
import { useVehicleDetails } from "../hooks/useVehicleDetails";
import EditVehicleModal from "../components/Admin/Forms/EditVehicleModal";

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();

  const { vehicle, stats, timeline, loading, error, fetchVehicle } =
    useVehicleDetails();

  useEffect(() => {
    if (id) {
      fetchVehicle(Number(id));
    }
  }, [id]);

  console.log(id);
  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-10">Loading vehicle...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-10 text-red-500">{error}</div>
      </DashboardLayout>
    );
  }

  if (!vehicle) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto py-16">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-red-50 flex items-center justify-center">
              <FiTruck className="text-red-500 text-3xl" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-800">
              Vehicle Not Found
            </h1>

            <p className="mt-3 text-slate-500">
              The vehicle record doesn't exist.
            </p>

            <button
              onClick={() => navigate("/vehicle")}
              className="mt-6 px-6 py-3 rounded-2xl bg-primary text-white"
            >
              Back to Vehicles
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 mb-20">
        {/* Hero */}
        <div className="bg-primary rounded-3xl p-8 text-white">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-6"
          >
            <FiArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <p className="text-white/60 uppercase text-xs tracking-wider">
                Vehicle Profile
              </p>

              <h1 className="text-4xl font-bold mt-2">
                {vehicle.plate_number}
              </h1>

              <p className="mt-2 text-white/70">{vehicle.vehicle_name}</p>
            </div>

            <button
              onClick={() => setEditOpen(true)}
              className="bg-white text-primary px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-slate-100 transition"
            >
              <FiEdit2 />
              Edit Vehicle
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Parts Used</p>

              <FiTool className="text-primary" />
            </div>

            <h2 className="text-3xl font-bold text-primary mt-3">
              {stats?.total_parts ?? 0}
            </h2>
          </div>

          {Number(stats?.total_amount ?? 0) > 0 && (
            <div className="bg-primary rounded-3xl p-5 text-white">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/70">Total Amount</p>

                <FiDollarSign />
              </div>

              <h2 className="text-3xl font-bold mt-3">
                ₱{Number(stats?.total_amount).toLocaleString()}
              </h2>
            </div>
          )}

          <div className="bg-white rounded-3xl p-5 border border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">First Service</p>

              <FiCalendar className="text-primary" />
            </div>

            <h2 className="text-lg font-semibold text-primary mt-3">
              {vehicle.service_date}
            </h2>
          </div>
        </div>

        {/* Information */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100">
            <h2 className="font-semibold text-primary mb-5">
              Owner Information
            </h2>

            <div className="space-y-4">
              <InfoRow label="Owner" value={vehicle.owner_name} />

              <InfoRow label="Address" value={vehicle.address} />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100">
            <h2 className="font-semibold text-primary mb-5">
              Vehicle Information
            </h2>

            <div className="space-y-4">
              <InfoRow label="Plate Number" value={vehicle.plate_number} />

              <InfoRow label="Vehicle" value={vehicle.vehicle_name} />

              <InfoRow label="First Record Date" value={vehicle.service_date} />
            </div>
          </div>
        </div>

        {/* Service Timeline */}
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-semibold text-primary">Service Timeline</h2>
          </div>

          {timeline.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No service history found.
            </div>
          ) : (
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200" />

                <div className="space-y-8">
                  {timeline.map((entry) => (
                    <div key={entry.date} className="relative pl-14">
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                        <FiTool size={16} />
                      </div>

                      {/* Card */}
                      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Service Date
                            </p>

                            <h3 className="font-semibold text-slate-800">
                              {entry.date}
                            </h3>
                          </div>

                          <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-sm font-medium">
                              {entry.parts.length} Parts
                            </span>

                            {Number(entry.total_amount ?? 0) > 0 && (
                              <span className="px-3 py-1 rounded-xl bg-green-50 text-green-700 text-sm font-medium">
                                ₱{Number(entry.total_amount).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Parts */}
                        <div className="mt-5 space-y-3">
                          {entry.parts.map((part) => (
                            <div
                              key={part.id}
                              className="bg-white border border-slate-100 rounded-2xl px-4 py-3 flex items-center justify-between"
                            >
                              <span className="font-medium text-slate-700">
                                {part.name}
                              </span>

                              <span className="font-semibold text-primary">
                                {part.price
                                  ? `₱${Number(part.price).toLocaleString()}`
                                  : "-"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <EditVehicleModal
        open={editOpen}
        vehicle={vehicle}
        onClose={() => setEditOpen(false)}
        onSaved={() => {
          fetchVehicle(Number(id));
          setEditOpen(false);
        }}
      />
    </DashboardLayout>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>

      <span className="font-medium text-right">{value || "-"}</span>
    </div>
  );
}
