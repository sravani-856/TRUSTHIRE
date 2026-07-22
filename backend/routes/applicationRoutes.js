const express = require("express");
const db = require("../config/db");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply for job
router.post("/apply", verifyToken, authorizeRoles("jobseeker"), (req, res) => {
  const userId = req.user.id;
  const { job_id } = req.body;

  if (!job_id) {
    return res.status(400).json({ message: "job_id is required" });
  }

  const resumeSql = `
    SELECT resume_id FROM resumes
    WHERE user_id = ?
    ORDER BY uploaded_at DESC
    LIMIT 1
  `;

  db.query(resumeSql, [userId], (err, resumeResult) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch resume",
        error: err,
      });
    }

    if (resumeResult.length === 0) {
      return res.status(400).json({
        message: "Please upload resume before applying",
      });
    }

    const resumeId = resumeResult[0].resume_id;

    const checkSql = `
      SELECT application_id FROM applications
      WHERE job_id = ? AND user_id = ?
    `;

    db.query(checkSql, [job_id, userId], (err, existing) => {
      if (err) {
        return res.status(500).json({
          message: "Application check failed",
          error: err,
        });
      }

      if (existing.length > 0) {
        return res.status(400).json({
          message: "You already applied for this job",
        });
      }

      const sql = `
        INSERT INTO applications (job_id, user_id, resume_id, application_status)
        VALUES (?, ?, ?, ?)
      `;

      db.query(sql, [job_id, userId, resumeId, "applied"], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Job application failed",
            error: err,
          });
        }

        res.status(201).json({
          message: "Application submitted successfully",
          applicationId: result.insertId,
        });
      });
    });
  });
});

// Job seeker views own applications
router.get(
  "/my-applications",
  verifyToken,
  authorizeRoles("jobseeker"),
  (req, res) => {
    const userId = req.user.id;

    const sql = `
      SELECT 
        a.application_id,
        a.application_status,
        a.applied_at,
        j.job_id,
        j.title,
        j.company,
        j.location,
        j.salary,
        j.description,
        j.required_skills,
        r.parsed_text
      FROM applications a
      JOIN jobs j ON a.job_id = j.job_id
      JOIN resumes r ON a.resume_id = r.resume_id
      WHERE a.user_id = ?
      ORDER BY a.applied_at DESC
    `;

    db.query(sql, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch applications",
          error: err,
        });
      }

      const formatted = results.map((item) => {
        const resumeText = item.parsed_text
          ? item.parsed_text.toLowerCase()
          : "";

        const skills = item.required_skills
          ? item.required_skills
              .split(",")
              .map((s) => s.trim().toLowerCase())
              .filter(Boolean)
          : [];

        const matchedSkills = skills.filter((skill) =>
          resumeText.includes(skill)
        );

        const missingSkills = skills.filter(
          (skill) => !resumeText.includes(skill)
        );

        const job_match_score =
          skills.length > 0
            ? Math.round((matchedSkills.length / skills.length) * 100)
            : 0;

        let ats_score = 0;

        if (
          resumeText.includes("objective") ||
          resumeText.includes("summary") ||
          resumeText.includes("career objective") ||
          resumeText.includes("professional summary")
        )
          ats_score += 20;

        if (
          resumeText.includes("skills") ||
          resumeText.includes("technical skills")
        )
          ats_score += 20;

        if (
          resumeText.includes("project") ||
          resumeText.includes("projects")
        )
          ats_score += 20;

        if (
          resumeText.includes("education") ||
          resumeText.includes("qualification") ||
          resumeText.includes("mca")
        )
          ats_score += 20;

        if (
          resumeText.includes("certification") ||
          resumeText.includes("certifications") ||
          resumeText.includes("experience") ||
          resumeText.includes("internship")
        )
          ats_score += 20;

        if (ats_score > 100) ats_score = 100;

        let rejection_risk = 100 - job_match_score;

if (rejection_risk > 100) rejection_risk = 100;
if (rejection_risk < 0) rejection_risk = 0;

        let job_trust_score = 0;

        if (item.company) job_trust_score += 20;
        if (item.location) job_trust_score += 20;
        if (item.salary) job_trust_score += 20;
        if (item.required_skills) job_trust_score += 20;
        if (item.description) job_trust_score += 20;

        if (job_trust_score > 100) job_trust_score = 100;

        return {
          application_id: item.application_id,
          status: item.application_status,
          applied_at: item.applied_at,
          job_id: item.job_id,
          title: item.title,
          company: item.company,
          location: item.location,
          salary: item.salary,
          job_match_score,
          ats_score,
          rejection_risk,
          job_trust_score,
          matchedSkills,
          missingSkills,
        };
      });

      res.status(200).json(formatted);
    });
  }
);

// Withdraw application
router.delete(
  "/withdraw/:id",
  verifyToken,
  authorizeRoles("jobseeker"),
  (req, res) => {
    const userId = req.user.id;
    const applicationId = req.params.id;

    const sql = `
      DELETE FROM applications
      WHERE application_id = ? AND user_id = ?
    `;

    db.query(sql, [applicationId, userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Withdraw failed",
          error: err,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      res.status(200).json({
        message: "Application withdrawn successfully",
      });
    });
  }
);

module.exports = router;