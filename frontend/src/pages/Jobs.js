import { useEffect, useState } from "react";
import api from "./api";
import { Link } from "react-router-dom";

import {
  BadgeCheck,

  Bookmark,
  Clock3,
  
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Target,
} from "lucide-react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [resumeError, setResumeError] = useState("");

  useEffect(() => {
    api
      .get("/api/jobs/recommended/jobs")
      .then((res) => {
        const formattedJobs = res.data.map((job, index) => {
          const skills = job.required_skills
            ? job.required_skills.split(",").map((s) => s.trim())
            : [];

          return {
            id: job.job_id,
            title: job.title,
            company: job.company,
            logo: job.company.substring(0, 3).toUpperCase(),
            logoStyle:
              index === 0
                ? "bg-violet-50 text-violet-700"
                : index === 1
                ? "bg-blue-50 text-blue-700"
                : index === 2
                ? "bg-pink-50 text-pink-700"
                : "bg-green-50 text-green-700",
            recruiter: "Verified Hiring Partner",
            recruiterRole: "TrustHire Recruiter",
            verified: true,
            location: job.location,
           workMode:
  index % 3 === 0
    ? "Remote"
    : index % 3 === 1
    ? "Hybrid"
    : "On-site",
            type: "Full Time",
            salary: job.salary,
            experience: index === 0 ? "1 - 3 Years" : "0 - 2 Years",
            posted: job.created_at
              ? new Date(job.created_at).toLocaleDateString("en-IN")
              : "Not available",
            deadline: "30 Jun 2026",
            responseTime: "Usually responds in 1 day",

            matchScore: job.matchScore || 0,
            rejectionRisk: job.rejectionRisk || 0,
            jobTrustScore: job.jobTrustScore || 0,
            skills,
            matchedSkills: job.matchedSkills || [],
            missingSkills: job.missingSkills || [],
            explainableMatch: job.explainableMatch || null,
          };
        });

        setJobs(formattedJobs);
        setResumeError("");

        if (formattedJobs.length > 0) {
          setSelectedJobId(formattedJobs[0].id);
        }
      })
      .catch((err) => {
        console.log("FETCH JOBS ERROR:", err);
        setResumeError(
          err.response?.data?.message || "Please upload resume first"
        );
      });
  }, []);

  const searchValue = searchTerm.toLowerCase().trim();

  const filteredJobs = jobs.filter((job) => {
    const searchText = searchValue.replace(/\s+/g, "");

    const jobText = `
      ${job.title}
      ${job.company}
      ${job.skills.join(" ")}
    `
      .toLowerCase()
      .replace(/\s+/g, "");

    const matchesSearch = searchText === "" || jobText.includes(searchText);

    const matchesLocation =
      locationFilter === "" ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesWorkMode =
      workModeFilter === "" || job.workMode === workModeFilter;

    const matchesExperience =
      experienceFilter === "" || job.experience === experienceFilter;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesWorkMode &&
      matchesExperience
    );
  });

  const selectedJob =
    filteredJobs.find((job) => job.id === selectedJobId) || filteredJobs[0];

  const toggleSavedJob = (event, jobId) => {
    event.stopPropagation();

    setSavedJobs((current) =>
      current.includes(jobId)
        ? current.filter((id) => id !== jobId)
        : [...current, jobId]
    );
  };

  const handleReset = () => {
    setSearchTerm("");
    setLocationFilter("");
    setWorkModeFilter("");
    setExperienceFilter("");

    if (jobs.length > 0) {
      setSelectedJobId(jobs[0].id);
    }
  };

  if (resumeError) {
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

          <Link
            to="/resume-upload"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Upload Resume
          </Link>
        </nav>

        <div className="flex min-h-[80vh] items-center justify-center px-6">
          <div className="max-w-md rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Sparkles size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#07183d]">
              Resume Required
            </h2>

            <p className="mt-3 text-slate-500">
              Please upload your resume first to view jobs matched to your
              skills.
            </p>

            <Link
              to="/resume-upload"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Upload Resume
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return <div className="p-10 text-center">Loading jobs...</div>;
  }

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

        <div className="flex items-center gap-3">
         
          <Link
            to="/applications"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            My Applications
          </Link>
        </div>
      </nav>

      <header className="px-6 pb-6 pt-7 md:px-12">
        <div className="rounded-[32px] bg-[#081b44] px-7 py-8 text-white shadow-lg md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
            <Sparkles size={16} />
            Smart job discovery
          </div>

          <h2 className="mt-5 text-3xl font-bold md:text-4xl">
            Jobs matched to your resume
          </h2>

          <p className="mt-3 text-blue-100">
            Showing jobs based on your uploaded resume and skills.
          </p>

          <div className="mt-7 flex max-w-4xl flex-col gap-2 rounded-2xl bg-white p-2 md:flex-row">
            <div className="flex flex-1 items-center gap-3 px-4 text-slate-400">
              <Search size={19} />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setLocationFilter("");
                  setWorkModeFilter("");
                  setExperienceFilter("");
                }}
                placeholder="Search title, skill or company"
                className="w-full py-3 text-slate-700 outline-none"
              />
            </div>

            <div className="hidden w-px bg-slate-200 md:block"></div>

            <div className="flex flex-1 items-center gap-3 px-4 text-slate-400">
              <MapPin size={19} />
              <input
                type="text"
                value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}
                placeholder="Location"
                className="w-full py-3 text-slate-700 outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-6 px-6 pb-12 md:px-12 lg:grid-cols-[250px_385px_minmax(400px,1fr)]">
        <aside className="h-fit rounded-[26px] border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-7 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xl font-bold text-[#07183d]">
              <SlidersHorizontal size={19} />
              Filters
            </h3>

            <button
              onClick={handleReset}
              className="text-sm font-semibold text-blue-600"
            >
              Reset
            </button>
          </div>

          <div className="mb-7">
            <h4 className="mb-4 font-semibold text-[#07183d]">Work Mode</h4>

            {["Remote", "Hybrid", "On-site"].map((item) => (
              <label
                key={item}
                className="mb-3 flex items-center gap-3 text-sm text-slate-600"
              >
                <input
                  type="radio"
                  name="workMode"
                  checked={workModeFilter === item}
                  onChange={() => setWorkModeFilter(item)}
                  className="h-4 w-4 accent-blue-600"
                />
                {item}
              </label>
            ))}
          </div>

          <div className="mb-7">
            <h4 className="mb-4 font-semibold text-[#07183d]">Experience</h4>

            {["Fresher", "0 - 2 Years", "1 - 3 Years"].map((item) => (
              <label
                key={item}
                className="mb-3 flex items-center gap-3 text-sm text-slate-600"
              >
                <input
                  type="radio"
                  name="experience"
                  checked={experienceFilter === item}
                  onChange={() => setExperienceFilter(item)}
                  className="h-4 w-4 accent-blue-600"
                />
                {item}
              </label>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </aside>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#07183d]">
                Smart Matches
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {filteredJobs.length} roles based on your resume
              </p>
            </div>

            <span className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium">
              Best Match
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center text-slate-500">
              No jobs found for selected filters.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`cursor-pointer rounded-3xl border bg-white p-5 transition ${
                    selectedJob?.id === job.id
                      ? "border-blue-500 shadow-md shadow-blue-100"
                      : "border-slate-100 hover:border-blue-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-4">
                      <LogoBox text={job.logo} styleName={job.logoStyle} />

                      <div>
                        <h4 className="font-bold text-[#07183d]">
                          {job.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => toggleSavedJob(event, job.id)}
                      className={`p-1 ${
                        savedJobs.includes(job.id)
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    >
                      <Bookmark
                        size={19}
                        fill={
                          savedJobs.includes(job.id) ? "currentColor" : "none"
                        }
                      />
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#f7f9fc] p-3">
                    <p className="text-[11px] uppercase text-slate-400">
                      Match Score
                    </p>
                    <p className="mt-1 text-xl font-bold text-blue-700">
                      {job.matchScore}%
                    </p>
                  </div>

                  <div className="mt-3 rounded-2xl bg-orange-50 p-3">
                    <p className="text-[11px] uppercase text-orange-500">
                      Skill Gap
                    </p>
                    <p className="mt-1 text-sm font-semibold text-orange-700">
                      {job.missingSkills.length > 0
                        ? job.missingSkills.join(", ")
                        : "No major skill gap"}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Pill text={job.location} />
                    <Pill text={job.workMode} />
                    <Pill text={job.experience} />
                  </div>

                  <div className="mt-4 flex justify-between text-sm">
                    <p className="font-semibold text-slate-700">
                      {job.salary}
                    </p>
                    <p className="text-slate-400">{job.posted}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {selectedJob && (
          <section className="h-fit rounded-[28px] border border-slate-100 bg-white p-7 shadow-sm lg:sticky lg:top-24">
            <div className="flex justify-between gap-4">
              <div className="flex gap-4">
                <LogoBox
                  text={selectedJob.logo}
                  styleName={selectedJob.logoStyle}
                  large
                />

                <div>
                  <h2 className="text-2xl font-bold text-[#07183d]">
                    {selectedJob.title}
                  </h2>
                  <p className="mt-1 text-slate-500">
                    {selectedJob.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Pill text={selectedJob.type} active />
              <Pill text={selectedJob.workMode} />
              <Pill text={`Posted ${selectedJob.posted}`} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <ScoreCard
                icon={<Target size={17} />}
                label="Match Score"
                value={`${selectedJob.matchScore}%`}
              />
              
              <ScoreCard
                icon={<Target size={17} />}
                label="Rejection Risk"
                value={`${selectedJob.rejectionRisk}%`}
              />
              <ScoreCard
                icon={<Target size={17} />}
                label="Job Trust Score"
                value={`${selectedJob.jobTrustScore}%`}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
              <h3 className="font-bold text-[#07183d]">Explainable Match</h3>

              <p className="mt-3 text-sm text-slate-600">
                {selectedJob.explainableMatch?.reason ||
                  "Match is calculated by comparing resume skills with job required skills."}
              </p>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase text-green-600">
                  Matched Skills
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedJob.matchedSkills.length > 0 ? (
                    selectedJob.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No skills matched
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase text-orange-600">
                  Missing Skills
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedJob.missingSkills.length > 0 ? (
                    selectedJob.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No major skill gap
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <MiniInfo title="Location" value={selectedJob.location} />
              <MiniInfo title="Salary" value={selectedJob.salary} />
              <MiniInfo title="Experience" value={selectedJob.experience} />
              <MiniInfo title="Deadline" value={selectedJob.deadline} />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Posted by recruiter
                  </p>
                  <p className="mt-1 font-bold text-[#07183d]">
                    {selectedJob.recruiter}
                  </p>
                  <p className="text-sm text-slate-500">
                    {selectedJob.recruiterRole}
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 p-2 text-blue-600">
                  <BadgeCheck size={20} />
                </span>
              </div>

              <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <Clock3 size={16} />
                {selectedJob.responseTime}
              </p>
            </div>

            <div className="mt-7 flex gap-3">
              <Link
                to={`/job-details/${selectedJob.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                View & Apply →
              </Link>

              
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function LogoBox({ text, styleName, large = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl font-bold ${styleName} ${
        large ? "h-16 w-16 text-base" : "h-[52px] w-[52px] text-xs"
      }`}
    >
      {text}
    </div>
  );
}

function Pill({ text, active = false }) {
  return (
    <span
      className={`rounded-full px-3 py-2 text-xs font-semibold ${
        active ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-600"
      }`}
    >
      {text}
    </span>
  );
}

function ScoreCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-blue-50 p-4 text-blue-700">
      {icon}
      <p className="mt-3 text-xs">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function MiniInfo({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[11px] uppercase text-slate-400">{title}</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}

export default Jobs;