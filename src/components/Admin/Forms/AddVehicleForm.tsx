import { useState } from "react";
import { FiPlus, FiSave, FiX, FiUser, FiMapPin, FiCalendar, FiHash } from "react-icons/fi";
import PopupDarker from "../../PopupDarker";

interface AddVehicleFormProps {
  onSubmit?: (data: {
    ownerName: string;
    address: string;
    vehicle: string;
    plateNumber: string;
    date: string;
    parts: {
      name: string;
      price: string;
    }[];
  }) => void;
  onCancel?: () => void;
}

export default function AddVehicleForm({
  onSubmit,
}: AddVehicleFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const [parts, setParts] = useState([
    {
      name: "",
      price: "",
    },
  ]);
  const [form, setForm] = useState({
    ownerName: "",
    address: "",
    vehicle: "",
    plateNumber: "",
    date: today,
  });
  const [popup, setPopup] = useState({
    open: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const addPart = () => {
    setParts((prev) => [
      ...prev,
      {
        name: "",
        price: "",
      },
    ]);
  };

  const removePart = (index: number) => {
    setParts((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePart = (
    index: number,
    field: "name" | "price",
    value: string,
  ) => {
    setParts((prev) =>
      prev.map((part, i) =>
        i === index
          ? {
              ...part,
              [field]: value,
            }
          : part,
      ),
    );
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.ownerName.trim()) {
      return setPopup({
        open: true,
        type: "error",
        title: "Owner Name Required",
        message: "Please enter the vehicle owner's name.",
      });
    }

    if (!form.vehicle.trim()) {
      return setPopup({
        open: true,
        type: "error",
        title: "Vehicle Required",
        message: "Please enter the vehicle name.",
      });
    }

    if (!form.plateNumber.trim()) {
      return setPopup({
        open: true,
        type: "error",
        title: "Plate Number Required",
        message: "Please enter the vehicle plate number.",
      });
    }

    if (parts.some((p) => !p.name.trim())) {
      return setPopup({
        open: true,
        type: "error",
        title: "Invalid Parts",
        message: "Every part must have a name.",
      });
    }

    onSubmit?.({
      ...form,
      parts,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <FiSave className="text-primary text-lg" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800 text-lg">Add Vehicle</h2>
            <p className="text-sm text-slate-500">Register a new customer vehicle</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-5">
        {/* Two Column Layout for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Owner */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <FiUser className="text-primary text-sm" />
              Owner Name
            </label>
            <input
              type="text"
              value={form.ownerName}
              onChange={(e) => handleChange("ownerName", e.target.value)}
              placeholder="Juan Dela Cruz"
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <FiCalendar className="text-primary text-sm" />
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Vehicle */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <FiSave className="text-primary text-sm" />
              Vehicle
            </label>
            <input
              type="text"
              value={form.vehicle}
              onChange={(e) => handleChange("vehicle", e.target.value)}
              placeholder="Honda Civic"
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Plate Number */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <FiHash className="text-primary text-sm" />
              Plate Number
            </label>
            <input
              type="text"
              value={form.plateNumber}
              onChange={(e) =>
                handleChange(
                  "plateNumber",
                  e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
                )
              }
              placeholder="ABC1234"
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm uppercase outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Address - Full Width */}
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
              <FiMapPin className="text-primary text-sm" />
              Address
            </label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Customer Address"
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm outline-none resize-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Parts Section */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-slate-800 text-sm">Parts Used</h3>
              <p className="text-xs text-slate-500">Add installed parts (price optional)</p>
            </div>
            <button
              type="button"
              onClick={addPart}
              className="px-3.5 py-1.5 rounded-lg bg-primary text-white text-sm font-medium flex items-center gap-1.5 transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
            >
              <FiPlus className="text-sm" />
              Add Part
            </button>
          </div>

          <div className="space-y-3">
            {[...parts].reverse().map((part, reverseIndex) => {
              const index = parts.length - 1 - reverseIndex;

              return (
                <div key={index}>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_160px_auto] gap-3 items-center bg-slate-50/80 p-3 rounded-lg border border-slate-200">
                    <input
                      type="text"
                      value={part.name}
                      onChange={(e) =>
                        updatePart(index, "name", e.target.value)
                      }
                      placeholder="Part Name"
                      className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <input
                      type="number"
                      value={part.price}
                      onChange={(e) =>
                        updatePart(index, "price", e.target.value)
                      }
                      placeholder="Price"
                      className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => removePart(index)}
                      disabled={parts.length === 1}
                      className="w-8 h-8 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 disabled:hover:bg-red-500 flex items-center justify-center transition-colors"
                    >
                      <FiX className="text-sm" />
                    </button>
                  </div>

                  {reverseIndex < parts.length - 1 && (
                    <div className="my-3 border-t border-slate-200/60" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Are you sure you want to cancel?")) {
              // Handle cancel
            }
          }}
          className="px-5 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium flex items-center gap-2 transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
        >
          <FiSave className="text-sm" />
          Save Vehicle
        </button>
      </div>

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
    </form>
  );
}