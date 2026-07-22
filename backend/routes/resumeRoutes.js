const express = require("express");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const db = require("../config/db");
const upload = require("../middleware/uploadMiddleware");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const extractTextFromImage = require("../utils/ocrExtractor");

const router = express.Router();

router.post(
  "/upload",
  verifyToken,
  authorizeRoles("jobseeker"),
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No resume file uploaded",
        });
      }

      const userId = req.user.id;
      const resumeFile = req.file.filename;
      const filePath = req.file.path;
      const mimeType = req.file.mimetype;
      console.log("UPLOADED FILE TYPE:", mimeType);

      let parsedText = "";

      if (mimeType === "application/pdf") {
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        parsedText = pdfData.text;
      } else if (
        mimeType === "image/png" ||
        mimeType === "image/jpeg" ||
        mimeType === "image/jpg"
      ) {
        parsedText = await extractTextFromImage(filePath);
      } else {
        return res.status(400).json({
          message: "Only PDF, JPG, JPEG, and PNG resumes are allowed",
        });
      }

      if (!parsedText || parsedText.trim().length === 0) {
        return res.status(400).json({
          message: "Could not extract text from resume",
        });
      }

     const resumeText = parsedText.toLowerCase();



let atsScore = 0;

if (
  resumeText.includes("objective") ||
  resumeText.includes("summary") ||
  resumeText.includes("career objective") ||
resumeText.includes("professional summary")
)
  atsScore += 20;

if (
  resumeText.includes("skills") ||
  resumeText.includes("technical skills")
)
  atsScore += 20;

if (
  resumeText.includes("project") ||
  resumeText.includes("projects")
)
  atsScore += 20;

if (
  resumeText.includes("education") ||
  resumeText.includes("qualification") ||
resumeText.includes("mca")
)
  atsScore += 20;

if (
  resumeText.includes("certification") ||
  resumeText.includes("certifications") ||
  resumeText.includes("experience") ||
  resumeText.includes("internship")
)
  atsScore += 20;

if (atsScore > 100) atsScore = 100;

      const jobMatchScore = 0;
      const rejectionRisk = 100 - atsScore;

      const sql = `
        INSERT INTO resumes 
        (user_id, resume_file, parsed_text, ats_score, job_match_score, rejection_risk)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [
          userId,
          resumeFile,
          parsedText,
          atsScore,
          jobMatchScore,
          rejectionRisk,
        ],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Resume upload failed",
              error: err,
            });
          }

          res.status(201).json({
            message: "Resume uploaded and parsed successfully",
            resumeId: result.insertId,
            file: resumeFile,
            atsScore,
            jobMatchScore,
            rejectionRisk,
            extractionMethod:
              mimeType === "application/pdf" ? "PDF Parse" : "OCR",
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        message: "Resume parsing failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;