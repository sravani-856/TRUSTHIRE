import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "./api";
import { ShieldCheck } from "lucide-react";

function OTPVerify() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const selectedRole = location.state?.selectedRole;

  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      const res = await api.post("/api/auth/verify-otp", {
        email,
        otp: otp.trim(),
      });

      const user = res.data.user;
      const role = user.role;

      if (selectedRole && selectedRole !== role) {
        alert(`Please login with a ${selectedRole} account`);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("name", user.name);

      alert("Login successful");

      if (role === "jobseeker") {
        navigate("/jobs");
      } else if (role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.log("OTP VERIFY ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f8fc]">
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
          <p className="text-slate-600">Please login first.</p>
          <Link to="/login" className="text-blue-600 font-bold mt-4 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[30px] shadow-xl p-8">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldCheck size={32} />
        </div>

        <h2 className="text-3xl font-bold text-[#07183d] text-center mt-6">
          Verify OTP
        </h2>

        <p className="text-slate-500 text-center mt-3">
          Enter the 6-digit OTP sent to
        </p>

        <p className="text-blue-600 font-semibold text-center mt-1">{email}</p>

        <input
          type="text"
          maxLength="6"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-4 mt-7 text-center text-xl tracking-widest outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleVerifyOtp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold mt-6"
        >
          Verify OTP
        </button>

        <Link
          to="/login"
          className="block text-center text-blue-600 font-semibold mt-5"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default OTPVerify;