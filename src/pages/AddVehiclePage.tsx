import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddVehicleForm from "../components/Admin/Forms/AddVehicleForm";
import DashboardLayout from "../layouts/DashboardLayout";
import { useVehicle } from "../hooks/useVehicle";

export default function AddVehiclePage() {
  const navigate = useNavigate();
  const { createVehicle, success } = useVehicle();

  const handleSubmit = async (data: {
    ownerName: string;
    address: string;
    vehicle: string;
    plateNumber: string;
    date: string;
    parts: {
      name: string;
      price: string;
    }[];
  }) => {
    const response = await createVehicle(data);

    if (response) {
      navigate("/vehicle");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero */}
        <div className="bg-primary rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 text-[140px] font-black leading-none">
            🚗
          </div>

          <button
            onClick={() => navigate("/vehicle")}
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <FiArrowLeft />
            Back to Vehicles
          </button>

          <div className="mt-5 flex items-center gap-3">
            {/* <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <FiPlus size={24} />
            </div> */}

            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider">
                Vehicle Registration
              </p>

              <h1 className="text-3xl font-bold mt-1">New Vehicle</h1>
            </div>
          </div>

          <p className="text-white/80 mt-4 max-w-xl">
            Register a new customer vehicle and create its service history
            profile.
          </p>
        </div>


        {success && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-600">
            {success}
          </div>
        )}

        {/* Form */}
        <AddVehicleForm
          onSubmit={handleSubmit}
          onCancel={() => navigate("/vehicle")}
        />
      </div>
    </DashboardLayout>
  );
}
