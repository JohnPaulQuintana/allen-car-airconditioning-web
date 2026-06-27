import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import logo from "../assets/images/logo-transparent.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, success } = useAuth();

  return (
    <div className="min-h-screen bg-[#001845] relative overflow-y-auto flex items-start lg:items-center justify-center py-8 px-4">
      {/* Background Effects */}
      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-[-250px] right-[-150px] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Card */}
      <div className="w-full max-w-6xl rounded-[40px] overflow-hidden backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl grid lg:grid-cols-2">
        {/* Branding */}
        <div className="hidden lg:flex flex-col justify-center items-center p-16 text-center">
          <img
            src={logo}
            alt="logo"
            className="w-40 h-40 object-contain drop-shadow-2xl"
          />

          <h1 className="text-white text-5xl font-bold mt-8 tracking-tight">
            Allen Car
          </h1>

          <h2 className="text-white text-5xl font-bold">Air Conditioning</h2>

          <p className="text-white/60 mt-6 max-w-md text-lg leading-relaxed">
            Vehicle service records, technician management, and customer history
            in one platform.
          </p>
        </div>

        {/* Login */}
        <div className="bg-white p-6 sm:p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#001845]/5 text-[#001845] text-sm font-medium">
                Welcome Back
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-[#001845] mt-4">
                Sign In
              </h2>

              <p className="text-slate-500 mt-2 mb-2">
                Access your workshop management dashboard.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
                  {success}
                </div>
              )}
            </div>

            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();

                await login(email, password);
              }}
            >
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#001845] focus:ring-4 focus:ring-[#001845]/10 outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full h-14 px-5 pr-14 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#001845] focus:ring-4 focus:ring-[#001845]/10 outline-none transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-[#001845] hover:bg-[#002766] transition text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#001845]/25 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
                {!loading && <FiArrowRight />}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-sm text-slate-400">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* QR Login */}
              <button
                type="button"
                onClick={() => navigate("/scan-invitation")}
                className="w-full h-14 rounded-2xl border border-slate-200 hover:border-[#001845] hover:bg-[#001845]/5 transition flex items-center justify-center gap-3 font-semibold text-[#001845]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm12 4h4m-4-4h4m-2-2v8"
                  />
                </svg>
                Scan Invitation QR
              </button>
            </form>

            <p className="text-center text-slate-400 text-sm mt-8">
              Allen Car Air Conditioning © 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
