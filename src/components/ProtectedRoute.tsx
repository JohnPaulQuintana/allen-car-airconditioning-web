import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function AdminRoute({
  children,
}: Props) {
  const token = localStorage.getItem("token");

  // let user: any = null;

  // try {
  //   user = JSON.parse(
  //     localStorage.getItem("user") || "null"
  //   );
  // } catch {
  //   user = null;
  // }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // console.log(user?.role)
  // if (user?.role !== "admin") {
  //   return <Navigate to="/scan/vehicles" replace />;
  // }

  return <>{children}</>;
}