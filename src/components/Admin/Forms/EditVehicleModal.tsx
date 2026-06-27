import { useEffect, useState } from "react";
import { vehicleService } from "../../../services/vehicleService";

interface Props {
  open: boolean;
  vehicle: any;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditVehicleModal({
  open,
  vehicle,
  onClose,
  onSaved,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    owner_name: "",
    address: "",
    plate_number: "",
    vehicle_name: "",
  });

  useEffect(() => {
    if (vehicle) {
      setForm({
        owner_name: vehicle.owner_name || "",
        address: vehicle.address || "",
        plate_number: vehicle.plate_number || "",
        vehicle_name: vehicle.vehicle_name || "",
      });
    }
  }, [vehicle]);

  if (!open) return null;

  const update = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = async () => {
    try {
      setLoading(true);

      await vehicleService.update(vehicle.id, form);

      onSaved();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[calc(100vh-8rem)] flex flex-col">
        <div className="border-b p-6">
          <h2 className="text-2xl font-bold text-primary">Edit Vehicle</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-primary mb-4">
              Owner Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm">Owner Name</label>

                <input
                  className="mt-2 w-full rounded-xl border p-3"
                  value={form.owner_name}
                  onChange={(e) => update("owner_name", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm">Address</label>

                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-xl border p-3"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-4">
              Vehicle Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Plate Number</label>

                <input
                  className="mt-2 w-full rounded-xl border p-3"
                  value={form.plate_number}
                  onChange={(e) => update("plate_number", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm">Vehicle Name</label>

                <input
                  className="mt-2 w-full rounded-xl border p-3"
                  value={form.vehicle_name}
                  onChange={(e) => update("vehicle_name", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t bg-white p-2 flex justify-end gap-3 sticky bottom-24">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border">
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={submit}
            className="bg-primary text-white px-4 py-2 rounded-xl"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        
      </div>
    </div>
  );
}
