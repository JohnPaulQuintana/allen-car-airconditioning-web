import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiX, FiPackage } from "react-icons/fi";

import { type ServicePart } from "../../services/vehicleService";

interface AddHistoryModalProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSave: (parts: ServicePart[], serviceDate?: string) => Promise<void> | void;
}

const EMPTY_PART: ServicePart = {
  name: "",
  price: 0,
};

export default function AddHistoryModal({
  open,
  loading = false,
  onClose,
  onSave,
}: AddHistoryModalProps) {
  const [serviceDate, setServiceDate] = useState("");
  const [parts, setParts] = useState<ServicePart[]>([EMPTY_PART]);

  const [errors, setErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!open) {
      setParts([{ ...EMPTY_PART }]);
      setErrors({});
      setServiceDate("");
    }
  }, [open]);

  const addPart = () => {
    setParts((prev) => [...prev, { ...EMPTY_PART }]);
    setErrors({});
  };

  const removePart = (index: number) => {
    if (parts.length === 1) return;

    setParts((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePart = (
    index: number,
    field: keyof ServicePart,
    value: string,
  ) => {
    setParts((prev) =>
      prev.map((part, i) =>
        i === index
          ? {
              ...part,
              [field]:
                field === "price"
                  ? value === ""
                    ? 0
                    : Math.max(0, Number(value))
                  : value,
            }
          : part,
      ),
    );

    if (field === "name") {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
    }
  };

  const submit = async () => {
    const newErrors: Record<number, string> = {};

    parts.forEach((part, index) => {
      if (!part.name.trim()) {
        newErrors[index] = "Part name is required.";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    await onSave(parts, serviceDate || undefined);

    setParts([{ ...EMPTY_PART }]);
    setErrors({});

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-white/80 backdrop-blur-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Add Service History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add all replaced parts for this service.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[65vh] space-y-4 overflow-y-auto p-6">
          {/* Service Date */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <label className="text-sm text-slate-500">
              Service Date <span className="text-slate-400">(Optional)</span>
            </label>

            <input
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            />

            <p className="mt-2 text-xs text-slate-500">
              Leave this blank for today's service. Only set a date when adding
              an older service record.
            </p>
          </div>
          {parts.map((part: ServicePart, index: number) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiPackage className="text-primary" />
                  <span className="font-medium">Part #{index + 1}</span>
                </div>

                {parts.length > 1 && (
                  <button
                    onClick={() => removePart(index)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm text-slate-500">
                    Part Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={part.name}
                    onChange={(e) => updatePart(index, "name", e.target.value)}
                    className={`mt-2 w-full rounded-xl px-4 py-3 outline-none ${
                      errors[index]
                        ? "border border-red-500"
                        : "border border-slate-200 focus:border-primary"
                    }`}
                    placeholder="e.g. Compressor"
                  />

                  {errors[index] && (
                    <p className="mt-1 text-sm text-red-500">{errors[index]}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-slate-500">
                    Price <span className="text-slate-400">(Optional)</span>
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={part.price || ""}
                    onChange={(e) => updatePart(index, "price", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                    placeholder="2500"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addPart}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 py-4 text-primary transition hover:bg-primary/5"
          >
            <FiPlus />
            Add Another Part
          </button>
          <button
            disabled={loading}
            onClick={submit}
            className="w-full rounded-xl bg-primary px-6 py-3 text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Service"}
          </button>
          <div className="p-10 mb-10"></div>
        </div>
      </div>
    </div>
  );
}
