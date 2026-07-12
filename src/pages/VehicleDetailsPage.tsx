import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiTruck,
  FiTool,
  FiDollarSign,
  FiCalendar,
  FiArrowLeft,
  FiEdit,
  FiUser,
  FiMapPin,
  FiHash,
} from "react-icons/fi";
import DashboardLayout from "../layouts/DashboardLayout";
import { useVehicleDetails } from "../hooks/useVehicleDetails";
import EditVehicleModal from "../components/Admin/Forms/EditVehicleModal";
import EditHistoryForm from "../components/Admin/Forms/EditHistoryForm";
import { vehicleService } from "../services/vehicleService";

import mascot from "../assets/images/mascot-trans.png";
// import Popup from "../components/Popup";
import PopupDarker from "../components/PopupDarker";

interface Part {
  id?: number;
  name: string;
  price: number | null;
}

interface History {
  date: string;
  total_amount: number;
  parts: Part[];
}

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const [editOpen, setEditOpen] = useState(false);
  const [editHistoryOpen, setEditHistoryOpen] = useState(false);
  const [editHistoryData, setEditHistoryData] = useState<History | null>(null);
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

  const [popup, setPopup] = useState({
    open: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const [greeting] = useState(
    () => mascotGreetings[Math.floor(Math.random() * mascotGreetings.length)],
  );

  const { vehicle, stats, timeline, loading, error, fetchVehicle } =
    useVehicleDetails();

  // edit history
  const entryToEdit = (entry: any) => {
    console.log(entry);
    setEditHistoryOpen(true);
    setEditHistoryData(entry);
  };
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
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0 mb-20">
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
          <div className="hidden sm:flex items-center z-10">
            {/* Mascot */}
            <div className="flex-shrink-0">
              <img
                src={mascot}
                alt="Mascot"
                className="w-60 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Content */}
            <div className="w-full pb-2">
              <h1 className="mt-5 text-3xl font-bold leading-tight">
                Vehicle Profile
              </h1>

              <div className="mt-2 text-white/70">
                <span>Plate Number</span>
                <p className="text-white text-4xl font-bold leading-8">
                  {vehicle.plate_number}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <div
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:cursor-pointer hover:bg-white/20 px-4 py-2 backdrop-blur"
                >
                  <FiArrowLeft />
                  <span>Back</span>
                </div>

                <button
                  onClick={() => setEditOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 px-4 py-2 backdrop-blur disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition"
                >
                  <FiEdit />
                  <span>Edit Vehicle</span>
                </button>
              </div>
            </div>

            <div className="w-full p-2">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">Performed</p>

                    <FiTool className="text-white" />
                  </div>

                  <h2 className="text-3xl font-bold text-white mt-3">
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

                <div className="bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">First Service</p>

                    <FiCalendar className="text-white" />
                  </div>

                  <h2 className="text-lg font-semibold text-white mt-3">
                    {vehicle.service_date}
                  </h2>
                </div>
              </div>
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

            <div className="flex flex-wrap gap-3 items-center justify-center">
              <div className="flex flex-wrap gap-3">
                <div
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:cursor-pointer hover:bg-white/20 px-4 py-2 backdrop-blur"
                >
                  <FiArrowLeft />
                  <span>Back</span>
                </div>

                <button
                  onClick={() => setEditOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 px-4 py-2 backdrop-blur disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition"
                >
                  <FiEdit />
                  <span>Edit Vehicle</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Owner */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Owner Information
                </h2>

                <p className="text-sm text-slate-500">
                  Registered vehicle owner details.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <FiUser className="mt-1 text-slate-400" />

                <div>
                  <p className="text-sm text-slate-500">Owner Name</p>

                  <p className="font-semibold text-slate-800">
                    {vehicle.owner_name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiMapPin className="mt-1 text-slate-400" />

                <div>
                  <p className="text-sm text-slate-500">Address</p>

                  <p className="font-semibold text-slate-800">
                    {vehicle.address || "No address available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Vehicle Information
                </h2>

                <p className="text-sm text-slate-500">
                  Registration and service details.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <FiHash className="mt-1 text-slate-400" />

                <div>
                  <p className="text-sm text-slate-500">Plate Number</p>

                  <span className="inline-flex rounded-lg bg-primary/10 px-3 py-1 font-bold tracking-wider text-primary">
                    {vehicle.plate_number}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiTruck className="mt-1 text-slate-400" />

                <div>
                  <p className="text-sm text-slate-500">Vehicle</p>

                  <p className="font-semibold text-slate-800">
                    {vehicle.vehicle_name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiCalendar className="mt-1 text-slate-400" />

                <div>
                  <p className="text-sm text-slate-500">First Record</p>

                  <p className="font-semibold text-slate-800">
                    {vehicle.service_date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service History */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Service History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete maintenance records for this vehicle.
              </p>
            </div>

            <span className="rounded-xl bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              Total: {timeline.length}
            </span>
          </div>

          {timeline.length === 0 ? (
            <div className="py-16 text-center">
              <FiTool className="mx-auto mb-4 text-4xl text-slate-300" />

              <h3 className="text-lg font-semibold text-slate-700">
                No Service History
              </h3>

              <p className="mt-2 text-slate-500">
                This vehicle has no recorded maintenance yet.
              </p>
            </div>
          ) : (
            <div className="p-2">
              {/* DESKTOP */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-sm text-slate-500">
                      <th className="px-6 py-4 font-semibold">Date</th>

                      <th className="px-6 py-4 font-semibold">
                        Parts Replaced
                      </th>

                      <th className="px-6 py-4 font-semibold text-center">
                        Performed Job
                      </th>

                      <th className="px-6 py-4 font-semibold text-right">
                        Total Amount
                      </th>

                      <th className="px-6 py-4 font-semibold text-right">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {timeline.map((entry) => (
                      <tr
                        key={entry.date}
                        className="border-t border-slate-100 hover:bg-slate-50 transition"
                      >
                        {/* Date */}
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="font-semibold text-slate-800">
                            {entry.date}
                          </div>
                        </td>

                        {/* Parts */}

                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2 max-w-md">
                            {entry.parts.map((part) => (
                              <span
                                key={part.id}
                                className="rounded-lg bg-slate-100 px-3 py-1 text-sm text-slate-700"
                              >
                                {part.name}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Count */}

                        <td className="px-6 py-5 text-center">
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            {entry.parts.length}
                          </span>
                        </td>

                        {/* Total */}

                        <td className="px-6 py-5 text-right">
                          <span className="font-bold text-primary">
                            {Number(entry.total_amount ?? 0) > 0
                              ? `₱${Number(entry.total_amount).toLocaleString()}`
                              : "-"}
                          </span>
                        </td>

                        {/* Action */}

                        <td className="px-6 py-5 text-center">
                          <button
                            onClick={() => {
                              // pass the entire entry
                              entryToEdit(entry);
                            }}
                            className="border p-1 text-xl"
                          >
                            <FiEdit />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}
              <div className="space-y-4 lg:hidden">
                {timeline.map((entry) => (
                  <div
                    key={entry.date}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Service Date
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                          {entry.date}
                        </h3>
                      </div>

                      <span
                        onClick={() => {
                          entryToEdit(entry);
                        }}
                        className="rounded-md bg-primary/10 p-2 text-sm font-semibold text-primary"
                      >
                        <FiEdit />
                      </span>
                    </div>

                    {/* Total */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Total Amount
                      </span>

                      <span className="font-bold text-primary">
                        {Number(entry.total_amount ?? 0) > 0
                          ? `₱${Number(entry.total_amount).toLocaleString()}`
                          : "-"}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="my-4 border-t border-slate-100" />

                    {/* Parts */}
                    <div>
                      <p className="mb-3 text-sm font-medium text-slate-600">
                        Parts Replaced
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {entry.parts.map((part) => (
                          <span
                            key={part.id}
                            className="rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-700"
                          >
                            {part.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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

      <EditHistoryForm
        open={editHistoryOpen}
        history={editHistoryData}
        onClose={() => setEditHistoryOpen(false)}
        onSaved={async (payload) => {
          console.log(payload);

          await vehicleService.editHistory(Number(id), payload);

          fetchVehicle(Number(id));
          setEditHistoryOpen(false);
          setPopup({
            open: true,
            type: "success",
            title: "History Updated",
            message: "Service history was updated successfully.",
          });
        }}
      />

      <PopupDarker
        open={popup.open}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={() =>
          setPopup((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </DashboardLayout>
  );
}
