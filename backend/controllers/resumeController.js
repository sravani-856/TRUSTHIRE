const fs = require("fs");
const pdfParse = require("pdf-parse");
const db = require("../config/db");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    const userId = req.user.id;
    const resumeFile = req.file.filename;
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const parsedText = pdfData.text;

    const sql = `
      INSERT INTO resumes (user_id, resume_file, parsed_text, ats_score)
      VALUES (?, ?, ?, ?)
    `;

    const atsScore = 0;

    db.query(sql, [userId, resumeFile, parsedText, atsScore], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err,
        });
      }

      res.status(201).json({
        message: "Resume uploaded and parsed successfully",
        resumeId: result.insertId,
        file: resumeFile,
        parsedText,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume parsing failed",
      error: error.message,
    });
  }
};

module.exports = { uploadResume };