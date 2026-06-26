import { useState } from "react";
import { vehicleService, type Vehicle } from "../services/vehicleService";

export function useVehicle() {
  const [loading, setLoading] = useState(false);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 10,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createVehicle = async (payload: {
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
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response: any = await vehicleService.create(payload);

      setSuccess(response.message);

      return response;
    } catch (err: any) {
      if (err.errors) {
        const messages = Object.values(err.errors).flat().join("\n");

        setError(messages);
      } else {
        setError(err.message || "Unable to create vehicle");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");
      const response: any = await vehicleService.getDashboardStats();
      // console.log(response)
      return response
    } catch (err: any) {
      setError(err.message || "Unable to load vehicles");

      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async (page = 1, search = "") => {
    try {
      setLoading(true);
      setError("");

      const response = await vehicleService.getAll(page, search);

      setVehicles(response.data.data);

      setPagination({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        total: response.data.total,
        perPage: response.data.per_page,
      });

      return response;
    } catch (err: any) {
      setError(err.message || "Unable to load vehicles");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchDashboardStats,
    createVehicle,
    fetchVehicles,

    vehicles,
    pagination,

    loading,
    error,
    success,
  };
}
