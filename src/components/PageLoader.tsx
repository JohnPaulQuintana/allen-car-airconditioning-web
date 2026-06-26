import logo from "../assets/images/logo-transparent.png";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#001845] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Center Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        <img
          src={logo}
          alt="Allen Car Air Conditioning"
          className="w-40 h-40 object-contain animate-pulse"
        />

        <h1 className="text-white text-4xl font-bold mt-6">
          Allen Car Air Conditioning
        </h1>

        <p className="text-white/60 mt-2 text-lg">
          Loading dashboard...
        </p>

        {/* Animated Dots */}
        <div className="flex gap-3 mt-8">
          <span className="w-3 h-3 rounded-full bg-white animate-bounce" />

          <span
            className="w-3 h-3 rounded-full bg-white animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />

          <span
            className="w-3 h-3 rounded-full bg-white animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* Optional Progress Bar */}
        {/* <div className="w-72 h-1.5 bg-white/10 rounded-full mt-8 overflow-hidden">
          <div className="h-full w-1/2 bg-white rounded-full animate-pulse" />
        </div> */}
      </div>
    </div>
  );
}