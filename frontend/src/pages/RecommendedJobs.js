import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/jobs/recommended/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fc] p-8">
      <Link to="/jobs" className="text-blue-600 font-semibold">
        ← Back to Jobs
      </Link>

      <h1 className="text-3xl font-bold text-[#07183d] mt-6">
        Recommended Jobs
      </h1>

      <p className="text-slate-500 mt-2">
        Jobs are recommended based on your uploaded resume skills.
      </p>

      <div className="mt-8 space-y-5">
        {jobs.map((job) => (
          <div
            key={job.job_id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-[#07183d]">
              {job.title}
            </h2>

            <p className="text-slate-500 mt-1">
              {job.company} • {job.location}
            </p>

            <p className="mt-3 font-semibold text-blue-700">
              Match Score: {job.matchScore}%
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {job.matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>

            <Link
              to={`/job-details/${job.job_id}`}
              className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedJobs;