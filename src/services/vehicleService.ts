import { api } from "../lib/api";

export interface VehiclePartPayload {
  name: string;
  price: string;
}

export interface ServicePart {
  name: string;
  price: number;
}

export interface CreateVehiclePayload {
  ownerName: string;
  address: string;
  vehicle: string;
  plateNumber: string;
  date: string;
  parts: VehiclePartPayload[];
}

export interface AddNewHistory {
  vehicle_id: number,
  parts: ServicePart[],
  serviceDate?: string
}

export interface Vehicle {
  id: number;
  owner_name: string;
  address: string;
  vehicle_name: string;
  plate_number: string;
  service_date: string;
  created_at: string;
}

export interface VehicleDetails {
  id: number;
  owner_name: string;
  address: string;
  vehicle_name: string;
  plate_number: string;
  service_date: string;
}

export interface VehicleStats {
  total_services: number;
  total_parts: number;
  total_amount: number;
}

export interface VehiclePart {
  id: number;
  name: string;
  price: number | null;
}
export interface TimelineItem {
  date: string;
  total_amount: number;
  parts: VehiclePart[];
}

export interface VehicleDetailsResponse {
  vehicle: VehicleDetails;
  stats: VehicleStats;
  parts: VehiclePart[];
  timeline: any;
}
export interface VehiclePaginationResponse {
  data: Vehicle[];

  current_page: number;
  last_page: number;
  per_page: number;
  total: number;

  next_page_url: string | null;
  prev_page_url: string | null;
}

export interface DashboardActivity {
  type: "device_invited" | "vehicle_added" | "service_record";
  label: string;
  title: string;
  time: string;
  created_at: string;
  total_parts?: number;
}

export interface VehicleDashboardStat {
  total_vehicles: number;
  service_records: number;
  total_technicians: number;
  today_activities: DashboardActivity[];
}

export const vehicleService = {
  create(payload: CreateVehiclePayload) {
    return api("/vehicles", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getDashboardStats() {
    return api<{
      success: boolean;
      message: string;
      data: VehicleDashboardStat;
    }>(`/vehicles/dashboard/stats`);
  },
  getAll(page = 1, search = "") {
    const params = new URLSearchParams({
      page: String(page),
    });

    if (search) {
      params.append("search", search);
    }

    return api<{
      success: boolean;
      message: string;
      data: VehiclePaginationResponse;
    }>(`/vehicles?${params.toString()}`);
  },

  getById(id: number) {
    return api<{
      success: boolean;
      data: VehicleDetailsResponse;
    }>(`/vehicles/${id}`);
  },

  searchByPlate(plateNumber: string) {
    return api(`/vehicles/plate/${plateNumber}`);
  },

  addNewService(payload: AddNewHistory){
    return api("/vehicle/plate/history", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
};
