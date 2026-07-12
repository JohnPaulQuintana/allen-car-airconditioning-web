import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddVehicleForm from "../components/Admin/Forms/AddVehicleForm";
import DashboardLayout from "../layouts/DashboardLayout";
import { useVehicle } from "../hooks/useVehicle";
import mascot from "../assets/images/mascot-trans.png";
import { useState } from "react";

export default function AddVehiclePage() {
  const navigate = useNavigate();
  const { createVehicle, success } = useVehicle();

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
                Vehicle Registration
              </h1>

              <div className="mt-2 text-white/70">
                <p className="text-white text-xl font-bold leading-8">
                  Register a new customer vehicle and create its service history
                  profile.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <div
                  onClick={() => navigate("/vehicle")}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:cursor-pointer hover:bg-white/20 px-4 py-2 backdrop-blur"
                >
                  <FiArrowLeft />
                  <span>Back</span>
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
              </div>
            </div>
          </div>
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
