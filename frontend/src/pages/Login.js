import React from "react";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "./api";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedRole = searchParams.get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await api.post("/api/auth/login", {
      email: email.trim(),
      password: password.trim(),
    });

    if (res.data.requiresOtp) {
      alert("OTP sent to your email");

      navigate("/otp-verify", {
        state: {
          email: email.trim(),
          selectedRole,
        },
      });
    } else if (res.data.token && res.data.user) {
      // Backend skipped OTP and logged the user in directly.
      const { token, user } = res.data;

      if (selectedRole && selectedRole !== user.role) {
        alert(`Please login with a ${selectedRole} account`);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("name", user.name);

      if (user.role === "jobseeker") {
        navigate("/jobs");
      } else if (user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      }
    } else {
      // Unexpected response shape — don't fail silently.
      alert("Login failed. Please try again.");
    }
  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen bg-[#f6f8fc] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-[30px] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-10 md:p-12 flex flex-col justify-center">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              TH
            </div>

            <h1 className="text-3xl font-bold text-[#07183d]">
              Trust<span className="text-blue-600">Hire</span>
            </h1>
          </Link>

          <h2 className="text-4xl font-bold text-[#07183d] mb-3">
            Welcome Back!
          </h2>

          <p className="text-slate-500 text-lg mb-9">
            Login to continue your career journey.
          </p>

          <div className="mb-5">
            <label className="block font-semibold mb-2 text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2 text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-4 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8 text-sm text-slate-500">
            Secure role-based access with email OTP verification for job
            seekers, recruiters, and administrators.
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition"
          >
            Login
          </button>

          <p className="text-center mt-7 text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-bold">
              Register
            </Link>
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#0f2a6b] via-blue-700 to-blue-600 relative overflow-hidden p-10">
          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-16 -right-20"></div>
          <div className="absolute w-64 h-64 bg-white/10 rounded-full -bottom-20 -left-16"></div>

          <div className="relative z-10 w-full text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full font-medium text-blue-50 mb-5">
              <ShieldCheck size={18} />
              Secure Login
            </div>

            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--secure-access-account-password-business-pack-illustrations-2912013.png"
              alt="TrustHire secure login"
              className="w-[85%] max-w-[430px] mx-auto object-contain z-10"
            />

            <h2 className="text-3xl font-bold mt-4">
              Welcome Back to TrustHire
            </h2>

            <p className="text-blue-100 mt-3 leading-relaxed max-w-sm mx-auto">
              Login securely with email OTP verification and continue exploring
              trusted career opportunities.
            </p>

            <Link
              to="/"
              className="inline-block text-blue-100 hover:text-white font-semibold mt-7"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;