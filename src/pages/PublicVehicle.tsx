import {
  FiSearch,
  FiCamera,
  // FiPlus,
  FiTruck,
  FiChevronRight,
} from "react-icons/fi";
import { useCamera } from "../hooks/useCamera";
import { useEffect, useState } from "react";
import PlateScannerModal from "../components/Admin/PlateScannerModal";
import { recognizePlate } from "../services/ocr.service";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

export default function PublicVehiclePage() {
  const navigate = useNavigate();

  const vehicles = [
    {
      plate: "ABC 1234",
      model: "Toyota Vios",
      owner: "Juan Dela Cruz",
      lastService: "Aircon Cleaning",
    },
    {
      plate: "XYZ 5678",
      model: "Mitsubishi Mirage",
      owner: "Pedro Santos",
      lastService: "Compressor Repair",
    },
    {
      plate: "DEF 9012",
      model: "Honda City",
      owner: "Maria Santos",
      lastService: "General Checkup",
    },
  ];

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

          navigate("/result", {
            state: {
              plate: result.plate,
              rawText: result.debug,
            },
          });
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

    navigate("/result", {
      state: {
        plate: value.toUpperCase(),
      },
    });
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-24 overflow-x-hidden">
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
                  className="flex-1 px-3 py-4 outline-none text-slate-700 bg-transparent"
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
      py-4
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
      py-4
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
          
        </div>
        
        {/* Vehicle List */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-primary">Recent Vehicles</h2>

            <button className="text-sm text-primary font-medium">
              View All
            </button>
          </div>

          {/* Desktop Table */}
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
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.plate}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition"
                  >
                    <td className="px-6 py-5 font-semibold text-primary">
                      {vehicle.plate}
                    </td>

                    <td className="text-slate-700">{vehicle.owner}</td>

                    <td className="text-slate-700">{vehicle.model}</td>

                    <td className="text-slate-500">{vehicle.lastService}</td>

                    <td className="pr-6 text-right">
                      <FiChevronRight className="inline text-slate-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {vehicles.map((vehicle, index) => (
              <button
                key={vehicle.plate}
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
                      {vehicle.plate}
                    </p>

                    <p className="text-sm text-slate-500">{vehicle.model}</p>

                    <p className="text-xs text-slate-400">{vehicle.owner}</p>
                  </div>
                </div>

                <FiChevronRight className="text-slate-400" />
              </button>
            ))}
          </div>
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
    </PublicLayout>
  );
}
