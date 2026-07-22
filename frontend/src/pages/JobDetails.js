import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api";

import {
  ArrowLeft,
  BadgeCheck,
 
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
 
  GraduationCap,
  IndianRupee,
  MapPin,
  Upload,
  Users,
} from "lucide-react";

function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api
      .get(`/api/jobs/${id}`)
      .then((res) => {
        const data = res.data;
        const company = data.company || "Not specified";

        setJob({
          title: data.title || "Untitled Role",
          company,
          logo: company.substring(0, 3).toUpperCase(),
          location: data.location || "Not specified",
          salary: data.salary || "Not disclosed",
          experience: "0 - 2 Years",
          type: "Full Time",
          workMode: "Remote",
          posted: "Today",
          deadline: "30 Jun 2026",
          openings: "Not specified",
              applicants: "Visible after recruiter review",
              recruiter: "Verified Recruiter",
              recruiterRole: "TrustHire Recruiter",
              responseTime: "Response time not specified",
             
              requiredSkills: data.required_skills
                ? data.required_skills.split(",").map((s) => s.trim())
                : [],
              description: data.description || "No description provided.",
          responsibilities: [
            data.description,
            "Work with backend APIs and database-driven workflows.",
            "Test APIs and solve backend integration issues.",
          ],
        });
      })
      .catch((err) => console.log("FETCH JOB DETAILS ERROR:", err));
  }, [id]);

  if (!job) {
    return <div className="p-10 text-center">Loading job details...</div>;
  }

  const handleApply = async () => {
    try {
      const res = await api.post("/api/applications/apply", {
        job_id: id,
      });

      alert(res.data.message);
      navigate("/applications");
    } catch (error) {
      console.log("APPLY ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Application failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-slate-900">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur md:px-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            TH
          </div>
          <h1 className="text-2xl font-bold text-[#07183d]">
            Trust<span className="text-blue-600">Hire</span>
          </h1>
        </Link>

        <div className="hidden items-center gap-8 font-medium text-slate-600 lg:flex">
          <Link to="/">Home</Link>
          <Link to="/jobs" className="text-blue-600">
            Find Jobs
          </Link>
          <Link to="/applications" className="hover:text-blue-600">
            Applications
          </Link>
          <Link to="/resume-upload" className="hover:text-blue-600">
            Resume
          </Link>
      
        </div>

        <Link
          to="/applications"
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          My Applications
        </Link>
      </nav>

      <main className="px-6 py-7 md:px-12">
        <Link
          to="/jobs"
          className="mb-6 inline-flex items-center gap-2 font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </Link>

        <section className="rounded-[32px] bg-[#081b44] p-7 text-white shadow-lg md:p-9">
          <div className="flex flex-col justify-between gap-8 xl:flex-row">
            <div className="flex gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-xl font-bold">
                {job.logo}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-bold">{job.title}</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                    <BadgeCheck size={16} />
                    Verified Job
                  </span>
                </div>

                <p className="mt-3 flex items-center gap-2 text-blue-100">
                  <BriefcaseBusiness size={17} />
                  {job.company}
                  <span>•</span>
                  <MapPin size={16} />
                  {job.location}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <DarkPill text={job.type} />
                  <DarkPill text={job.workMode} />
                  <DarkPill text={`Posted ${job.posted}`} />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              

              <button
                onClick={handleApply}
                className="rounded-xl bg-white px-10 py-4 font-bold text-blue-700"
              >
                Apply Now
              </button>
            </div>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-5">
            <TopMetric
              icon={<IndianRupee size={18} />}
              label="Salary"
              value={job.salary}
            />
            <TopMetric
              icon={<GraduationCap size={18} />}
              label="Experience"
              value={job.experience}
            />
            <TopMetric
              icon={<Users size={18} />}
              label="Openings"
              value={job.openings}
            />
            <TopMetric
              icon={<Users size={18} />}
              label="Applicants"
              value={job.applicants}
            />
            <TopMetric
              icon={<CalendarDays size={18} />}
              label="Apply Before"
              value={job.deadline}
            />
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="space-y-6">
            <ContentCard title="About the Role">
              <p className="leading-relaxed text-slate-600">
                {job.description}
              </p>
            </ContentCard>

            <ContentCard title="Responsibilities">
              <div className="space-y-4">
                {job.responsibilities.map((item) => (
                  <ListItem key={item} text={item} />
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Skills Required">
              <div className="flex flex-wrap gap-3">
                {job.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

             

             
            </ContentCard>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#07183d]">
                Recruiter Details
              </h3>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">
                <p className="text-xs uppercase text-slate-400">Recruiter</p>
                <p className="mt-2 text-lg font-bold text-[#07183d]">
                  {job.recruiter}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {job.recruiterRole} • {job.company}
                </p>

                <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold text-blue-700">
                  <BadgeCheck size={15} />
                  Verified Recruiter
                </span>
              </div>

              <p className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                <Clock3 size={17} className="text-blue-600" />
                {job.responseTime}
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#07183d]">
                Before You Apply
              </h3>

              <p className="mt-3 text-slate-500">
                Upload your resume before applying and track your application
                after submission.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <BeforeApplyCard
                  label="Resume"
                  value="Use uploaded resume"
                  status="Required"
                />
                <BeforeApplyCard
                  label="Application Tracking"
                  value="Enabled after apply"
                  status="Active"
                />
              </div>

              <Link
                to="/resume-upload"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-blue-200 px-5 py-3 font-semibold text-blue-600"
              >
                <Upload size={18} />
                Upload / Change Resume
              </Link>
            </div>

            

            
          </aside>
        </div>

        
      </main>
    </div>
  );
}

function DarkPill({ text }) {
  return (
    <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50">
      {text}
    </span>
  );
}

function TopMetric({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <div className="text-blue-100">{icon}</div>
      <p className="mt-3 text-xs uppercase text-blue-200">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function BeforeApplyCard({ label, value, status }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-slate-400">{label}</p>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          {status}
        </span>
      </div>
      <p className="mt-3 font-semibold text-slate-700">{value}</p>
    </div>
  );
}

function ContentCard({ title, children }) {
  return (
    <div className="rounded-[28px] border border-slate-100 bg-white p-7 shadow-sm">
      <h3 className="mb-5 text-2xl font-bold text-[#07183d]">{title}</h3>
      {children}
    </div>
  );
}

function ListItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-blue-600" size={18} />
      <p className="text-slate-600">{text}</p>
    </div>
  );
}



export default JobDetails;