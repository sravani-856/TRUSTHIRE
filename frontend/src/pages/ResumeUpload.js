import { Link } from "react-router-dom";
import { useState } from "react";
import api from "./api";
import { ArrowLeft, CheckCircle2, FileText, Upload } from "lucide-react";

function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!resume) {
      alert("Please choose a resume first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const res = await api.post("/api/resume/upload", formData);

      setResult(res.data);
      alert("Resume uploaded successfully");
    } catch (error) {
      console.log("RESUME UPLOAD ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Resume upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-slate-900">
      <nav className="bg-white border-b border-slate-100 px-8 md:px-14 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            TH
          </div>
          <h1 className="text-2xl font-bold text-[#07183d]">
            Trust<span className="text-blue-600">Hire</span>
          </h1>
        </Link>

        <Link
          to="/jobs"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Find Jobs
        </Link>
      </nav>

      <main className="px-6 md:px-14 py-8">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-slate-600 font-medium mb-6"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </Link>

        <section className="rounded-[34px] bg-[#081b44] p-8 md:p-10 text-white shadow-xl">
          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full font-semibold">
            <Upload size={18} />
            Resume Management
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mt-6">
            Upload your resume
          </h2>

          <p className="text-blue-100 mt-4 max-w-2xl leading-relaxed">
            TrustHire stores your resume and uses it for job recommendation,
            application submission, and application tracking.
          </p>
        </section>

        <section className="mt-7 bg-white rounded-[30px] p-8 shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-[#07183d]">Resume Upload</h3>

          <p className="text-slate-500 mt-2">
            Upload your PDF resume to continue with job recommendations and
            applications.
          </p>

          <div className="mt-8 border-2 border-dashed border-blue-200 bg-blue-50/60 rounded-[30px] p-12 text-center">
            <div className="w-24 h-24 bg-white rounded-[28px] shadow-sm flex items-center justify-center mx-auto text-blue-600">
              <Upload size={40} />
            </div>

            <h3 className="text-2xl font-bold text-[#07183d] mt-6">
              Choose your resume
            </h3>

            <p className="text-slate-500 mt-2">
              PDF, PNG, or JPEG. Maximum size 5 MB.
            </p>

            <input
              type="file"
             accept="application/pdf,image/png,image/jpeg,image/jpg"
              id="resumeInput"
              className="hidden"
              onChange={(e) => setResume(e.target.files[0])}
            />

            <label
              htmlFor="resumeInput"
              className="mt-7 inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold cursor-pointer"
            >
              Choose Resume
            </label>
          </div>

          <div className="mt-7 bg-[#f8fafc] rounded-3xl p-6 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center">
                <FileText size={30} />
              </div>

              <div>
                <h4 className="font-bold text-[#07183d]">
                  {resume ? resume.name : "No resume selected"}
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  {resume
                    ? "Resume selected successfully and ready to upload"
                    : "Please choose a PDF resume"}
                </p>
              </div>
            </div>

            <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
              {resume ? "Ready" : "Waiting"}
            </span>
          </div>

          {result && (
            <div className="mt-6 rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#07183d]">
                Resume Analysis Result
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <ResultCard
                  title="ATS Score"
                  value={`${result.atsScore || result.ats_score || result.ats || 0}%`}
                />

                

                <ResultCard
                  title="Rejection Risk"
                  value={`${
                    result.rejectionRisk ||
                    result.rejection_risk ||
                    result.risk ||
                    0
                  }%`}
                />
              </div>

              <div className="mt-5 rounded-2xl bg-green-50 border border-green-100 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-green-800">
                      Resume uploaded successfully
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your resume has been successfully uploaded and will be used for job recommendations and application tracking.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleUpload}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
            >
              Upload Resume
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function ResultCard({ title, value }) {
  return (
    <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-100">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-3xl font-bold text-blue-700 mt-2">{value}</h3>
    </div>
  );
}

export default ResumeUpload;