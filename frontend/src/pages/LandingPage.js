import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  FileText,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen bg-[#f7f9fd] text-[#0f172a]">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 px-8 md:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            TH
          </div>

          <h1 className="text-2xl font-bold text-[#07183d]">
            Trust<span className="text-blue-600">Hire</span>
          </h1>
        </Link>

        <div className="hidden lg:flex items-center gap-9 text-slate-600 font-medium">
          <Link to="/" className="text-blue-600">
            Home
          </Link>

          <Link to="/login?role=jobseeker" className="hover:text-blue-600 transition">
            Jobs
          </Link>

          <a
            href="#company"
            onClick={() => setActiveSection("company")}
            className={`cursor-pointer transition ${
              activeSection === "company"
                ? "text-blue-600 font-bold"
                : "hover:text-blue-600"
            }`}
          >
            Companies
          </a>

          <a
            href="#about"
            onClick={() => setActiveSection("about")}
            className={`cursor-pointer transition ${
              activeSection === "about"
                ? "text-blue-600 font-bold"
                : "hover:text-blue-600"
            }`}
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() => setActiveSection("contact")}
            className={`cursor-pointer transition ${
              activeSection === "contact"
                ? "text-blue-600 font-bold"
                : "hover:text-blue-600"
            }`}
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-3 text-blue-600 font-semibold hover:bg-blue-50 rounded-xl transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 md:px-16 pt-14 pb-10 grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-14 items-center">
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] bg-blue-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-indigo-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-cyan-400 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-5 py-2 font-semibold">
            <ShieldCheck size={18} />
            Recruitment with transparency
          </div>

          <h2 className="text-5xl md:text-[64px] font-extrabold leading-[1.12] text-[#07183d] mt-7">
            Find trusted opportunities.
            <br />
            Match your
            <span className="text-blue-600"> skills</span>
            <br />
            with the right career.
          </h2>

          <p className="text-slate-500 text-lg leading-relaxed mt-6 max-w-xl">
            Search job opportunities, manage your resume, track applications,
            and view recruiter details before applying.
          </p>

          <div className="mt-10 bg-white shadow-xl border border-slate-100 rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl">
            <div className="flex items-center gap-3 px-4 flex-1 text-slate-400">
              <Search size={20} />
              <input
                type="text"
                placeholder="Job title, company or skill"
                className="py-4 w-full outline-none text-slate-700"
              />
            </div>

            <div className="hidden md:block w-px bg-slate-200 my-3"></div>

            <div className="flex items-center gap-3 px-4 flex-1 text-slate-400">
              <MapPin size={20} />
              <input
                type="text"
                placeholder="Location or remote"
                className="py-4 w-full outline-none text-slate-700"
              />
            </div>

            <Link
              to="/login?role=jobseeker"
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-semibold text-center"
            >
              Search
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <StatItem
              icon={<BriefcaseBusiness size={20} />}
              number="Smart"
              label="Jobs"
            />

            <StatItem
              icon={<Building2 size={20} />}
              number="Verified"
              label="Companies"
            />

            <StatItem
              icon={<Users size={20} />}
              number="Role-based"
              label="Users"
            />

            <StatItem
              icon={<BadgeCheck size={20} />}
              number="Trusted"
              label="Recruiters"
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="absolute -top-8 -right-6 w-64 h-64 rounded-full bg-blue-200/60 blur-3xl"></div>
          <div className="absolute bottom-8 -left-10 w-52 h-52 rounded-full bg-indigo-200/50 blur-3xl"></div>

          <div className="relative bg-gradient-to-br from-[#0f2a6b] via-[#155ad3] to-[#2563eb] rounded-[36px] p-7 shadow-2xl overflow-hidden">
            <div className="absolute w-64 h-64 rounded-full bg-white/10 -top-20 -right-20"></div>

            <div className="relative z-10 flex justify-between items-center text-white mb-7">
              <div>
                <p className="text-blue-100 text-sm">Platform Preview</p>
                <h3 className="text-2xl font-bold mt-1">Smart Job Recommendation</h3>
              </div>

              <span className="bg-white/15 rounded-xl px-4 py-2 text-sm font-semibold">
                New
              </span>
            </div>

            <div className="relative z-10 bg-white rounded-[28px] p-6 shadow-xl">
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center">
                    INFY
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-[#07183d]">
                      Frontend Developer
                    </h4>

                    <p className="text-slate-500 text-sm mt-1">Infosys</p>
                  </div>
                </div>

                <span className="bg-green-50 text-green-700 rounded-full px-3 py-2 text-xs font-bold whitespace-nowrap">
                  Actively Hiring
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 flex justify-between items-center gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Posted by recruiter
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    Verified Hiring Partner
                  </p>

                  <p className="text-slate-500 text-sm">
                   TrustHire Recruiter
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-white text-blue-700 rounded-full px-3 py-2 text-xs font-bold">
                  <BadgeCheck size={16} />
                  Verified
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5">
                <PreviewItem title="Location" value="Bengaluru" />
                <PreviewItem title="Type" value="Hybrid" />
                <PreviewItem title="Salary" value="₹6-8 LPA" />
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {["React.js", "JavaScript", "Tailwind CSS"].map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-50 text-slate-600 rounded-full px-3 py-2 text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <Link
                  to="/login?role=jobseeker"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-semibold"
                >
                  View Jobs
                </Link>

                
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 mt-5">
              <div className="bg-white/12 border border-white/15 rounded-2xl p-4 text-white">
                <p className="text-blue-100 text-sm">Application Tracking</p>
                <p className="font-bold mt-1">Know your status</p>
              </div>

              <div className="bg-white/12 border border-white/15 rounded-2xl p-4 text-white">
  <p className="text-blue-100 text-sm">Job Trust Score</p>
  <p className="font-bold mt-1">Evaluate job quality</p>
</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-16 py-14">
        <div className="text-center mb-10">
          <p className="text-blue-600 font-semibold">WHY TRUSTHIRE</p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#07183d] mt-2">
            Smart Recruitment Features
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto mt-4">
            TrustHire combines resume analysis, smart matching, skill gap
            identification, and job safety support in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FileText size={24} />}
            title="ATS Resume Score"
            text="Analyze resume quality before applying to jobs."
            color="bg-blue-50 text-blue-700"
          />

          <FeatureCard
            icon={<BadgeCheck size={24} />}
            title="Job Match Score"
            text="Compare resume skills with recruiter-posted job requirements."
            color="bg-violet-50 text-violet-700"
          />

          <FeatureCard
            icon={<ClipboardList size={24} />}
            title="Skill Gap Analyzer"
            text="Identify missing skills needed for better job suitability."
            color="bg-green-50 text-green-700"
          />

          <FeatureCard
            icon={<ShieldCheck size={24} />}
            title="Job Trust Score"
            text="Evaluate job information quality using company, role, salary, location, and skills."
            color="bg-orange-50 text-orange-700"
          />
        </div>
      </section>

      <section className="px-8 md:px-16 pb-16">
        <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-10 shadow-sm">
          <h2 className="text-3xl font-bold text-[#07183d] text-center">
            One Platform for Every Recruitment Role
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-9">
            <RoleCard
              title="Job Seeker"
              text="Search jobs, upload resume, apply, and track application status."
              action="Login / Register"
              path="/login?role=jobseeker"
            />

            <RoleCard
              title="Recruiter"
              text="Post vacancies and monitor posted job details."
              action="Login / Register"
              path="/login?role=recruiter"
            />

            <RoleCard
              title="Administrator"
              text="Monitor platform users, jobs, applications, and resumes."
              action="Admin Login"
              path="/login?role=admin"
            />
          </div>
        </div>
      </section>

      <section id="company" className="px-8 md:px-16 py-16 bg-white">
        <h2 className="text-4xl font-bold text-[#07183d]">Companies</h2>

        <p className="mt-4 text-slate-600 max-w-3xl">
          TrustHire works with recruiter-posted jobs and transparent job details
          to improve hiring clarity. Every job post focuses on role details,
          required skills, location, salary, and safer application flow.
        </p>
      </section>

      <section id="about" className="px-8 md:px-16 py-16 bg-white">
        <h2 className="text-4xl font-bold text-[#07183d]">About TrustHire</h2>

        <p className="mt-4 text-slate-600 max-w-3xl">
          TrustHire is a smart web-based recruitment platform with resume
          management. It includes ATS Resume Score, Job Match Score, Skill Gap
          Analyzer, Explainable Match, Rejection Risk, Job Trust Score, and
          Application Tracking.
        </p>
      </section>

      <section id="contact" className="px-8 md:px-16 py-16 bg-white">
        <h2 className="text-4xl font-bold text-[#07183d]">Contact Us</h2>

        <p className="mt-4 text-slate-600 max-w-3xl">
          For project support related to job posting, resume upload, application
          tracking, or dashboard access, contact the TrustHire support team.
        </p>

        <div className="mt-6 space-y-2 text-slate-600">
          <p>Email: support@trusthire.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Location: Bengaluru, India</p>
        </div>
      </section>
    </div>
  );
}

function StatItem({ icon, number, label }) {
  return (
    <div>
      <div className="text-blue-600 mb-2">{icon}</div>
      <h3 className="text-3xl font-bold text-[#07183d]">{number}</h3>
      <p className="text-slate-500 mt-1">{label}</p>
    </div>
  );
}

function PreviewItem({ title, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-[11px] uppercase text-slate-400">{title}</p>
      <p className="text-slate-700 font-semibold text-sm mt-1">{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, text, color }) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${color}`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold text-[#07183d]">{title}</h3>
      <p className="text-slate-500 leading-relaxed mt-3">{text}</p>
    </div>
  );
}

function RoleCard({ title, text, action, path }) {
  return (
    <div className="rounded-3xl bg-[#f7f9fd] p-6 border border-slate-100">
      <h3 className="text-xl font-bold text-[#07183d]">{title}</h3>
      <p className="text-slate-500 leading-relaxed mt-3">{text}</p>

      <Link
        to={path}
        className="inline-flex items-center gap-2 text-blue-600 font-semibold mt-6"
      >
        {action}
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}

export default LandingPage;