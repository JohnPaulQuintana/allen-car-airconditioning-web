import { useState } from "react";
import { technicianService, type Device } from "../services/technicianService";

export function useTechnician() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createInvite = async (name: string, email: string) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await technicianService.createInvite({
        name,
        email,
      });

      setSuccess(response.message);

      return response.data;
    } catch (err: any) {
      if (err.errors) {
        const messages = Object.values(err.errors).flat().join("\n");
        setError(messages);
      } else {
        setError(err.message || "Failed to create invitation");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async (token: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await technicianService.acceptInvite(token);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response;
    } catch (err: any) {
      if (err.errors) {
        const messages = Object.values(err.errors).flat().join("\n");
        setError(messages);
      } else {
        setError(err.message || err?.data?.message || "Unable to pair device");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  const getDevices = async (): Promise<Device[] | null> => {
    try {
      setLoading(true);
      setError("");

      const response = await technicianService.getDevices();

      return response.data;
    } catch (err: any) {
      if (err.errors) {
        const messages = Object.values(err.errors).flat().join("\n");
        setError(messages);
      } else {
        setError(err.message || "Failed to load devices");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createInvite,
    acceptInvite,
    getDevices,
    loading,
    error,
    success,
  };
}
