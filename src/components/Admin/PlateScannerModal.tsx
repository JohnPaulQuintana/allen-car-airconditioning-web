import { type RefObject, useState } from "react";
import { FiLoader, FiX } from "react-icons/fi";

interface PlateScannerModalProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  onClose: () => void;
  onCapture: () => Promise<void>;
  extractedPlate?: string;
  isProcessing?: boolean;
}
export default function PlateScannerModal({
  videoRef,
  onClose,
  onCapture,
  extractedPlate,
  isProcessing = false,
}: PlateScannerModalProps) {
  const [flash, setFlash] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const handleCaptureClick = async () => {
    if (capturing || isProcessing) return;

    setCapturing(true);
    setFlash(true);

    setTimeout(() => {
      setFlash(false);
    }, 150);

    try {
      await onCapture();
    } finally {
      setTimeout(() => {
        setCapturing(false);
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Camera Flash */}
      {flash && (
        <div className="absolute inset-0 z-50 bg-white animate-pulse" />
      )}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-semibold">
              Scan Plate Number
            </h2>

            <p className="text-white/70 text-sm mt-1">
              Align vehicle plate inside the frame
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-11 h-11 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        <div className="flex-1 bg-black/70" />

        <div className="h-[180px] flex">
          <div className="flex-1 bg-black/70" />

          <div className="relative w-[85%] max-w-lg">
            <div className="absolute inset-0 rounded-3xl border border-white/20">
              {/* Corners */}
              <div className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-primary rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-primary rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-primary rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-primary rounded-br-xl" />

              {!isProcessing && <div className="scanner-line" />}
            </div>
          </div>

          <div className="flex-1 bg-black/70" />
        </div>

        <div className="flex-1 bg-black/70" />
      </div>

      {/* Captured Preview */}
      {extractedPlate && (
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-30 animate-in fade-in zoom-in duration-300">
          <div className="bg-black/70 backdrop-blur-xl rounded-2xl px-6 py-4 border border-primary/30 shadow-2xl min-w-[220px]">
            <p className="text-white/60 text-xs uppercase tracking-wider text-center">
              Detected Plate
            </p>

            <h2 className="text-white text-3xl font-bold text-center tracking-widest mt-1">
              {extractedPlate}
            </h2>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex flex-col items-center gap-4">
        <p className="text-white/80 text-sm">
          {isProcessing
            ? "Processing plate..."
            : "Point camera at vehicle plate"}
        </p>

        <button
          onClick={handleCaptureClick}
          disabled={capturing || isProcessing}
          className={`
            w-20 h-20 rounded-full bg-white
            flex items-center justify-center
            shadow-2xl
            transition-all duration-200
            ${capturing ? "scale-90" : "scale-100 hover:scale-105"}
          `}
        >
          {isProcessing ? (
            <FiLoader size={28} className="animate-spin text-primary" />
          ) : (
            <div
              className={`
                w-16 h-16 rounded-full border-4 border-primary
                transition-all duration-200
                ${capturing ? "scale-75" : ""}
              `}
            />
          )}
        </button>
      </div>
    </div>
  );
}
