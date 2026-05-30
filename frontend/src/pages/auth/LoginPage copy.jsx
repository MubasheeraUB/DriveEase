import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function DriveEaseLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleLogin = async (e) => {
    // console.log("Login button clicked");
    // console.log(formData);
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Loading Toast
      toast.loading("Authenticating...", {
        id: "login",
      });

      // ==============================
      // API CALL
      // ==============================

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      // console.log(response);console.log(data);

      const data = await response.json();

      // ==============================
      // SUCCESS
      // ==============================

      if (response.ok) {
        // Save Token
        localStorage.setItem("token", data.token);

        // Save User
        localStorage.setItem("user", JSON.stringify(data.user));

        // Success Toast
        toast.success("Welcome Back 👋", {
          id: "login",
        });

        // Redirect Delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1800);
      } else {
        toast.error(data.message || "Invalid Credentials", {
          id: "login",
        });
      }
    } catch (error) {
      toast.error("Server Error", {
        id: "login",
      });

      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden">
      {/* Left Branding Section */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative items-center justify-center overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#2563EB] opacity-20 blur-3xl rounded-full animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-10">
          {/* Animated Logo */}
          <div className="relative flex items-center justify-center mb-10 animate-fade-up">
            {/* Glow Effect */}
            <div className="absolute w-80 h-80 bg-[#2563EB] opacity-30 blur-3xl rounded-full animate-pulse"></div>

            {/* Rotating Ring */}
            <div className="absolute w-72 h-72 border-[10px] border-[#2563EB]/30 border-t-[#2563EB] rounded-full animate-spin-slow"></div>

            {/* Actual DriveEase Logo */}
            <div className="relative z-10 animate-float bg-white/10 backdrop-blur-xl p-6 rounded-[40px] border border-white/10">
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

          <h1 className="text-6xl font-extrabold tracking-tight mb-4 animate-fade-up">
            <span className="text-white">Drive</span>
            <span className="text-[#2563EB]">Ease</span>
          </h1>

          <p className="text-[#94A3B8] text-lg max-w-md leading-relaxed animate-fade-up delay-200">
            Smart Driving Institute Management Software for handling students, schedules, instructors, payments, and learner progress efficiently.
          </p>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB] opacity-10 rounded-full blur-3xl"></div>

        <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-3xl shadow-2xl p-10 relative z-10 animate-fade-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                D
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  Drive<span className="text-[#2563EB]">Ease</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-[#64748B] text-base">
              Login to manage your driving institute operations.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-14 px-4 rounded-2xl border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-14 px-4 rounded-2xl border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#64748B]">
                <input type="checkbox" className="rounded border-[#CBD5E1]" />
                Remember me
              </label>

              <button
                type="button"
                className="text-[#2563EB] font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-200 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[#64748B] text-sm">
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
