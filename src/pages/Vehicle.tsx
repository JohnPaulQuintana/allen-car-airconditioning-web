import {
  FiSearch,
  FiCamera,
  FiPlus,
  FiTruck,
  FiChevronRight,
} from "react-icons/fi";
import DashboardLayout from "../layouts/DashboardLayout";
import { useCamera } from "../hooks/useCamera";
import { useEffect, useState } from "react";
import PlateScannerModal from "../components/Admin/PlateScannerModal";
import { recognizePlate } from "../services/ocr.service";
import { useNavigate } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";

export default function VehiclesPage() {
  const navigate = useNavigate();
  const { vehicles, pagination, fetchVehicles, loading } = useVehicle();

  const { videoRef, isOpen, openCamera, closeCamera, attachVideo, capture } =
    useCamera();

  const [extractedPlate, setExtractedPlate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchPlate, setSearchPlate] = useState("");

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

  useEffect(() => {
    fetchVehicles(1);
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto space-y-6 overflow-x-hidden">
        {/* Search + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          {/* Search */}
          <div className="bg-primary rounded-3xl p-6 text-white">
            <p className="text-white/60 text-xs uppercase tracking-wider">
              Vehicle Lookup
            </p>

            <h1 className="text-3xl font-bold mt-2">Search Vehicle</h1>

            <p className="text-white/70 mt-2">
              Search by plate number or customer name.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-white rounded-2xl px-4 flex items-center">
                <FiSearch size={18} className="text-slate-400" />

                <input
                  type="text"
                  value={searchPlate}
                  onChange={(e) => setSearchPlate(e.target.value)}
                  placeholder="Plate Number or Customer Name"
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
                className="
      bg-white
      text-primary
      px-6
      py-3
      rounded-2xl
      font-semibold
      border
      border-white/20
      hover:bg-slate-50
      disabled:opacity-50
      disabled:cursor-not-allowed
      transition
    "
              >
                Search
              </button>

              <button
                onClick={openCamera}
                className="
      bg-white
      text-primary
      px-5
      py-3
      rounded-2xl
      font-semibold
      flex
      items-center
      justify-center
      gap-2
      hover:bg-slate-50
      transition
    "
              >
                <FiCamera />
                Scan
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          {/* <div className="grid gap-4">
            <button
              onClick={() => navigate("/vehicle/add")}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm text-left hover:shadow-md transition"
            >
              <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center">
                <FiPlus />
              </div>

              <h3 className="font-semibold text-primary mt-4">Add Vehicle</h3>

              <p className="text-sm text-slate-500 mt-1">
                Register new vehicle
              </p>
            </button>
          </div> */}
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Vehicles</p>

            <h2 className="text-3xl font-bold text-primary mt-2">1,254</h2>
          </div>

          <div className="bg-primary rounded-3xl p-5 text-white">
            <p className="text-sm text-white/60">Records</p>

            <h2 className="text-3xl font-bold mt-2">3,890</h2>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Technicians</p>

            <h2 className="text-3xl font-bold text-primary mt-2">5</h2>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Searches Today</p>

            <h2 className="text-3xl font-bold text-primary mt-2">47</h2>
          </div>
        </div> */}

        {/* Vehicle List */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-primary">Vehicle Records</h2>

            <div
              onClick={() => navigate("/vehicle/add")}
              className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center"
            >
              <FiPlus />
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
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-sm text-slate-500">
                    <th className="px-6 py-4 font-medium">Plate Number</th>

                    <th className="font-medium">Owner</th>

                    <th className="font-medium">Vehicle</th>

                    <th className="font-medium">Last Service</th>

                    <th />
                  </tr>
                </thead>

                <tbody>
                  {vehicles.map((vehicle: any) => (
                    <tr
                      key={vehicle.plate_number}
                      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition"
                    >
                      <td className="px-6 py-5 font-semibold text-primary">
                        {vehicle.plate_number}
                      </td>

                      <td className="text-slate-700">{vehicle.plate_number}</td>

                      <td className="text-slate-700">{vehicle.vehicle_name}</td>

                      <td className="text-slate-500">{vehicle.service_date}</td>

                      <td className="pr-6 text-right">
                        <FiChevronRight className="inline text-slate-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Cards */}
          {!loading && vehicles.length > 0 && (
            <div className="lg:hidden">
              {vehicles.map((vehicle, index) => (
                <button
                  key={vehicle.id}
                  onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                  className={`w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 ${
                    index !== vehicles.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <FiTruck className="text-primary" />
                    </div>

                    <div className="text-left">
                      <p className="font-semibold text-primary">
                        {vehicle.plate_number}
                      </p>

                      <p className="text-sm text-slate-500">
                        {vehicle.vehicle_name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {vehicle.owner_name}
                      </p>
                    </div>
                  </div>

                  <FiChevronRight className="text-slate-400" />
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
