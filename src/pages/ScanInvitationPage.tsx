import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiSmartphone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { useTechnician } from "../hooks/useTechnician";

export default function ScanInvitationPage() {
  const { acceptInvite, loading, error } = useTechnician();

  const navigate = useNavigate();

  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [status, setStatus] = useState("Waiting for QR code...");
  const [token, setToken] = useState("");
  const handleBack = async () => {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      }
    } catch (error) {
      console.error(error);
    }

    navigate("/");
  };

  useEffect(() => {
    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("qr-reader");

        scannerRef.current = scanner;

        await scanner.start(
          {
            facingMode: "environment",
          },
          {
            fps: 10,
            qrbox: (viewfinderWidth, viewfinderHeight) => {
              const size = Math.min(viewfinderWidth, viewfinderHeight) * 0.7;

              return {
                width: size,
                height: size,
              };
            },
          },
          async (decodedText) => {
            try {
              setStatus("Validating invitation...");

              const qrData = JSON.parse(decodedText);

              setToken(qrData.token);

              const response = await acceptInvite(qrData.token);

              console.log(response);

              if (!response) {
                setStatus("Invitation rejected");
                return;
              }

              setStatus("Access granted");

              await scanner.stop();
              await scanner.clear();

              navigate("/scan/vehicles");
            } catch (error) {
              console.error(error);

              setStatus("Invalid QR code");
            }
          },
          () => {},
        );
      } catch (error) {
        console.error(error);

        setStatus("Unable to access camera");
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#001845] flex items-center justify-center p-4 lg:p-6">
      <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl grid lg:grid-cols-2">
        {/* Left */}
        <div className="hidden lg:flex bg-[#001845] text-white p-12 flex-col justify-center">
          <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center">
            <FiSmartphone size={40} />
          </div>

          <h1 className="text-4xl font-bold mt-6">Technician Invitation</h1>

          <p className="text-white/70 mt-4 leading-relaxed">
            Scan your invitation QR code provided by the administrator to
            securely register this device.
          </p>
        </div>

        {/* Right */}
        <div className="p-6 lg:p-12">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 hover:text-[#001845]"
          >
            <FiArrowLeft />
            Back
          </button>

          <div className="mt-8">
            <p className="text-sm uppercase tracking-wider text-slate-400">
              Secure Access
            </p>
            <p>{token}</p>
            <h2 className="text-3xl font-bold text-[#001845] mt-2">
              Scan Invitation QR
            </h2>

            <p className="text-slate-500 mt-2">
              Point your camera at the invitation QR code.
            </p>
          </div>

          {/* Scanner */}
          <div className="mt-8">
            <div className="relative h-[320px] lg:h-[450px] rounded-3xl overflow-hidden bg-black">
              <div
                id="qr-reader"
                className="absolute inset-0 overflow-hidden"
              />

              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="relative w-[70%] max-w-[280px] aspect-square">
                  <div className="absolute inset-0 border-primary rounded-3xl">
                    <div className="scanner-line" />
                  </div>

                  {/* <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-xl" /> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-slate-500">
              {loading ? "Connecting device..." : status}
            </p>

            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-200 p-3 text-red-600 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
