const express = require("express");
const db = require("../config/db");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", verifyToken, authorizeRoles("admin"), (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS totalUsers,
      (SELECT COUNT(*) FROM users WHERE role = 'jobseeker') AS totalJobSeekers,
      (SELECT COUNT(*) FROM users WHERE role = 'recruiter') AS totalRecruiters,
      (SELECT COUNT(*) FROM jobs) AS totalJobs,
      (SELECT COUNT(*) FROM applications) AS totalApplications,
      (SELECT COUNT(*) FROM resumes) AS totalResumes
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch admin stats",
        error: err,
      });
    }

    res.status(200).json(result[0]);
  });
});

module.exports = router;