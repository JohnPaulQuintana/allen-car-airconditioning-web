import {
  FiArrowLeft,
  // FiTruck,
  FiUser,
  FiPlus,
  FiAlertCircle,
  FiCalendar,
  // FiDollarSign,
  FiTool,
  // FiEdit,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useVehicleDetails } from "../hooks/useVehicleDetails";
import Popup from "../components/Popup";
import AddHistoryModal from "../components/Admin/AddHistoryModal";
import { type ServicePart } from "../services/vehicleService";
import mascot from "../assets/images/mascot-trans.png";

export default function VehicleResultPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const { plateNumber } = useParams();

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

  const {
    vehicle,
    stats,
    timeline,
    loading,
    error,
    // success,
    fetchByPlate,
    addNewHistory,
  } = useVehicleDetails();

  console.log(stats);
  // add new history
  const addNewHistoryState = async (
    vehicle_id: number,
    parts: ServicePart[],
    serviceDate: string | undefined,
  ) => {
    const result = await addNewHistory(vehicle_id, parts, serviceDate);
    // console.log(result);
    if (result.success) {
      setPopup({
        open: result.success,
        type: "success",
        title: "Service Saved",
        message: "The service history has been added successfully.",
      });

      if (plateNumber) {
        fetchByPlate(plateNumber);
      }
    } else {
      setPopup({
        open: true,
        type: "error",
        title: "Failed",
        message: "Unable to save the service history.",
      });
    }
  };
  
  useEffect(() => {
    if (!plateNumber) {
      navigate("/vehicles");
      return;
    }

    fetchByPlate(plateNumber);
  }, [plateNumber]);

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
        <div className="max-w-4xl mx-auto py-2 px-2">
          <div className="bg-white rounded-3xl border border-red-100 shadow-sm overflow-hidden">
            <div className="bg-red-50 px-8 py-6 border-b border-red-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                  <FiAlertCircle className="text-red-600" size={28} />
                </div>

                <div>
                  <p className="text-sm uppercase tracking-wider text-red-500">
                    Request Result
                  </p>

                  <h2 className="text-2xl font-bold text-slate-800 mt-1">
                    Vehicle Record Not Found
                  </h2>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 mb-2">
              {/* <p className="text-slate-600 leading-relaxed">{error}</p> */}

              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="px-2 py-2 rounded-2xl bg-primary text-white font-sm w-full hover:opacity-90 transition"
                >
                  Go Back
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-2 py-2 rounded-2xl border border-slate-200 hover:bg-slate-50 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!vehicle) {
    return (
      <DashboardLayout>
        <div className="p-10">Vehicle not found</div>
      </DashboardLayout>
    );
  }

  console.log(timeline);
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
              <div className="mt-5">
                <span className="text-white/70 flex items-center gap-2">
                  <FiUser className="shrink-0" />
                  {vehicle.owner_name}
                </span>
                <h1 className="text-3xl font-bold leading-tight">
                  {vehicle.vehicle_name}
                </h1>
              </div>

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
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 px-4 py-2 backdrop-blur disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition"
                >
                  <FiPlus />
                  <span>Add History</span>
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

                <div className="bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">Total Services</p>

                    <FiCalendar className="text-white" />
                  </div>

                  <h2 className="text-3xl font-semibold text-white mt-3">
                    {Number(stats?.total_services ?? 0).toLocaleString()}
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
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 px-4 py-2 backdrop-blur disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition"
                >
                  <FiPlus />
                  <span>Add History</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Parts */}
        <div className="sm:hidden bg-primary rounded-md text-white relative overflow-hidden isolate p-4">
          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="w-full pb-2">
            <div className="">
              <span className="text-white/70 flex items-center gap-2">
                <FiUser className="shrink-0" />
                {vehicle.owner_name}
              </span>
              <h1 className="text-2xl font-bold leading-tight">
                {vehicle.vehicle_name}
              </h1>
            </div>

            <div className="mt-2 text-white/70">
              <span>Plate Number</span>
              <p className="text-white text-3xl font-bold leading-8">
                {vehicle.plate_number}
              </p>
            </div>
          </div>
        </div>

        {/* Service History */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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

            <span className="rounded-xl bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary shrink-0">
              {timeline.length}
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
                        Parts
                      </th>

                      <th className="px-6 py-4 font-semibold text-right">
                        Total Amount
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
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
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

                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {entry.parts.length} Parts
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

      {/* From modal */}
      <AddHistoryModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={(parts, serviceDate) =>
          addNewHistoryState(vehicle.id, parts, serviceDate)
        }
      />

      {/* Success and Error Components Popup */}
      <Popup
        {...popup}
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
