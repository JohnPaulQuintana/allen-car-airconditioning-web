import { api } from "../lib/api";

export interface CreateTechnicianInvitePayload {
  name: string;
  email: string;
}

export interface Device {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  paired_at: string;
}

export const technicianService = {
  getDevices() {
    return api<{
      success: boolean;
      message: string;
      data: Device[];
    }>("/devices", {
      method: "GET",
    });
  },

  createInvite(payload: CreateTechnicianInvitePayload) {
    return api<{
      success: boolean;
      message: string;
      data: {
        token: string;
        expires_at: string;
      };
    }>("/technician-invites", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  acceptInvite(token: string) {
    return api<{
      success: boolean;
      message: string;
      data: {
        token: string;
        user: {
          id: number;
          name: string;
          email: string;
          role: string;
        };
      };
    }>("/technician-invites/accept", {
      method: "POST",
      body: JSON.stringify({
        token,
      }),
    });
  },
};
