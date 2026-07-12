import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";

interface Part {
  id?: number;
  name: string;
  price: number | null;
}

interface History {
  date: string;
  total_amount: number;
  parts: Part[];
}

interface Props {
  open: boolean;
  history: History | null;
  onClose: () => void;
  onSaved: (payload: History) => void;
}

export default function EditHistoryForm({ open, history, onClose, onSaved }: Props) {
  const [form, setForm] = useState<History>({
    date: "",
    total_amount: 0,
    parts: [],
  });

  useEffect(() => {
    if (history) {
      setForm({
        date: history.date,
        total_amount: history.total_amount,
        parts: history.parts.map((p) => ({
          ...p,
        })),
      });
    }
  }, [history]);

  if (!open) return null;

  const updatePart = (
    index: number,
    field: keyof Part,
    value: string | number | null,
  ) => {
    setForm((prev) => {
      const parts = [...prev.parts];
      parts[index] = {
        ...parts[index],
        [field]: value,
      };

      return {
        ...prev,
        parts,
      };
    });
  };

  const removePart = (index: number) => {
    setForm((prev) => ({
      ...prev,
      parts: prev.parts.filter((_, i) => i !== index),
    }));
  };

  const addPart = () => {
    setForm((prev) => ({
      ...prev,
      parts: [
        ...prev.parts,
        {
          name: "",
          price: null,
        },
      ],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold text-primary">
            Edit Service History
          </h2>

          <button onClick={onClose}>
            <FiX size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="text-sm font-medium">Service Date</label>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Parts</h3>

              <button
                onClick={addPart}
                className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-white"
              >
                <FiPlus />
                Add Part
              </button>
            </div>

            <div className="space-y-3">
              {form.parts.map((part, index) => (
                <div key={part.id ?? index} className="rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <input
                      className="flex-1 rounded-lg border p-3"
                      value={part.name}
                      placeholder="Part or Service"
                      onChange={(e) =>
                        updatePart(index, "name", e.target.value)
                      }
                    />

                    <button
                      onClick={() => removePart(index)}
                      className="rounded-lg border border-red-200 p-3 text-red-500 hover:bg-red-50"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end gap-3 mb-4">
          <button onClick={onClose} className="rounded-xl border px-5 py-2">
            Cancel
          </button>

          <button
            onClick={() => {
              console.log(form);
              onSaved(form);
            }}
            className="rounded-xl bg-primary px-5 py-2 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
