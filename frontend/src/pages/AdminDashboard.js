import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileWarning,
  ShieldCheck,
  Users,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
  totalUsers: 0,
  totalRecruiters: 0,
  totalJobSeekers: 0,
  totalJobs: 0,
  totalApplications: 0,
  totalResumes: 0,
});

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
  api
    .get("/api/admin/stats")
    .then((res) => setStats(res.data))
    .catch((err) => console.log("FETCH ADMIN DATA ERROR:", err));
}, []);

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-slate-900">
      <nav className="bg-white border-b border-slate-100 px-8 md:px-14 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            TH
          </div>

          <h1 className="text-2xl font-bold text-[#07183d]">
            Trust<span className="text-blue-600">Hire</span>
          </h1>
        </Link>

        <div className="flex gap-3">
          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
          >
            View Platform
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-5 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="px-6 md:px-14 py-8">
        <section className="rounded-[34px] bg-[#081b44] p-8 md:p-10 text-white shadow-xl">
          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full font-semibold">
            <ShieldCheck size={18} />
            Admin Control Center
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mt-6">
            Monitor recruitment portal activity
          </h2>

          <p className="text-blue-100 mt-4 max-w-2xl">
View platform activity, monitor users, jobs, applications, and resume uploads from one dashboard.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">
          <StatCard icon={<BriefcaseBusiness />} title="Total Jobs" value={stats.totalJobs} />
<StatCard icon={<Users />} title="Total Users" value={stats.totalUsers} />
<StatCard icon={<BadgeCheck />} title="Recruiters" value={stats.totalRecruiters} />
<StatCard icon={<FileWarning />} title="Applications" value={stats.totalApplications} />

        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-6 mt-8">
          

            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-[#07183d]">
                Current Platform Data
              </h3>

              <div className="mt-6 space-y-4">
  <InfoRow label="Jobs available in portal" value={stats.totalJobs} />
  <InfoRow label="Uploaded resumes" value={stats.totalResumes} />
  <InfoRow label="OCR Resume Analysis" value="Active" />
  <InfoRow label="ATS Scoring Engine" value="Active" />
  <InfoRow label="Recommendation Engine" value="Active" />
  <InfoRow label="Application Tracking Module" value="Active" />
</div>

              </div>
            
          

          <aside className="space-y-6">
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-[#07183d]">
                Admin Quick Actions
              </h3>

              <div className="mt-5 space-y-4">
                <QuickAction text="Monitor posted jobs" />
                <QuickAction text="Review user activity" />
                <QuickAction text="Monitor recruiter activity" />
                <QuickAction text="Monitor application activity" />
              </div>
            </div>

            <div className="bg-blue-600 rounded-[28px] p-6 text-white">
              <ShieldCheck size={28} />

              <h3 className="text-xl font-bold mt-4">
                Admin Note
              </h3>

              <p className="text-blue-100 mt-2">
                Admin dashboard provides real-time platform overview including users, recruiters, jobs, applications, and uploaded resumes.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100">
      <div className="text-blue-600">{icon}</div>
      <p className="text-slate-500 mt-3">{title}</p>
      <h3 className="text-3xl font-bold text-[#07183d] mt-1">{value}</h3>
    </div>
  );
}



function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-[#f8fafc] rounded-2xl p-4">
      <p className="text-slate-600">{label}</p>
      <p className="font-bold text-[#07183d]">{value}</p>
    </div>
  );
}

function QuickAction({ text }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 flex items-center gap-3">
      <CheckCircle2 size={18} className="text-blue-600" />
      {text}
    </div>
  );
}

export default AdminDashboard;