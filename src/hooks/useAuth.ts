import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export function useAuth() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const login = async (
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await authService.login({
        email,
        password,
      }) as any;

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setSuccess(response.message);

      navigate("/dashboard");

      return response;
    } catch (err: any) {
      if (err.errors) {
        const messages = Object.values(
          err.errors
        )
          .flat()
          .join("\n");

        setError(messages);
      } else {
        setError(
          err.message || "Login failed"
        );
      }

      return;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");
    }
  };

  return {
    login,
    logout,
    loading,
    error,
    success,
  };
}