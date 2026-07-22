import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Plus,
  UserCheck,
  Users,
} from "lucide-react";

function RecruiterDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/jobs/recruiterjobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log("FETCH RECRUITER JOBS ERROR:", err);
      });
  }, []);

  

  const totalApplicants = jobs.reduce(
    (sum, job) => sum + Number(job.applicant_count || 0),
    0
  );

  

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
            to="/post-job"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            Post New Job
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full font-semibold">
                <BriefcaseBusiness size={18} />
                Hiring Partner Workspace
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mt-6">
                Manage hiring activities
              </h2>

              <p className="text-blue-100 mt-4 max-w-2xl">
                Post jobs, monitor applicant reach, and improve job visibility
                using hiring partner insights.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <StatCard
            icon={<BriefcaseBusiness />}
            title="Jobs Posted"
            value={jobs.length}
          />

          
          

         <StatCard
  icon={<Users />}
  title="Total Applicants"
  value={totalApplicants}
/>

          <StatCard
            icon={<UserCheck />}
            title="Hiring Partner Status"
            value="Active"
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 mt-8">
          <div className="space-y-6">
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#07183d]">
                    Posted Jobs
                  </h3>
                  <p className="text-slate-500 mt-1">
                    Jobs created by the hiring partner are displayed here.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {jobs.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-6 text-center text-slate-500">
                    No jobs posted yet.
                  </div>
                ) : (
                  jobs.map((job) => (
                    <JobPostCard key={job.job_id} job={job} />
                  ))
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-[#07183d]">
                Hiring Insights
              </h3>

              <div className="mt-5 space-y-4">
                
                <InsightRow label="Total Jobs Posted" value={jobs.length} />
<InsightRow label="Total Applicants" value={totalApplicants} />
<InsightRow
  label="Dashboard Status"
  value={jobs.length > 0 ? "Active" : "Waiting for jobs"}
/>
              </div>
            </div>

            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-[#07183d]">
                Hiring Partner Actions
              </h3>

              <div className="mt-5 space-y-4">
                <ActionItem text="Create new job opportunities" />
                <ActionItem text="Monitor applicant activity" />
                <ActionItem text="Track active job postings" />
                <ActionItem text="Improve job quality score" />
              </div>
            </div>

            <div className="bg-blue-600 rounded-[28px] p-6 text-white">
              <BriefcaseBusiness size={28} />

              <h3 className="text-xl font-bold mt-4">
                Job Quality Analysis
              </h3>

              <p className="text-blue-100 mt-2">
                TrustHire helps hiring partners monitor job completeness,
                applicant reach, and posting quality from one dashboard.
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

function JobPostCard({ job }) {
  const qualityScore =
    (job.company ? 25 : 0) +
    (job.description ? 25 : 0) +
    (job.required_skills ? 25 : 0) +
    (job.salary ? 25 : 0);

  return (
    <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-5">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h4 className="text-xl font-bold text-[#07183d]">{job.title}</h4>

          <p className="text-sm text-slate-500 mt-1">
            {job.company} • {job.location}
          </p>

          <p className="text-sm text-slate-600 mt-3">
            <span className="font-semibold text-slate-700">Salary:</span>{" "}
            {job.salary || "Not mentioned"}
          </p>

          <p className="text-sm text-slate-600 mt-2">
            <span className="font-semibold text-slate-700">Skills:</span>{" "}
            {job.required_skills || "Not mentioned"}
          </p>

          <p className="text-sm text-slate-600 mt-2 line-clamp-2">
            <span className="font-semibold text-slate-700">Description:</span>{" "}
            {job.description || "No description"}
          </p>

          <p className="text-sm text-slate-600 mt-2">
            <span className="font-semibold text-slate-700">Applicants:</span>{" "}
            {job.applicant_count || 0}
          </p>

          <p className="text-sm text-slate-600 mt-2">
            <span className="font-semibold text-slate-700">
              Job Quality Score:
            </span>{" "}
            {qualityScore}%
          </p>
        </div>

        <span className="bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm font-semibold">
          {job.status === "pending" ? "Active" : job.status}
        </span>
      </div>
    </div>
  );
}

function InsightRow({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-xs uppercase text-slate-400">{label}</p>
      <p className="font-bold text-[#07183d] mt-1">{value}</p>
    </div>
  );
}

function ActionItem({ text }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 flex items-center gap-3">
      <CheckCircle2 size={18} className="text-blue-600" />
      {text}
    </div>
  );
}

export default RecruiterDashboard;