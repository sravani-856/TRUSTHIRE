import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";
import { ChevronDown, ShieldCheck } from "lucide-react";
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/api/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        role,
      });

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-[30px] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-10 md:p-12 flex flex-col justify-center">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              TH
            </div>

            <h1 className="text-3xl font-bold text-[#07183d]">
              Trust<span className="text-blue-600">Hire</span>
            </h1>
          </Link>

          <h2 className="text-4xl font-bold text-[#07183d] mb-3">
            Create Account
          </h2>

          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            Join TrustHire and start your career journey.
          </p>

          <div className="mb-5">
            <label className="block font-semibold mb-2 text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-4 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-7">
            <label className="block font-semibold mb-2 text-slate-700">
              Role
            </label>

            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none w-full border border-slate-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
              >
                <option value="">Select your role</option>
                <option value="jobseeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>

              <ChevronDown
                size={19}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition"
          >
            Register
          </button>

          <p className="text-center mt-7 text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold">
              Login
            </Link>
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#0f2a6b] via-blue-700 to-blue-600 relative overflow-hidden p-10">
          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-16 -right-20"></div>
          <div className="absolute w-64 h-64 bg-white/10 rounded-full -bottom-20 -left-16"></div>

          <div className="relative z-10 w-full text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full font-medium text-blue-50 mb-5">
              <ShieldCheck size={18} />
              Transparent Recruitment
            </div>

            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/woman-working-on-laptop-illustration-download-in-svg-png-gif-file-formats--female-freelancer-pack-business-illustrations-2912015.png"
              alt="Create TrustHire account"
              className="w-[78%] max-w-[380px] mx-auto object-contain"
            />

            <h2 className="text-3xl font-bold mt-4">Join TrustHire</h2>

            <p className="text-blue-100 mt-3 leading-relaxed max-w-sm mx-auto">
              Create your profile and discover trusted job opportunities.
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

export default Register;