import {
  FiUsers,
  FiSmartphone,
  FiShield,
  FiChevronRight,
  FiGrid,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useTechnician } from "../hooks/useTechnician";
import { type Device } from "../services/technicianService";

export default function TechniciansPage() {
  const [token, setToken] = useState("");
  const [qrValue, setQrValue] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [technicians, setTechnicians] = useState<Device[]>([]);
  const { createInvite, getDevices, loading, error, success } = useTechnician();

  const handleGenerateQR = async () => {
    const invite = await createInvite(name, email);

    if (!invite) return;

    setToken(invite.token);

    setQrValue(
      JSON.stringify({
        token: invite.token,
      }),
    );

    const devices = await getDevices();

    if (devices) {
      setTechnicians(devices);
    }
  };

  useEffect(() => {
    const loadDevices = async () => {
      const response = await getDevices();

      if (response) {
        setTechnicians(response);
      }
    };

    loadDevices();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 pb-24">
        {/* Hero */}
        <div className="bg-primary rounded-3xl p-6 lg:p-8 text-white">
          <p className="text-white/60 text-xs uppercase tracking-wider">
            Technician Access
          </p>

          <h1 className="text-3xl font-bold mt-2">Technician Invitations</h1>

          <p className="text-white/80 mt-2 max-w-xl">
            Generate secure QR invitations for technician mobile access.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6 max-w-xl">
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-[11px] uppercase text-white/60">Devices</p>

              <h2 className="text-2xl font-bold mt-1">{technicians.length}</h2>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-[11px] uppercase text-white/60">Pending</p>

              <h2 className="text-2xl font-bold mt-1">
                {
                  technicians.filter((tech) => tech.status !== "Connected")
                    .length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left Panel */}
            <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary/60">
                  Technician Access
                </p>

                <h2 className="text-2xl font-bold text-primary mt-2">
                  Generate Invitation
                </h2>

                <p className="text-slate-500 mt-2">
                  Create a secure QR invitation for a technician to pair their
                  mobile device.
                </p>
              </div>

              <div className="space-y-4 mt-8">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Technician Name
                  </label>

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Email Address (Optional)
                  </label>

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@email.com"
                    className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-600 text-sm">
                    {success}
                  </div>
                )}

                <button
                  onClick={handleGenerateQR}
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-primary text-white font-medium flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <FiGrid />

                  {loading ? "Generating..." : "Generate Invitation"}
                </button>
              </div>
            </div>

            {/* Right Panel */}
            <div className="p-8 flex flex-col items-center justify-center bg-slate-50">
              {qrValue ? (
                <>
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
                    <QRCodeCanvas value={qrValue} size={240} />
                  </div>

                  <div className="mt-6 w-full max-w-md space-y-3">
                    <div className="bg-white rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs uppercase text-slate-500">
                        Invitation Token
                      </p>

                      <p className="font-mono text-sm mt-2 break-all">
                        {token}
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-4">
                      <p className="text-xs uppercase text-slate-500">Status</p>

                      <p className="font-medium mt-2 text-green-600">
                        Ready to Scan
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center max-w-sm">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
                    <FiGrid size={36} className="text-primary" />
                  </div>

                  <h3 className="font-semibold text-slate-800 mt-6">
                    QR Preview
                  </h3>

                  <p className="text-slate-500 mt-2">
                    Fill in technician information and generate an invitation QR
                    code.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-semibold text-primary">Technicians</h2>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-sm text-slate-500">
                <th className="px-6 py-4">Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Paired</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {technicians.map((tech) => (
                <tr
                  key={tech.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-5 font-medium">{tech.name}</td>

                  <td className="capitalize">{tech.role}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tech.status === "Connected"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {tech.status}
                    </span>
                  </td>

                  <td>{tech.paired_at}</td>

                  <td className="pr-6 text-right">
                    <FiChevronRight className="inline text-slate-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {technicians.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <FiUsers className="text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-primary">{tech.name}</h3>

                    <p className="text-sm text-slate-500 capitalize">
                      {tech.role}
                    </p>
                  </div>
                </div>

                <FiChevronRight />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-slate-50 rounded-2xl p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FiShield />
                    Status
                  </div>

                  <p className="font-medium mt-1">{tech.status}</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FiSmartphone />
                    Paired
                  </div>

                  <p className="font-xs mt-1">{tech.paired_at}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
