import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login";
import DashboardPage from "../pages/Dashboard";
import VehiclesPage from "../pages/Vehicle";
import VehicleResultPage from "../pages/VehicleResultPage";
import AddVehiclePage from "../pages/AddVehiclePage";
import ScanInvitationPage from "../pages/ScanInvitationPage";
import TechniciansPage from "../pages/TechniciansPage";

import ProtectedRoute from "../components/ProtectedRoute";
import PublicVehiclePage from "../pages/PublicVehicle";
import GuestRoute from "../components/GuestRoute";
import VehicleDetailsPage from "../pages/VehicleDetailsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicle"
          element={
            <ProtectedRoute>
              <VehiclesPage />
            </ProtectedRoute>
          }
        />

        <Route
           path="/result/:plateNumber"
          element={
            <ProtectedRoute>
              <VehicleResultPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicle/:id"
          element={
            <ProtectedRoute>
              <VehicleDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicle/add"
          element={
            <ProtectedRoute>
              <AddVehiclePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/technician"
          element={
            <ProtectedRoute>
              <TechniciansPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/scan/vehicles"
          element={
            <ProtectedRoute>
              <PublicVehiclePage />
            </ProtectedRoute>
          }
        />

        <Route path="/scan-invitation" element={<ScanInvitationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
