import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function GuestRoute({
  children,
}: Props) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  if (token) {
    if (user.role === "technician") {
      return (
        <Navigate
          to="/scan/vehicles"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <>{children}</>;
}