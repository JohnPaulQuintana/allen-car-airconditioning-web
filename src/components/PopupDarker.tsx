import { useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

type PopupType = "success" | "error";

interface PopupProps {
  open: boolean;
  type: PopupType;
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
}

export default function PopupDarker({
  open,
  type,
  title,
  message,
  duration = 3000,
  onClose,
}: PopupProps) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(onClose, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const success = type === "success";

  return (
    <div className="fixed top-5 left-4 right-4 sm:left-auto sm:right-6 sm:w-[400px] z-[9999] animate-slide-in">
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/55 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start gap-4 p-5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
              success
                ? "border-primary/30 bg-primary/15"
                : "border-red-500/30 bg-red-500/15"
            }`}
          >
            {success ? (
              <FiCheckCircle className="text-primary" size={24} />
            ) : (
              <FiXCircle className="text-red-400" size={24} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white">
              {title}
            </h3>

            {message && (
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {message}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="h-1 bg-slate-800">
          <div
            className={`h-full ${
              success ? "bg-primary" : "bg-red-500"
            } animate-progress`}
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}