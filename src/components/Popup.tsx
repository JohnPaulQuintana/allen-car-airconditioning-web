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

export default function Popup({
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
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-slide-in">
      <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/20 backdrop-blur-xl shadow-2xl">
        <div className="flex items-start gap-4 p-5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              success ? "bg-primary/10" : "bg-red-500/10"
            }`}
          >
            {success ? (
              <FiCheckCircle size={24} className="text-white" />
            ) : (
              <FiXCircle size={24} className="text-red-500" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white">{title}</h3>

            {message && (
              <p className="mt-1 text-sm leading-6 text-white/80">{message}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-white/80 transition hover:bg-black/5 hover:text-slate-800"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="h-1 bg-slate-200/50">
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
