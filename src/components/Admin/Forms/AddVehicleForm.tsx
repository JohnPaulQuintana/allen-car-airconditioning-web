import { useState } from "react";
import { FiPlus, FiSave, FiX } from "react-icons/fi";
import Popup from "../../Popup";
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
  // onCancel,
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
      className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <h2 className="font-semibold text-primary">Add Vehicle</h2>

        <p className="text-sm text-slate-500 mt-1">
          Register a new customer vehicle
        </p>
      </div>

      {/* Form */}
      <div className="p-5 space-y-5">
        {/* Owner */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Owner Name
          </label>

          <input
            type="text"
            value={form.ownerName}
            onChange={(e) => handleChange("ownerName", e.target.value)}
            placeholder="Juan Dela Cruz"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Address
          </label>

          <textarea
            rows={3}
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Customer Address"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none resize-none focus:border-primary"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Date
          </label>

          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        {/* Vehicle + Plate */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Vehicle
            </label>

            <input
              type="text"
              value={form.vehicle}
              onChange={(e) => handleChange("vehicle", e.target.value)}
              placeholder="Honda Civic"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
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
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary uppercase"
            />
          </div>
        </div>

        <div className="pb-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-primary">Parts Used</h3>

              <p className="text-sm text-slate-500">
                Add installed parts (price optional)
              </p>
            </div>

            <div
              onClick={addPart}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center"
            >
              <FiPlus />
            </div>

            {/* <button
              type="button"
              onClick={addPart}
              className="px-4 py-2 rounded-xl bg-primary text-white text-sm"
            >
              + Add Part
            </button> */}
          </div>

          <div className="space-y-4">
            {[...parts].reverse().map((part, reverseIndex) => {
              const index = parts.length - 1 - reverseIndex;

              return (
                <div key={index}>
                  <div className="grid md:grid-cols-[1fr_180px_auto] gap-3 items-center">
                    <input
                      type="text"
                      value={part.name}
                      onChange={(e) =>
                        updatePart(index, "name", e.target.value)
                      }
                      placeholder="Part Name"
                      className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                    />

                    <input
                      type="number"
                      value={part.price}
                      onChange={(e) =>
                        updatePart(index, "price", e.target.value)
                      }
                      placeholder="Price (Optional)"
                      className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                    />

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removePart(index)}
                        disabled={parts.length === 1}
                        className="w-8 h-8 text-white rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 flex items-center justify-center"
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>

                  {reverseIndex < parts.length - 1 && (
                    <div className="my-4 border-t border-slate-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-slate-100 flex justify-end gap-3">
        <button
          type="submit"
          className="px-5 py-3 rounded-2xl bg-primary text-white flex items-center gap-2"
        >
          <FiSave />
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
