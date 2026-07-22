import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";

function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    required_skills: "",
    salary: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/jobs", form);

      alert(res.data.message);
      navigate("/recruiter-dashboard");
    } catch (error) {
      console.log("POST JOB ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Job posting failed");
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
          to="/recruiter-dashboard"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
        >
          Dashboard
        </Link>
      </nav>

      <main className="px-6 md:px-14 py-8">
        <Link
          to="/recruiter-dashboard"
          className="inline-flex items-center gap-2 text-slate-600 font-medium mb-6"
        >
          <ArrowLeft size={18} />
          Back to Recruiter Dashboard
        </Link>

        <section className="max-w-4xl mx-auto bg-white rounded-[30px] p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <BriefcaseBusiness size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#07183d]">
                Post New Job
              </h2>
              <p className="text-slate-500 mt-1">
                Add a new job opportunity to TrustHire.
              </p>
            </div>
          </div>

          <form onSubmit={handlePostJob} className="space-y-5">
            <Input
              label="Job Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Backend Developer"
            />

            <Input
              label="Company"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="TCS"
            />

            <Input
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Hyderabad"
            />

            <Input
              label="Required Skills"
              name="required_skills"
              value={form.required_skills}
              onChange={handleChange}
              placeholder="Node.js, Express.js, MySQL, JWT"
            />

            <Input
              label="Salary"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="₹7 - 9 LPA"
            />

            <div>
              <label className="block font-semibold mb-2 text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter job description"
                rows="5"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold"
            >
              Post Job
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block font-semibold mb-2 text-slate-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full border border-slate-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default PostJob;