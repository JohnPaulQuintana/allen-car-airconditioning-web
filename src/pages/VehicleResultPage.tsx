import { FiArrowLeft, FiTruck, FiUser, FiPlus, FiAlertCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useVehicleDetails } from "../hooks/useVehicleDetails";
import Popup from "../components/Popup";
import AddHistoryModal from "../components/Admin/AddHistoryModal";
import { type ServicePart } from "../services/vehicleService";

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
    parts: ServicePart[]
  ) => {
    const result = await addNewHistory(vehicle_id, parts);
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
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="bg-white rounded-3xl border border-red-100 shadow-sm overflow-hidden">
          <div className="bg-red-50 px-8 py-6 border-b border-red-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                <FiAlertCircle className="text-red-600" size={28} />
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-red-500">
                  Error
                </p>

                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  Unable to Load Vehicle
                </h2>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            <p className="text-slate-600 leading-relaxed">
              {error}
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-2xl bg-primary text-white font-medium hover:opacity-90 transition"
              >
                Go Back
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition"
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
      <div className="max-w-7xl mx-auto space-y-6 pb-24">
        {/* Hero */}
        <div className="bg-primary rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 text-[120px] font-black leading-none">
            🚗
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <FiArrowLeft />
            Back
          </button>

          <p className="mt-5 text-white/60 text-xs uppercase tracking-wider">
            Vehicle Found
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-widest mt-2">
            {vehicle.plate_number}
          </h1>

          <p className="text-white/80 mt-2">{vehicle.vehicle_name}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mt-6 max-w-md">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <p className="text-[11px] uppercase tracking-wider text-white/60">
                Parts Used
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {stats?.total_parts ?? 0}
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <p className="text-[11px] uppercase tracking-wider text-white/60">
                Total Services
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {Number(stats?.total_services ?? 0).toLocaleString()}
              </h2>
            </div>
          </div>

          {/* Action */}
          <div className="mt-6">
            <button
              onClick={() =>
                // navigate(`/vehicles/${vehicle.id}/service/new`)
                // addNewHistoryState(vehicle.id, "new parts", 50)
                setShowModal(true)
              }
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-primary px-5 py-3 font-semibold hover:bg-slate-100 transition"
            >
              <FiPlus />
              Add Service History
            </button>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FiUser className="text-primary" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Owner</p>

                <p className="font-medium">{vehicle.owner_name}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FiTruck className="text-primary" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Vehicle</p>

                <p className="font-medium">{vehicle.vehicle_name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parts */}
        {/* Service Timeline */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-semibold text-primary">Service History</h2>
          </div>

          <div className="p-6">
            {timeline.length === 0 ? (
              <div className="text-center py-10 text-slate-500">
                No service history found.
              </div>
            ) : (
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200" />

                <div className="space-y-8">
                  {timeline.map((entry) => (
                    <div key={entry.date} className="relative pl-14">
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                        <FiTruck size={16} />
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

                            <span className="px-3 py-1 rounded-xl bg-green-50 text-primary text-sm font-medium">
                              ₱{Number(entry.total_amount).toLocaleString()}
                            </span>
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

                              {/* <span className="font-semibold text-primary">
                                {part.price
                                  ? `₱${Number(part.price).toLocaleString()}`
                                  : "-"}
                              </span> */}
                            </div>
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
      </div>
      {/* From modal */}
      <AddHistoryModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={(parts) => addNewHistoryState(vehicle.id, parts)}
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
