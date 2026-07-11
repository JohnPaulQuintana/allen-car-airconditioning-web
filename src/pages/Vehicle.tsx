import {
  FiSearch,
  FiCamera,
  FiPlus,
  FiTruck,
  FiChevronRight,
  // FiUser,
  // FiClipboard,
} from "react-icons/fi";
import DashboardLayout from "../layouts/DashboardLayout";
import { useCamera } from "../hooks/useCamera";
import { useEffect, useState } from "react";
import PlateScannerModal from "../components/Admin/PlateScannerModal";
import { recognizePlate } from "../services/ocr.service";
import { useNavigate } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import mascot from "../assets/images/mascot-trans.png";

export default function VehiclesPage() {
  const navigate = useNavigate();
  const { vehicles, pagination, fetchVehicles, loading } = useVehicle();

  const { videoRef, isOpen, openCamera, closeCamera, attachVideo, capture } =
    useCamera();

  const [extractedPlate, setExtractedPlate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchPlate, setSearchPlate] = useState("");
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
  useEffect(() => {
    if (isOpen) {
      attachVideo();
    }
  }, [isOpen, attachVideo]);

  const handleCapture = async () => {
    try {
      setIsProcessing(true);

      const image = capture();

      if (!image) {
        setIsProcessing(false);
        return;
      }

      const blob = await fetch(image).then((r) => r.blob());

      const file = new File([blob], "plate.jpg", {
        type: "image/jpeg",
      });

      const result = await recognizePlate(file);

      console.log("OCR TEXT:", result.debug);
      console.log("PLATE:", result.plate);

      setExtractedPlate(result.plate || "NOT FOUND");

      if (result.plate) {
        setTimeout(() => {
          closeCamera();

          navigate(`/result/${result.plate}`);
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      setExtractedPlate("OCR FAILED");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSearch = () => {
    const value = searchPlate.trim();

    if (!value) return;

    navigate(`/result/${value.toUpperCase()}`);
  };

  const getPageNumbers = (current: number, total: number, siblingCount = 1) => {
    const pages: (number | "...")[] = [];

    const left = Math.max(current - siblingCount, 2);
    const right = Math.min(current + siblingCount, total - 1);

    pages.push(1);

    if (left > 2) {
      pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < total - 1) {
      pages.push("...");
    }

    if (total > 1) {
      pages.push(total);
    }

    return pages;
  };

  const [greeting] = useState(
    () => mascotGreetings[Math.floor(Math.random() * mascotGreetings.length)],
  );

  useEffect(() => {
    fetchVehicles(1);
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
              <h1 className="mt-5 text-2xl font-bold leading-tight">
                Find a Vehicle
              </h1>

              <p className="text-white/70 text-lg leading-8">
                Enter a plate number to view service history and vehicle
                information.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex-1 max-w-md bg-white rounded-md px-4 flex items-center">
                  <FiSearch size={18} className="text-slate-400" />

                  <input
                    type="text"
                    value={searchPlate}
                    onChange={(e) => setSearchPlate(e.target.value)}
                    placeholder="Plate Number: ABC1234"
                    className="flex-1 px-3 py-3 outline-none text-slate-700 bg-transparent"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={!searchPlate.trim()}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 px-4 py-2 backdrop-blur disabled:opacity-50
      disabled:cursor-not-allowed
      transition"
                >
                  <FiSearch />
                  <span>Search</span>
                </button>

                <div
                  onClick={openCamera}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:cursor-pointer hover:bg-white/20 px-4 py-2 backdrop-blur"
                >
                  <FiCamera />
                  <span>Scan</span>
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

            <div className="flex flex-wrap gap-3 items-center justify-center">
              <div className="flex-1 max-w-md bg-white rounded-md px-4 flex items-center">
                <FiSearch size={18} className="text-slate-400" />

                <input
                  type="text"
                  value={searchPlate}
                  onChange={(e) => setSearchPlate(e.target.value)}
                  placeholder="Plate Number: ABC1234"
                  className="flex-1 px-3 py-3 outline-none text-slate-700 bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </div>

              <button
                onClick={handleSearch}
                disabled={!searchPlate.trim()}
                className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 px-4 py-2 backdrop-blur disabled:opacity-50
      disabled:cursor-not-allowed
      transition"
              >
                <FiSearch />
                <span>Search</span>
              </button>

              <div
                onClick={openCamera}
                className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:cursor-pointer hover:bg-white/20 px-4 py-2 backdrop-blur"
              >
                <FiCamera />
                <span>Scan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle List */}
        <div className="bg-white p-1 rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-primary">Vehicle Records</h2>

            <div
              onClick={() => navigate("/vehicle/add")}
              className="
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-primary
    px-5
    py-3
    text-white
    font-medium
    shadow-md
    hover:bg-primary/90
    hover:shadow-lg
    active:scale-95
    transition-all
    duration-200
    cursor-pointer
    select-none
  "
            >
              <FiPlus className="w-5 h-5" />
              <span>Add Vehicle</span>
            </div>
          </div>

          {!loading && vehicles.length === 0 && (
            <div className="p-10 text-center">
              <FiTruck size={40} className="mx-auto text-slate-300" />

              <h3 className="mt-4 font-semibold text-slate-700">
                No Vehicle Records
              </h3>

              <p className="text-slate-500 mt-2">
                Register your first vehicle.
              </p>
            </div>
          )}

          {/* Desktop Table */}
          {!loading && vehicles.length > 0 && (
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr className="text-left text-sm text-slate-500">
                    <th className="px-6 py-4 font-semibold">Plate Number</th>
                    <th className="px-6 py-4 font-semibold">Owner</th>
                    <th className="px-6 py-4 font-semibold">Vehicle</th>
                    <th className="px-6 py-4 font-semibold">Last Service</th>
                    <th className="w-16"></th>
                  </tr>
                </thead>

                <tbody>
                  {vehicles.map((vehicle: any) => (
                    <tr
                      key={vehicle.id}
                      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                      className="
              group
              cursor-pointer
              border-t
              border-slate-100
              hover:bg-primary/5
              transition
            "
                    >
                      {/* Plate */}
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold tracking-wider text-primary">
                          {vehicle.plate_number}
                        </span>
                      </td>

                      {/* Owner */}
                      <td className="px-6 py-5">
                        <div className="font-semibold text-slate-800">
                          {vehicle.owner_name}
                        </div>

                        <div className="text-sm text-slate-500">
                          Vehicle Owner
                        </div>
                      </td>

                      {/* Vehicle */}
                      <td className="px-6 py-5">
                        <div className="font-medium text-slate-800">
                          {vehicle.vehicle_name}
                        </div>

                        <div className="text-sm text-slate-500">
                          Registered Vehicle
                        </div>
                      </td>

                      {/* Service */}
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-primary">
                          {vehicle.service_date || "No Record"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-right">
                        <div
                          className="
                  inline-flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  group-hover:bg-primary
                  group-hover:text-white
                  transition
                "
                        >
                          <FiChevronRight />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Cards */}
          {!loading && vehicles.length > 0 && (
            <div className="space-y-4 lg:hidden">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                  className="
          group
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          text-left
          shadow-sm
          transition-all
          hover:border-primary/20
          hover:shadow-md
          active:scale-[0.98]
        "
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                        <FiTruck className="text-xl text-primary" />
                      </div>

                      <div>
                        <span className="inline-flex rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary">
                          {vehicle.plate_number}
                        </span>

                        <h3 className="mt-3 text-lg font-semibold text-slate-800">
                          {vehicle.vehicle_name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {vehicle.owner_name}
                        </p>
                      </div>
                    </div>

                    <div
                      className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-400
              transition
              group-hover:bg-primary
              group-hover:text-white
            "
                    >
                      <FiChevronRight />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-4 h-px bg-slate-100" />

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-slate-400">Last Service</p>

                      <p className="font-medium text-slate-700">
                        {vehicle.service_date || "No Record"}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      Active
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {pagination.lastPage > 1 && (
            <div className="border-t border-slate-100 px-4 py-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-slate-500 text-center lg:text-left">
                  Showing {vehicles.length} of {pagination.total} vehicles
                </p>

                {/* Desktop */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => fetchVehicles(pagination.currentPage - 1)}
                    className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
                  >
                    ←
                  </button>

                  {getPageNumbers(
                    pagination.currentPage,
                    pagination.lastPage,
                  ).map((page, index) =>
                    page === "..." ? (
                      <span key={index} className="px-2 text-slate-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => fetchVehicles(page)}
                        className={`h-10 w-10 rounded-xl text-sm font-medium ${
                          page === pagination.currentPage
                            ? "bg-primary text-white"
                            : "border border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    disabled={pagination.currentPage === pagination.lastPage}
                    onClick={() => fetchVehicles(pagination.currentPage + 1)}
                    className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
                  >
                    →
                  </button>
                </div>

                {/* Mobile */}
                <div className="flex sm:hidden items-center justify-between gap-3">
                  <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => fetchVehicles(pagination.currentPage - 1)}
                    className="h-10 px-4 rounded-xl border border-slate-200 bg-white disabled:opacity-40"
                  >
                    ←
                  </button>

                  <span className="text-sm font-medium text-slate-700">
                    Page {pagination.currentPage} of {pagination.lastPage}
                  </span>

                  <button
                    disabled={pagination.currentPage === pagination.lastPage}
                    onClick={() => fetchVehicles(pagination.currentPage + 1)}
                    className="h-10 px-4 rounded-xl border border-slate-200 bg-white disabled:opacity-40"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {isOpen && (
          <PlateScannerModal
            videoRef={videoRef}
            onClose={closeCamera}
            onCapture={handleCapture}
            extractedPlate={extractedPlate}
            isProcessing={isProcessing}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
