import { api } from "../lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  login(payload: LoginPayload) {
    return api("/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  me() {
    return api("/me");
  },

  logout() {
    return api("/logout", {
      method: "POST",
    });
  },

  refresh() {
    return api("/auth/refresh", {
      method: "POST",
    });
  },
};