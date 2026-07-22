import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
 
  Clock3,
  FileText,
  Sparkles,
  Target,
} from "lucide-react";

function ApplicationTracking() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/applications/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const formatted = res.data.map((item) => ({
          id: item.application_id,
          jobId: item.job_id,
          role: item.title,
          company: item.company,
          status:
            item.status === "applied" || item.application_status === "applied"
              ? "Applied"
              : item.status || item.application_status,
          appliedDate: new Date(item.applied_at).toLocaleDateString(),
          match: `${item.job_match_score ?? 0}%`,
          ats: `${item.ats_score ?? 0}%`,
          trust: `${item.job_trust_score ?? 0}%`,
          risk: `${item.rejection_risk ?? 0}%`,
        }));

        setApplications(formatted);
      })
      .catch((err) => {
        console.log("FETCH APPLICATIONS ERROR:", err);
      });
  }, []);

  const totalApplications = applications.length;
  const appliedCount = applications.filter((a) => a.status === "Applied").length;

  const averageSuccess =
    applications.length > 0
      ? Math.round(
          applications.reduce((sum, app) => {
            const match = Number(app.match.replace("%", ""));
            const ats = Number(app.ats.replace("%", ""));
            const trust = Number(app.trust.replace("%", ""));
            const risk = Number(app.risk.replace("%", ""));

            return sum + Math.round((match + ats + trust + (100 - risk)) / 4);
          }, 0) / applications.length
        )
      : 0;

  const handleWithdraw = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:5000/api/applications/withdraw/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(applications.filter((app) => app.id !== id));
      alert(res.data.message);
    } catch (error) {
      console.log("WITHDRAW ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Withdraw failed");
    }
  };

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

        <Link
          to="/jobs"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
        >
          Find Jobs
        </Link>
      </nav>

      <main className="px-6 md:px-14 py-8">
        <section className="relative overflow-hidden bg-gradient-to-r from-[#07183d] to-blue-700 rounded-[32px] text-white p-8">
          <div className="absolute -right-16 -top-20 w-72 h-72 bg-white/10 rounded-full"></div>

          <Link
            to="/jobs"
            className="relative z-10 inline-flex items-center gap-2 text-blue-100 mb-4"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full font-semibold mb-5">
              <Sparkles size={17} />
              Smart Application Monitoring
            </div>

            <h2 className="text-4xl font-bold">
              Application Tracking Dashboard
            </h2>

            <p className="text-blue-100 mt-3">
              Track submitted applications, match scores, rejection risk, and
              application status.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <StatCard
            icon={<FileText />}
            title="Applications"
            value={totalApplications}
          />

          <StatCard
            icon={<Clock3 />}
            title="Applied"
            value={appliedCount}
          />
        </section>

        <section className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 mt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-700 bg-blue-50 px-4 py-2 rounded-full font-semibold">
                <Target size={18} />
                Smart Prediction
              </div>

              <h3 className="text-2xl font-bold text-[#07183d] mt-4">
                Application Success Probability
              </h3>

              <p className="text-slate-500 mt-2">
                Prediction based on ATS score, match score, rejection risk and
                job trust score.
              </p>
            </div>

            <div className="text-left md:text-right">
              <h2 className="text-5xl font-bold text-green-600">
                {averageSuccess}%
              </h2>

              <p className="text-green-600 font-semibold mt-1">
                {averageSuccess >= 75
                  ? "High Selection Chance"
                  : averageSuccess >= 50
                  ? "Medium Selection Chance"
                  : "Low Selection Chance"}
              </p>
            </div>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full mt-6">
            <div
              className="h-3 bg-green-500 rounded-full"
              style={{ width: `${averageSuccess}%` }}
            ></div>
          </div>
        </section>
<section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
  <InsightCard
    title="Next Step"
    text="Review your application status regularly and improve missing skills from the Jobs page."
  />

  <InsightCard
    title="Resume Tip"
    text="Keep your resume updated with project keywords, technical skills, and certifications."
  />

  <InsightCard
    title="Application Safety"
    text="TrustHire keeps your applications linked to your uploaded resume and job match score."
  />
</section>
        <section className="mt-8">
          <div className="space-y-5">
            {applications.length === 0 ? (
              <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 text-slate-500">
                No applications found.
              </div>
            ) : (
              applications.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#07183d]">
                        {job.role}
                      </h3>

                      <p className="text-slate-500 mt-1">{job.company}</p>
                    </div>

                    <StatusBadge status={job.status} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                    <InfoCard label="Applied On" value={job.appliedDate} />
                    <InfoCard label="Match Score" value={job.match} />
                    <InfoCard label="Trust Score" value={job.trust} />
                    <InfoCard label="ATS Score" value={job.ats} />
                    <InfoCard label="Rejection Risk" value={job.risk} />
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/job-details/${job.jobId}`}
                      className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleWithdraw(job.id)}
                      className="border border-red-200 text-red-600 px-5 py-3 rounded-xl font-semibold"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
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

function InfoCard({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="font-semibold text-[#07183d] mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Applied: "bg-blue-50 text-blue-700",
    "Under Review": "bg-orange-50 text-orange-700",
    Shortlisted: "bg-green-50 text-green-700",
    selected: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold ${
        colors[status] || "bg-blue-50 text-blue-700"
      }`}
    >
      {status}
    </span>
  );
}
function InsightCard({ title, text }) {
  return (
    <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-[#07183d]">{title}</h3>
      <p className="text-sm text-slate-500 mt-3 leading-relaxed">{text}</p>
    </div>
  );
}
export default ApplicationTracking;