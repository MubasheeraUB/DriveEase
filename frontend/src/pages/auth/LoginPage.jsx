import { useState } from "react";
import {
  FiUsers,
  FiCalendar,
  FiBarChart2,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  // ================= STATE =================
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      // fake login delay
      setTimeout(() => {

        setLoading(false);

        // redirect to dashboard
        navigate("/dashboard");

      }, 1000);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // ================= REUSABLE STYLES =================
  const inputBase =
    "w-full h-14 bg-[#0F172A] border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none";

  const iconBase = "absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-xl";

  return (
    <div className="min-h-screen bg-[#020817] flex overflow-hidden">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative items-center justify-center overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#2563EB] opacity-20 blur-3xl rounded-full animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-9">
          {/* Animated Logo */}
          <div className="relative flex items-center justify-center mb-10 animate-fade-up">
            {/* Glow Effect */}
            <div className="absolute w-80 h-80 bg-[#2563EB] opacity-30 blur-3xl rounded-full animate-pulse"></div>

            {/* Rotating Ring */}
            <div className="absolute w-72 h-72 border-[10px] border-[#2563EB]/30 border-t-[#2563EB] rounded-full animate-spin-slow"></div>

            {/* Actual DriveEase Logo */}
            <div className="relative z-10 animate-float bg-white/10 backdrop-blur-xl p-4 rounded-[28px] border border-white/10">
              <img
                src="/logo.png"
                alt="DriveEase Logo"
                className="w-[360px] drop-shadow-[0_0_35px_rgba(37,99,235,0.55)]"
              /></div>

            {/* Motion Lines */}
            <div className="absolute left-[-90px] top-24 space-y-3">
              <div className="w-16 h-2 bg-[#2563EB] rounded-full animate-pulse"></div>
              <div className="w-10 h-2 bg-[#2563EB] rounded-full animate-pulse delay-150"></div>
              <div className="w-6 h-2 bg-[#2563EB] rounded-full animate-pulse delay-300"></div>
            </div>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight mb-4 animate-fade-up">
            <span className="text-white">Drive</span>
            <span className="text-[#2563EB]">Ease</span>
          </h1>

          <p className="text-[#94A3B8] text-lg max-w-md leading-relaxed animate-fade-up delay-200">
            Smart Driving Institute Management Software for handling students, schedules, instructors, payments, and learner progress efficiently.
          </p>
          <div className="flex justify-center gap-8 mt-12">

            <Feature icon={<FiUsers size={28} />} label="Students" />
            <Feature icon={<FiCalendar size={28} />} label="Schedule" />
            <Feature icon={<FiBarChart2 size={28} />} label="Progress" />

          </div>

        </div>
      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="flex-1 flex items-center justify-center p-2 md:p-4 relative">

        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

        <div className="w-full max-w-lg rounded-[32px] bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(37,99,235,.15)] p-4 md:p-6 relative z-10">

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-3">
              Welcome Back 👋
            </h2>

            <p className="text-slate-400">
              Login to manage your driving institute operations.
            </p>
          </div>

          {/* ================= FORM ================= */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              icon={<FiMail className={iconBase} />}
            />

            {/* PASSWORD */}
            <div>
              <label className="text-slate-300 text-sm block mb-2">
                Password
              </label>

              <div className="relative">
                <FiLock className={iconBase} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`${inputBase} pl-14 pr-14`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="flex justify-between items-center text-sm">
              <label className="text-slate-400 flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button" className="text-blue-400 hover:text-blue-300">
                Forgot Password?
              </button>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all shadow-[0_0_30px_rgba(37,99,235,.4)]"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* DIVIDER */}
          <Divider />

          {/* SOCIAL LOGIN */}
          <div className="grid grid-cols-3 gap-4">
            <SocialBtn icon={<FcGoogle size={24} />} />
            <SocialBtn icon={<FaApple size={22} />} />
            <SocialBtn icon={<FaFacebookF size={22} />} />
          </div>

          {/* FOOTER */}
          <div className="text-center mt-8">
            <span className="text-slate-500">Don't have an account?</span>
            <button className="ml-2 text-blue-400 font-semibold">
              Sign Up
            </button>
          </div>

          <div className="text-center mt-8 text-slate-600 text-sm">
            © 2026 DriveEase — Smart Driving Institute Management
          </div>
        </div>
      </div>
      <style>{`
        .clip-road {
          clip-path: polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%);
        }

        @keyframes spinSlow {
          from {
            transform: rotate(180deg);
          }
          to {
            transform: rotate(540deg);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2.5s ease-in-out infinite;
        }

        .animate-fade-up {
          animation: fadeUp 1s ease forwards;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Feature({ icon, label }) {
  return (
    <div className="text-center">
      <div className="w-16 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-blue-400 mx-auto">
        {icon}
      </div>
      <p className="text-white mt-3">{label}</p>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-slate-300 text-sm block mb-2">{label}</label>
      <div className="relative">
        {icon}
        <input
          {...props}
          className="w-full h-14 bg-[#0F172A] border border-slate-700 rounded-2xl pl-14 pr-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none"
        />
      </div>
    </div>
  );
}

function SocialBtn({ icon }) {
  return (
    <button className="h-14 rounded-xl border border-slate-700 bg-[#0F172A] flex justify-center items-center">
      {icon}
    </button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-slate-700" />
      <span className="text-slate-500 text-sm">or continue with</span>
      <div className="flex-1 h-px bg-slate-700" />
    </div>
  );
}