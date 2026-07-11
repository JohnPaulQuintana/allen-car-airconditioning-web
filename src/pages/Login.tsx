import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiUsers,
  FiClipboard,
  FiSearch,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo-transparent.png";
import mascot from "../assets/images/mascot-trans.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, success } = useAuth();

  const mascotGreetings = [
    "Welcome to your workshop command center.",
    "Streamline your service operations with ease.",
    "Access customer records and service history instantly.",
    "Keep your workshop running at peak efficiency.",
    "Your complete vehicle management solution awaits.",
    "Manage technicians, vehicles, and records seamlessly.",
    "Empower your team with real-time data access.",
    "Optimize workflow and enhance customer satisfaction.",
    "Your all-in-one workshop management platform.",
    "Transform the way you manage vehicle services.",
    "Everything you need for professional fleet management.",
    "Drive efficiency with intelligent workshop tools.",
    "Service records, scheduling, and management simplified.",
    "Your workshop's digital command center.",
    "Making vehicle service management effortless.",
    "Professional tools for professional results.",
    "Smart management for modern workshops.",
    "From service records to customer satisfaction.",
    "Elevate your workshop's performance today.",
    "The complete toolkit for workshop excellence.",
  ];

  // Typewriter effect
  useEffect(() => {
    const currentGreeting = mascotGreetings[currentGreetingIndex];
    let charIndex = 0;
    let timeoutId = 0;

    const typeCharacter = () => {
      if (charIndex <= currentGreeting.length) {
        setDisplayText(currentGreeting.substring(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(typeCharacter, 30); // Typing speed
      } else {
        setIsTyping(false);
        // Wait 3 seconds before changing to next greeting
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          setCurrentGreetingIndex(
            (prev) => (prev + 1) % mascotGreetings.length,
          );
        }, 6000);
      }
    };

    // Start typing
    if (isTyping) {
      setDisplayText("");
      charIndex = 0;
      timeoutId = setTimeout(typeCharacter, 500); // Initial delay before typing starts
    }

    return () => clearTimeout(timeoutId);
  }, [currentGreetingIndex]);

  // Mobile Onboarding Screen
  const OnboardingScreen = () => (
    <div className="flex flex-col justify-center items-center text-center p-12 relative w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[#001845]/50 to-transparent" />
      <div className="relative z-10">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
            <img
              src={logo}
              alt="Allen Car Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="text-left">
            <h1 className="text-white text-3xl font-bold tracking-tight">
              Allen Car
            </h1>
            <h2 className="text-white/80 text-2xl font-medium">
              Air Conditioning
            </h2>
          </div>
        </div>

        <div className="w-24 h-px bg-white/20 mx-auto my-8" />

        {/* Mascot Section */}
        <div className="relative mt-24">
          <div className="absolute inset-0 bg-gradient-to-t from-[#001845] via-transparent to-transparent" />
          {/* Speech Bubble */}
          <div className="absolute -top-20 left-32 w-64 rounded-2xl bg-white text-[#001845] p-4 shadow-2xl min-h-[80px] flex items-center">
            <p className="text-sm font-medium leading-relaxed">
              {displayText}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
            {/* Bubble Tail */}
            <div className="absolute left-6 -bottom-2 w-4 h-4 bg-white rotate-45" />
          </div>
          <img
            src={mascot}
            alt="Mascot"
            className="w-72 h-72 object-contain mx-auto drop-shadow-2xl"
          />
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {/* Get Started Button */}
          <button
            onClick={() => setShowLogin(true)}
            className="w-full max-w-sm h-14 rounded-2xl bg-[#001845] hover:bg-[#002766] transition text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#001845]/25"
          >
            Get Started
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-white/60 mt-6 max-w-md text-sm leading-relaxed">
          Vehicle service records, technician management, and customer history
          in one platform.
        </p>
      </div>
    </div>
  );

  // Login Form Component (shared between mobile and desktop)
  const LoginForm = () => (
    <div className="flex flex-col justify-center w-full p-12 bg-white">
      {/* Mobile Back Button */}
      <button
        onClick={() => setShowLogin(false)}
        className="lg:hidden text-[#001845] hover:text-[#002766] transition mb-6 flex items-center gap-2 text-sm font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="mb-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#001845]/5 text-[#001845] text-sm font-medium">
          Welcome Back
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold text-[#001845] mt-4">
          Sign In
        </h2>

        <p className="text-slate-500 mt-2">
          Access your workshop management dashboard.
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-100 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
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
            Email Address
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
              placeholder="Enter your password"
              className="w-full h-14 px-5 pr-14 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#001845] focus:ring-4 focus:ring-[#001845]/10 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
            >
              {showPassword ? (
                <FiEyeOff className="w-5 h-5" />
              ) : (
                <FiEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-2xl bg-[#001845] hover:bg-[#002766] transition text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#001845]/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Logging in...
            </div>
          ) : (
            <>
              Sign In
              <FiArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-sm text-slate-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={() => navigate("/scan-invitation")}
          className="w-full h-14 rounded-2xl border-2 border-slate-200 hover:border-[#001845] hover:bg-[#001845]/5 transition flex items-center justify-center gap-3 font-semibold text-[#001845]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-[#001845]"
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

      <p className="text-center text-slate-400 text-sm mt-8 lg:block hidden">
        Allen Car Air Conditioning © 2026
      </p>
    </div>
  );

  return (
    <div className="w-full overflow-hidden min-h-screen bg-[#001845] relative flex items-center justify-center py-8 px-4">
      {/* Background Effects */}
      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-[-250px] right-[-150px] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Card */}
      <div className="w-full max-w-6xl rounded-md overflow-hidden backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl grid lg:grid-cols-2">
        {/* Desktop Branding Side */}
        <div className="hidden lg:flex flex-col justify-center items-center text-center p-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#001845]/50 to-transparent" />
          <div className="relative z-10">
            {/* Logo Section */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
                <img
                  src={logo}
                  alt="Allen Car Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className="text-white text-4xl font-bold tracking-tight">
                  Allen Car
                </h1>
                <h2 className="text-white/80 text-4xl font-medium">
                  Air Conditioning
                </h2>
              </div>
            </div>

            <div className="w-24 h-px bg-white/20 mx-auto my-8" />

            {/* Mascot Section */}
            <div className="relative mt-24">
              <div className="absolute inset-0 bg-gradient-to-t from-[#001845] via-transparent to-transparent" />
              {/* Speech Bubble */}
              <div className="absolute -top-20 left-44 w-64 rounded-2xl bg-white text-[#001845] p-4 shadow-2xl min-h-[80px] flex items-center">
                <p className="text-sm font-medium leading-relaxed">
                  {displayText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
                {/* Bubble Tail */}
                <div className="absolute left-6 -bottom-2 w-4 h-4 bg-white rotate-45" />
              </div>
              <img
                src={mascot}
                alt="Mascot"
                className="w-72 h-72 object-contain mx-auto drop-shadow-2xl"
              />
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm">
                <FiSearch className="w-4 h-4" />
                <span>Quick Search</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm">
                <FiUsers className="w-4 h-4" />
                <span>Technicians</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm">
                <FiClipboard className="w-4 h-4" />
                <span>Service Records</span>
              </div>
            </div>

            <p className="text-white/60 mt-6 max-w-md text-sm leading-relaxed">
              Vehicle service records, technician management, and customer
              history in one platform.
            </p>
          </div>
        </div>

        {/* Right Side - Login/Onboarding */}
        <div className="sm:p-8 lg:p-12 flex flex-col justify-center bg-transparent lg:bg-white">
          <div className="w-full">
            {/* Mobile: Show Onboarding or Login */}
            <div className="lg:hidden">
              {!showLogin ? <OnboardingScreen /> : <LoginForm />}
            </div>

            {/* Desktop: Always show Login */}
            <div className="hidden lg:block">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
