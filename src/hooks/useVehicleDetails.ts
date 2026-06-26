import { useState } from "react";
import {
  vehicleService,
  type VehicleDetails,
  type VehicleStats,
  type VehiclePart,
  type TimelineItem,
  type ServicePart
} from "../services/vehicleService";

export function useVehicleDetails() {
  const [loading, setLoading] = useState(false);

  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);

  const [stats, setStats] = useState<VehicleStats | null>(null);

  const [parts, setParts] = useState<VehiclePart[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchVehicle = async (id: number) => {
    try {
      setLoading(true);
      setError("");

      const response = await vehicleService.getById(id);

      setVehicle(response.data.vehicle);
      setStats(response.data.stats);
      setParts(response.data.parts);
      setTimeline(response.data.timeline ?? []);
      return response;
    } catch (err: any) {
      setError(err.message || "Unable to load vehicle");

      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchByPlate = async (plateNumber: string) => {
    try {
      setLoading(true);
      setError("");

      const response: any = await vehicleService.searchByPlate(plateNumber);

      setVehicle(response.data.vehicle);

      setTimeline(response.data.timeline ?? []);

      setStats({
        total_services: response.data.timeline?.length ?? 0,
        total_parts:
          response.data.timeline?.reduce(
            (sum: number, item: TimelineItem) => sum + item.parts.length,
            0,
          ) ?? 0,

        total_amount:
          response.data.timeline?.reduce(
            (sum: number, item: TimelineItem) =>
              sum + Number(item.total_amount ?? 0),
            0,
          ) ?? 0,
      });

      return response;
    } catch (err: any) {
      setError(err.message || "Vehicle not found");

      return null;
    } finally {
      setLoading(false);
    }
  };

  const addNewHistory = async (
    vehicle_id: number,
    parts: ServicePart[],
    serviceDate?:string
  ) => {
    console.log(vehicle_id, parts);
    try {
      // setLoading(true);
      setError("");
      setSuccess("")
      const response: any = await vehicleService.addNewService({vehicle_id, parts, serviceDate});

      // console.log(response)
      if (response.success) {
        setSuccess(response.message)
      }

      return response

    } catch (err: any) {
      setSuccess("")
      setError(err.message || "Vehicle not found");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    vehicle,
    stats,
    timeline,
    parts,
    loading,
    error,
    success,
    fetchVehicle,
    fetchByPlate,
    addNewHistory,
  };
}
