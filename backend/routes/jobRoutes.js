const express = require("express");
const db = require("../config/db");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Recruiter posts a job
router.get(
  "/recruiterjobs",
  verifyToken,
  authorizeRoles("recruiter"),
  (req, res) => {
    const recruiterId = req.user.id;

    const sql = `
      SELECT 
        j.*,
        COUNT(a.application_id) AS applicant_count
      FROM jobs j
      LEFT JOIN applications a ON j.job_id = a.job_id
      WHERE j.recruiter_id = ?
      GROUP BY j.job_id
      ORDER BY j.created_at DESC
    `;

    db.query(sql, [recruiterId], (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch recruiter jobs",
          error: err,
        });
      }

      res.status(200).json(results);
    });
  }
);



// Recommended jobs for logged-in jobseeker
router.get(
  "/recommended/jobs",
  verifyToken,
  authorizeRoles("jobseeker"),
  (req, res) => {
    const userId = req.user.id;

    const resumeSql = `
      SELECT parsed_text 
      FROM resumes 
      WHERE user_id = ? 
      ORDER BY uploaded_at DESC 
      LIMIT 1
    `;

    db.query(resumeSql, [userId], (err, resumeResult) => {
      if (err) {
        return res.status(500).json({
          message: "Resume fetch failed",
          error: err,
        });
      }

      if (resumeResult.length === 0) {
        return res.status(404).json({
          message: "Please upload resume first",
        });
      }

      const resumeText = resumeResult[0].parsed_text
        ? resumeResult[0].parsed_text.toLowerCase()
        : "";

      const jobSql = "SELECT * FROM jobs ORDER BY created_at DESC";

      db.query(jobSql, (err, jobs) => {
        if (err) {
          return res.status(500).json({
            message: "Jobs fetch failed",
            error: err,
          });
        }

        const recommendedJobs = jobs.map((job) => {
          const skills = job.required_skills
            ? job.required_skills
                .split(",")
                .map((skill) => skill.trim().toLowerCase())
                .filter(Boolean)
            : [];

          const matchedSkills = skills.filter((skill) =>
            resumeText.includes(skill)
          );

          const missingSkills = skills.filter(
            (skill) => !resumeText.includes(skill)
          );

          const matchScore =
            skills.length > 0
              ? Math.round((matchedSkills.length / skills.length) * 100)
              : 0;

          // 1. ATS Score - based on job skill matching
          const atsScore = matchScore;

          // 2. Skill Gap Analyzer
          const skillGap =
            missingSkills.length > 0 ? missingSkills : ["No major skill gap"];

          // 3. Explainable Match
          const explainableMatch = {
            reason:
              matchedSkills.length > 0
                ? `This job matches because your resume contains ${matchedSkills.join(
                    ", "
                  )}.`
                : "This job has low match because required skills are not found in your resume.",
            matchedSkills,
            missingSkills,
          };

          // 4. Rejection Predictor - rule based
         let rejectionRisk = 100 - matchScore;

if (rejectionRisk > 100) rejectionRisk = 100;
if (rejectionRisk < 0) rejectionRisk = 0;

     let jobTrustScore = 0;

if (job.company) jobTrustScore += 20;

if (job.location) jobTrustScore += 20;

if (job.salary) jobTrustScore += 20;

if (job.required_skills) jobTrustScore += 20;

if (job.description) jobTrustScore += 20;

if (jobTrustScore > 100) jobTrustScore = 100;

          return {
            ...job,
            matchScore,
            atsScore,
            skillGap,
            matchedSkills,
            missingSkills,
            explainableMatch,
            rejectionRisk,
            jobTrustScore,
          };
        });

        recommendedJobs.sort((a, b) => b.matchScore - a.matchScore);

        res.status(200).json(recommendedJobs);
      });
    });
  }
);

// Get all jobs
router.get("/", (req, res) => {
  const sql = "SELECT * FROM jobs ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch jobs",
        error: err,
      });
    }

    res.status(200).json(results);
  });
});

// Get single job
router.get("/:id", (req, res) => {
  const jobId = req.params.id;

  const sql = "SELECT * FROM jobs WHERE job_id = ?";

  db.query(sql, [jobId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch job details",
        error: err,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(results[0]);
  });
});

module.exports = router;