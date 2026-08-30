const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer memory storage configuration for serverless / Vercel compatibility
const storage = multer.memoryStorage();

// File filter (PDF, DOCX, DOC, and TXT)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
    'application/octet-stream'
  ];
  
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedMimeTypes.includes(file.mimetype) || ['.pdf', '.docx', '.doc', '.txt'].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOCX, and TXT are supported.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB max size
  }
});

module.exports = upload;
